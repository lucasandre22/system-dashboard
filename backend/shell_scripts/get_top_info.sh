#!/bin/bash

#top takes about ~160ms to run and put into the file
top -b -n 1 | head -n 15 > ./tmp_files/top.tmp
exit 0
