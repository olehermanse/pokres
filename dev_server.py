from flask import Flask, request, send_from_directory, redirect
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def root():
    return redirect('pokres/index.html')

@app.route('/index.html')
def index():
    return redirect('pokres/index.html')

@app.route('/pokres/<path:path>')
def send_js(path):
    if path == "index.html":
        return send_from_directory("./", "index.html")
    return send_from_directory('./', path)

if __name__ == "__main__":
    app.run("0.0.0.0")
