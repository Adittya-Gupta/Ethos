from flask import Flask, request, jsonify,send_file,make_response
from pytube import YouTube
from firebase_admin import credentials, initialize_app, storage
import re
import subprocess
import os
from pydub import AudioSegment
import datetime
app = Flask(__name__)

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
    print(user)
    print(url)
    filename=str(datetime.datetime.now().strftime('%Y%m%d%H%M%S'))
    output_path = filename+'.%(ext)s'
    command=['yt-dlp', '--extract-audio','--format','m4a', url, '-o', output_path]
    process=subprocess.run(command,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    print(process.stdout.decode())
    # output = process.stdout.decode()
    # filename = re.findall(r'Destination: (.*)', output)[-1]
    audio = AudioSegment.from_file(filename+'.m4a', format='m4a')
    audio.export(filename+'.mp3', format='mp3')
    # ext=filename.split('.')[-1]
    # wav_audio = AudioSegment.from_file(filename, format=ext)
    # wav_audio.export("audio.mp3", format="mp3")
    # print(filename)
    # filename = 'audio.mp3'
    # blob = bucket.blob(user+'/'+filename+'.mp3')
    blob = bucket.blob()
    print(blob)
    blob.upload_from_filename(filename+'.mp3')
    blob.make_public()
    os.remove(filename+'.mp3')
    os.remove(filename+'.m4a')
    return user+'/'+filename+'.mp3'

if __name__ == "__main__":
    app.run()