import argparse
import sys

parser = argparse.ArgumentParser()
parser.add_argument("install", help='Install a package')
args = parser.parse_args()

if args.install:
    if len(sys.argv) > 3:
        print(sys.argv[4])