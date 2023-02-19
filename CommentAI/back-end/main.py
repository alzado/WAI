import openai, math, os
from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = os.environ['OPENAI_KEY']


@app.route('/', methods=['GET', 'POST'])
def processData():
    data = request.get_json()
    input_url = data.get('inputUrl')

    scrapped_info = ebayCommentsScrapper(input_url)

    if scrapped_info[2] != 0:
      bad_reviews = openaiRequest(scrapped_info[1], scrapped_info[2])
    else:
      bad_reviews = "No bad reviews from any customer"

    if scrapped_info[4] != 0:
      good_reviews = openaiRequest(scrapped_info[3], scrapped_info[4])
    else:
      good_reviews = "There are no good reviews"

    purchase_recommendation = openaiRequest2(bad_reviews, scrapped_info[2], good_reviews, scrapped_info[4])
    
    return jsonify({'image': scrapped_info[0], 'badReviews': bad_reviews, 'percentBad': scrapped_info[2], 'goodReviews': good_reviews, 'percentGood': scrapped_info[4], 'recommendation': purchase_recommendation})

def openaiRequest(input1, input2):

    prompt = f"I'll give you an array of {len(input1)} elements, each one is a review of a customer that bought a product in Ebay. Please summarize all of them in no more than 50 words, considering that this represents a {input2}% of the total customers: {input1}"

    completions = openai.Completion.create(engine="text-davinci-002",
                                           prompt=prompt,
                                           max_tokens=2048)
    message = completions.choices[0].text
    return message
  
def openaiRequest2(input1, input2, input3, input4):

    prompt = f"Based on what is said about a product, where {input2}% claim that the product is bad and the think '{input1}', and {input4}% claim that the product is good and they think '{input3}', tell me explicitly (in less than 10 words) if I buy or not the product?"

    completions = openai.Completion.create(engine="text-davinci-002",
                                           prompt=prompt,
                                           max_tokens=2048)
    message = completions.choices[0].text
    return message


def ebayCommentsScrapper(input_url):
    reviews = []
    reviews_detail_five_star = []
    reviews_detail_one_star = []
    page = requests.get(input_url)
    soup = BeautifulSoup(page.content, "html.parser")
    page_img = soup.find(id="itemImg")['imgurl']
    page_total = soup.find_all("a", class_="spf-link")
    page_parsed = max(1, len(page_total) - 2) + 1

    for page_num in range(1, page_parsed):
        url = f"{input_url}&pgn={page_num}&sort=-lastEditedDate"
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")
        reviews += soup.find_all("div", class_="ebay-review-section")

    for review in reviews:
        if review.find("h3", class_="review-item-title"):
            stars = review.find_all("i", class_="fullStar")
            body = review.find("h3", class_="review-item-title").text
            # body = review.find("p", class_="review-item-content").text

            if len(stars) == 1:
              reviews_detail_one_star.append(body)
              
            if len(stars) == 5:
              reviews_detail_five_star.append(body)

    percent_one_star = math.floor(len(reviews_detail_one_star) / len(reviews) * 100)
    percent_five_star = math.floor(len(reviews_detail_five_star) / len(reviews) * 100)

    return (page_img, reviews_detail_one_star, percent_one_star, reviews_detail_five_star, percent_five_star)


if __name__ == '__main__':
    app.run()

