#!/bin/bash
OUTPUT_FILE="./tmp_files/top_parsed.tmp"

#make this commands quiet
echo "time" > ./tmp_files/top_parsed.tmp
grep "top -" < ./tmp_files/top.tmp | awk {'print $3'} >> ./tmp_files/top_parsed.tmp
exit 0