#!/usr/bin/python3.4
import json
import argparse
import sys
import os
import shutil
import re
from urllib import request

ROOT = "http://172.16.1.74:4242"

def upload_func(path) :
    URL = ROOT + "/upload"
    if os.path.isfile(path) :
        if re.search('([^/]+)_([^_]+).tar.gz$', path):
            param = re.findall('([^/]+)_([^_]+).tar.gz$', '/tmp_pack/mysql-5.6_5.6.35.tar.gz')
            with open(path, "rb") as f:
                byte = f.read()
                req = request.Request(URL, data=byte, headers={'content-type': 'application/octet-stream'})
                req.add_header('package_name', param[0][0])
                req.add_header('package_version', param[0][1])
                req.add_header('Content-Length', '%d'% len(byte))
                response = request.urlopen(req).read().decode("utf8")
                print("File uploaded correctly")
        else:
            print("Bad name for the file, expected [PACKAGE]_[VERSION].tar.gz")
    else :
        print(path + ": No such file or directory")

def install_func():
    URL = ROOT + "/install"
    check = 0
    count = 0
    data = {"packages" :[]}
    while count < len(value):
        if '=' in value[count]:
            tmp = value[count].split("=")
            data["packages"].append({"name": tmp[0], "version": tmp[1]})
        else:
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
    
def search_func():
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
subparser = parser.add_subparsers()
install = subparser.add_parser('install', help='install a package')
install.add_argument('package', nargs='+', help='package name')
search = subparser.add_parser('search', help='check if package exists')
search.add_argument('search', nargs='+', help='check if package exists')
upload = subparser.add_parser('upload', help='upload a package to the server')
upload.add_argument('upload', nargs='+', help='upload a package to the server')
args = parser.parse_args()._get_kwargs()

if sys.argv[1] == 'install' and sys.argv[2: ]:
    for _, value in args:
        pass
    install_func()
elif sys.argv[1] == 'search' and sys.argv[2: ]:
    for _, value in args:
        pass
    search_func()
elif sys.argv[1] == 'upload' and sys.argv[2: ]:
    upload_func(sys.argv[2])
elif sys.argv[1] != 'install' and sys.argv[1] != 'search' and sys.argv[1] != 'upload':
    print("Bad entry, please consult the help")
else :
    print("No package(s) selected");
