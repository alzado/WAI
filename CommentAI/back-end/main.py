# import openai
# from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# openai.api_key = "<YOURKEY>"

# @app.route('/process-data', methods=['GET', 'POST'])
# def processData():
#   data = request.get_json()
#   person_1 = data.get('person_1')
#   person_2 = data.get('person_2')

#   print(person_1)
#   print(person_2)

#   prompt = f"Valentine’s day is coming. The couple '{person_1}' and '{person_2}' are in love. Write something lovely for them in 100 words and wish them happy valentines. Sign the letter as ValentAI."

#   completions = openai.Completion.create(engine="text-davinci-002",
#                                          prompt=prompt,
#                                          max_tokens=2048)
#   message = completions.choices[0].text
#   print(message)
#   return jsonify(message)

def amazonCommentsScrap():
    url = "https://www.amazon.com/L-Bow-Infant-Weather-Winter-Fleece/dp/B09LKJ8W42/?_encoding=UTF8&pd_rd_w=aWq33&content-id=amzn1.sym.08900ed4-dd64-49b1-bce7-2e717defb1aa&pf_rd_p=08900ed4-dd64-49b1-bce7-2e717defb1aa&pf_rd_r=VSH3QKKEVY2WBMB92AR9&pd_rd_wg=YV2h0&pd_rd_r=60e7bb71-d843-46ca-864f-114471245aaf&ref_=pd_gw_ci_mcx_mi&th=1"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    reviews = soup.find_all("div", class_="a-section celwidget")
    print(reviews)

    # for review in reviews:
    #     author = review.find("span", class_="a-size-base a-link-normal").text
    #     date = review.find("span", class_="a-size-base a-color-secondary").text
    #     title = review.find("a", class_="a-size-base a-link-normal").text
    #     rating = review.find("span", class_="a-icon-alt").text
    #     body = review.find("span", class_="a-size-base review-text").text

    #     print("Author:", author)
    #     print("Date:", date)
    #     print("Title:", title)
    #     print("Rating:", rating)
    #     print("Review:", body)
    #     print("\n")

amazonCommentsScrap()

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=81)
