from flask import Flask, request,send_from_directory
from firebase_admin import credentials, initialize_app, storage
import subprocess
import os
from pydub import AudioSegment
import datetime
app = Flask(__name__,static_url_path='', static_folder='frontend/build')
from flask_cors import CORS
CORS(app)
cred = credentials.Certificate("./firebase_key.json")
initialize_app(cred, {'storageBucket': 'ethos-website-98c85.appspot.com'})
bucket = storage.bucket()

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route("/convert")
def convert():

    url = request.args.get('url')
    user = request.args.get('userid')
    filename=str(datetime.datetime.now().strftime('%Y%m%d%H%M%S'))
    output_path = filename+'.%(ext)s'
    command=['yt-dlp', '--extract-audio','--format','m4a', url, '-o', output_path]
    process=subprocess.run(command,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    audio = AudioSegment.from_file(filename+'.m4a', format='m4a')
    audio.export(filename+'.mp3', format='mp3')
    blob = bucket.blob(user+'/'+filename+'.mp3')
    blob.upload_from_filename(filename+'.mp3')
    blob.make_public()
    os.remove(filename+'.mp3')
    os.remove(filename+'.m4a')
    return user+'/'+filename+'.mp3'
@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')
if __name__ == "__main__":
    app.run()