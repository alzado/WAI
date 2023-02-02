from flask import Flask, request, jsonify, np
import io
import cv2

app = Flask(__name__)

#def handleDalle()
def queryHotpot(photo, style):
  # Define the Hotpot.ai Art Personalizer API endpoint URL
  api_url = 'https://api.hotpot.ai/v1/art-personalizer'

  # Define the Hotpot.ai API key
  api_key = 'your_hotpot_ai_api_key'

  # Define the request headers
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + api_key,
  }

  # Define the request data
  data = {
    'contentImage': photo,
    'styleImage': style,
    'focusContent': True, # Set to true if you want the result to resemble the base image (contentImage). Setting it to false will result in a more cartoonish image.
  }

  # Call the Hotpot.ai Art Personalizer API
  response = request.post(api_url, headers=headers, json=data)

  # Extract the generated image from the response
  binary_image = io.BytesIO(response)
  image = cv2.imdecode(np.frombuffer(binary_image.getvalue(), np.uint8), cv2.IMREAD_UNCHANGED)
  image_bytes = cv2.imencode('.jpg', image)[1].tobytes()

  # Return the generated image
  return io.BytesIO(image_bytes)

@app.route('/')
def index():
  return 'ValentAI Backend'


@app.route('/api/upload-photo', methods=['POST'])
def upload_photo():
  photo = request.files['photo']
  style = request.files['style']

  '''
  {
    photo: X,
    style: would be a word coming from a scroll down menu selected by the user, and the it would fetch an image saved in the server
    ...
  }
  '''

  hotpot_output = queryHotpot(photo, style)

  # do something...

  return jsonify({'message': hotpot_output})


# Two more functions,

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=81)
