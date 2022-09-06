#!/bin/bash
OUTPUT_FILE="./tmp_files/top_parsed.tmp"

first_line=$(grep "top -" < ./tmp_files/top.tmp)
second_line=$(grep "Tasks: " < ./tmp_files/top.tmp)
output=""

#make this commands quiet
echo $first_line
output+='time\n'
output+=$(echo $first_line | awk {'print $3'})
output+='\nup\n'
output+=$(echo $first_line | awk -F ' |,' {'print $5'})
output+='\nload_1\n'
output+=$(echo $first_line | awk -F ' |,' {'print $12'})
output+='\nload_5\n'
output+=$(echo $first_line | awk -F ' |,' {'print $14'})
output+='\nload_15\n'
output+=$(echo $first_line | awk -F ' |,' {'print $16'})
output+='\ntasks\n'
output+=$(echo $second_line | awk -F ' |:' {'print $3'})
output+='\nrunning\n'
output+=$(echo $second_line | awk -F ' |:' {'print $5'})
output+='\nsleeping\n'
output+=$(echo $second_line | awk -F ' |:' {'print $7'})
output+='\nstopped\n'
output+=$(echo $second_line | awk -F ' |:' {'print $9'})
output+='\nzombie\n'
output+=$(echo $second_line | awk -F ' |:' {'print $11'})


printf "$output" > ./tmp_files/top_parsed.tmp

exit 0