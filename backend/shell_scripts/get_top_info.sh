#!/bin/bash

#top takes about ~160ms to run and put into the file
pid_quantity=$1
top -b -n 1 | head -n $pid_quantity > ./tmp_files/top.tmp
exit 0
