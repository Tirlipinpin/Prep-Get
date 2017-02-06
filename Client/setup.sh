#!/bin/bash
if [ "$(whoami)" != "root" ]; then
    echo "Please use this script as root"
else
    if [ $# -eq 0 ]; then
        echo "Please specify a .tar.gz file to install."
    elif [ $# -gt 0 ]; then
        mkdir packages
        for file in $*; do
            echo "Extracting $file to packages folder"
            tar xvf $file -C ./packages
        done
        for app in ./packages/*; do
            if [ -d $app ]; then
                cd $app
                ./configure
                make
                make install
                cd ..
            else
                echo "$app not a folder"
            fi
        done
    fi
fi