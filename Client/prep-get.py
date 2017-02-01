#!/usr/bin/python3.4
import json
import argparse
import sys
import os
import shutil
from urllib import request
ROOT = "http://172.16.1.99:4242"
URL = ROOT + "/install"

parser = argparse.ArgumentParser()
parser.add_argument('install', nargs='+', help='install a package')
args = parser.parse_args()

if sys.argv[1] == 'install' and sys.argv[2: ]:
    for _, value in parser.parse_args()._get_kwargs():
        print("Packages sent")
else :
    print("No package(s) selected")

def main():
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
    print(files)
    for file in files :
        request.urlretrieve(ROOT + file.url, "tmp_pack/" + file.name + ".tar.gz")
    if os.listdir("tmp_pack") == [] :
        print("Error while downloading packages")
    else :
        print("Packages successfully downloaded")
    
main()
if os.path.exists("tmp_pack") :
    shutil.rmtree("tmp_pack", ignore_errors=True)