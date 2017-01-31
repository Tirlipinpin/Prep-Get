#!/usr/bin/python3.4
import json
from urllib import request
URL = "http://172.16.1.99:4242/install"

def main() :
    data = {"packets" :[{"name": "emacs","current_version": "2.0.0"}]}
    params = json.dumps(data).encode('utf8')
    req = request.Request(URL, data=params, headers={'content-type': 'application/json'})
    response = request.urlopen(req)
    print(response.read().decode('utf8'))

main()