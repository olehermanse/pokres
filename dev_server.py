from flask import Flask, request, send_from_directory
app = Flask(__name__, static_url_path='/', static_folder='/')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/pokres/<path:path>')
def send_js(path):
    return send_from_directory('./', path)

if __name__ == "__main__":
    app.run()
