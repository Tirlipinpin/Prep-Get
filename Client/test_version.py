#!/usr/bin/python3.4
import json
import argparse
import sys
import os
import shutil
from urllib.request import urlopen
from urllib import request

ROOT = "http://172.16.1.99:4242"

def install():
    URL = ROOT + "/install"
    check = 0
    count = 1
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
        if "url" in file :
            print("Downloading " + file["name"])
            request.urlretrieve(ROOT + file["url"], "tmp_pack/" + file["name"] + ".tar.gz")
        else :
            print("Sorry, the package " + file["name"] + " doesn\'t exist")
            check += 1

    if check != 0 :
        print("Error while downloading some packages")
    else :
        print("Everything has been successfully downloaded")
    
def search():
    URL = ROOT + "/search"
    count = 1
    while count < len(value):
        print("Checking database for :", value[count])
        count += 1
    params = json.dumps(value).encode('utf8')
    req = request.Request(URL, data=params, headers={'content-type': 'application/json'})
    response = request.urlopen(req).read().decode("utf8")
    files = json.loads(response)
    for obj in files:
        print("Package found : ", obj['name'])

parser = argparse.ArgumentParser()
parser.add_argument('install', nargs='+', help='install a package')
# parser.add_argument('search', nargs='+', help='check if package exists')
args = parser.parse_args()

if sys.argv[1] == 'install' and sys.argv[2: ]:
    for _, value in parser.parse_args()._get_kwargs():
        pass
    install()
elif sys.argv[1] == 'search' and sys.argv[2: ]:
    for _, value in parser.parse_args()._get_kwargs():
        pass
    search()
elif sys.argv[1] != 'install' and sys.argv[1] != 'search':
    print("Bad entry, please consult the help")
else :
    print("No package(s) selected");
