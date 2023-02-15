import openai, os
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

    outputOpenAI = openaiRequest(scrapped_info[1])

    return jsonify({'image': scrapped_info[0], 'summary': outputOpenAI})


def openaiRequest(input):

    prompt = f"I'll give you an array of {len(input)} elements, each one is a review of a customer that bought a product in Ebay. Please summarize all of them in no more than 100 words, considering a weighted trend for those comments that are most repetead: {input}"

    completions = openai.Completion.create(engine="text-davinci-002",
                                           prompt=prompt,
                                           max_tokens=2048)
    message = completions.choices[0].text
    return message


def ebayCommentsScrapper(input_url):
    reviews = []
    reviews_detail = []
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
            body = review.find("h3", class_="review-item-title").text
            reviews_detail.append(body)

    return (page_img, reviews_detail)


if __name__ == '__main__':
    app.run()
