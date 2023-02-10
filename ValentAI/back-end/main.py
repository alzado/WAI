import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = "<YOUR-KEY>"

@app.route('/process-data', methods=['GET', 'POST'])
def processData():
  data = request.get_json()
  person_1 = data.get('person_1')
  person_2 = data.get('person_2')

  print(person_1)
  print(person_2)

  prompt = f"Valentine’s day is coming. The couple '{person_1}' and '{person_2}' are in love. Write something lovely for them in 100 words and wish them happy valentines. Sign the letter as ValentAI."

  completions = openai.Completion.create(engine="text-davinci-002",
                                         prompt=prompt,
                                         max_tokens=2048)
  message = completions.choices[0].text
  print(message)
  return jsonify(message)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=81)
