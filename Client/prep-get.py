#!/usr/bin/python3.4
import json
import argparse
import sys
import os
import shutil
from urllib import request

ROOT = "http://172.16.1.99:4242"

def install():
    URL = ROOT + "/install"
    count = 0
    data = {"packages" :[]}
    while count < len(value):
        data["packages"].append({"name": value[count]})
        count += 1
    params = json.dumps(data).encode('utf8')
    req = request.Request(URL, data=params, headers={'content-type': 'application/json'})
    response = request.urlopen(req).read().decode("utf8")
    files = json.loads(response)
    if not os.path.exists("tmp_pack") :
        os.makedirs("tmp_pack")
    for file in files :
        request.urlretrieve(ROOT + file["url"], "tmp_pack/" + file["name"] + ".tar.gz")
    if os.listdir("tmp_pack") == [] :
        print("Error while downloading packages")
    else :
        print("Packages successfully downloaded")
    
def search():
    URL = ROOT + "/search"
    print("Checking database for :", value[0])
    data = {"search": value[0]}
    params = json.dumps(data).encode('utf8')
    req = request.Request(URL, data=params, headers={'content-type': 'application/json'})
    response = request.urlopen(req).read().decode("utf8")
    files = json.loads(response)
    for obj in files:
        print("Package found : ", obj['name'])

parser = argparse.ArgumentParser()
parser.add_argument('install', nargs='+', help='install a package')
parser.add_argument('search', nargs='+', help='check if package exists')
args = parser.parse_args()

if sys.argv[1] == 'install' and sys.argv[2: ]:
    for _, value in parser.parse_args()._get_kwargs():
        pass
    install()
elif sys.argv[1] == 'search' and sys.argv[2: ]:
    for _, value in parser.parse_args()._get_kwargs():
        pass
    search()
else:
    print("No package(s) selected")