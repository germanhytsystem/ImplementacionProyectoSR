from flask import Flask, render_template, request
import requests

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
    # return 'Hola Mundo'
    if request.method == 'GET':
        url = "http://127.0.0.1:8000/Peliculas"
        peliculas = requests.get(url)
        peliculasData = peliculas.json()
        print(peliculasData)
        return render_template("index.html", data=peliculasData)

    if request.form['peliculaid']:
        return render_template("modal.html")

    if request.form['search']:
        url = "http://127.0.0.1:8000/Peliculas?id="+request.form['search']
        peliculas = requests.get(url)
        peliculasData = peliculas.json()
        return render_template("index.html", data=peliculasData['data'])


if __name__ == "__name__":
    app.run(debug=True, port=5200)
