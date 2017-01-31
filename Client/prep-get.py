#!/usr/bin/python3.4
import json
import argparse
import sys
from urllib import request
URL = "http://172.16.1.99:4242/install"

parser = argparse.ArgumentParser()
parser.add_argument('install', nargs='+', help='install a package')
args = parser.parse_args()

if sys.argv[1] == 'install' and sys.argv[2: ]:
    for _, value in parser.parse_args()._get_kwargs():
        print("ok")
else :
    print("No package(s) selected")

def main():
    count = 1
    while count < len(value):
        data = {"packets" :[{"name": value[count],"current_version": "2.0.0", "version": "2.0.1"}]}
        params = json.dumps(data).encode('utf8')
        req = request.Request(URL, data=params, headers={'content-type': 'application/json'})
        response = request.urlopen(req)
        count += 1
    
main()