#!/usr/bin/python3.4
import argparse
import sys
import functions

parser = argparse.ArgumentParser()
subparser = parser.add_subparsers()
install = subparser.add_parser('install', help='install a package')
install.add_argument('package', nargs='+', help='package name')
search = subparser.add_parser('search', help='check if package exists')
search.add_argument('search', nargs='+', help='check if package exists')
upload = subparser.add_parser('upload', help='upload a package to the server')
upload.add_argument('upload', nargs='+', help='upload a package to the server')
user = subparser.add_parser('-u', help='choose a user to upload')
upload.add_argument('-u', nargs=1, help='choose a user to upload')
passwd = subparser.add_parser('-p', help='enter your user password')
upload.add_argument('-p', nargs=1, help='enter your user password')
args = parser.parse_args()._get_kwargs()

auth=[1, 2, 3]
count = 0
verif = 0

if sys.argv[1] == 'install' and sys.argv[2: ]:
    for _, value in args:
        pass
    functions.install_func(value)
elif sys.argv[1] == 'search' and sys.argv[2: ]:
    for _, value in args:
        pass
    functions.search_func(value)
elif sys.argv[1] == 'upload' and sys.argv[2: ]:
    for _, value in args:
        if value:
            auth[count] = value[0]
            count += 1
        else :
            verif += 1
            break
    if verif == 0 :
        functions.upload_func(auth)
    else:
        print("Not enough arguments")
elif sys.argv[1] != 'install' and sys.argv[1] != 'search' and sys.argv[1] != 'upload':
    print("Bad entry, please consult the help")
else :
    print("No package(s) selected")
