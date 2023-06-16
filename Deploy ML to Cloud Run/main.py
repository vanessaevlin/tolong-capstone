import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import io
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image

from flask import Flask, request, jsonify

model = keras.models.load_model("incv3ckpt70.h5")

class_labels = ["Abrasions", "Bruises", "Burns", "Cut", "Ingrown Nails", "Laceration", "Stab_wound"]

def transform_image(pillow_image):
    # Resize the image to match the input size of the model
    image = pillow_image.resize((224, 224))
    
    # Convert the image to RGB format
    image_rgb = image.convert('RGB')
    
    # Convert the image to a numpy array
    data = np.array(image_rgb)
    
    # Normalize the pixel values (assuming the model expects inputs in the range [0, 1])
    data = data / 255.0
    
    # Add batch dimension
    data = np.expand_dims(data, axis=0)
    
    return data


def predict(x):
    # Preprocess the input tensor
    x = tf.cast(x, tf.float32)
    
    predictions = model(x)
    predictions = tf.nn.softmax(predictions)
    pred0 = predictions[0]
    label0 = np.argmax(pred0)
    predicted_label = class_labels[label0]
    
    return predicted_label


app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files.get('file')
        if file is None or file.filename == "":
            return jsonify({"error": "no file"})

        try:
            image_bytes = file.read()
            pillow_img = Image.open(io.BytesIO(image_bytes)).convert('L')
            tensor = transform_image(pillow_img)
            prediction = predict(tensor)
            data = {"prediction": prediction}
            return jsonify(data)
        except Exception as e:
            return jsonify({"error": str(e)})

    return "OK"


if __name__ == "__main__":
    app.run(debug=True)
