#!/bin/bash
OUTPUT_FILE="./tmp_files/top_parsed.tmp"

fileContent=$(<./tmp_files/top.tmp)

first_line=$(grep "top -" <<< "$fileContent")
second_line=$(grep "Tasks: " <<< "$fileContent")
output=""
top_processes_headers=(Pid User Pr Ni Virt Res Shr S Cpu Mem Time Command)
#top_processes_headers=(Pid User  .... valueN)

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
output+='\n'

#top processes headers
top_processes_headers=(Pid User Pr Ni Virt Res Shr S Cpu Mem Time Command)
#output=""
#to remove the header itself
first=1

#remove the character '%' since it causes errors to printf
command="$(awk '/%MEM/,0' tmp_files/top.tmp | sed -e 's/%//g')"
while IFS= read -r line
do
    i=0
    if [ $first == 0 ]; then
        for word in $line
        do
            output+=${top_processes_headers[$i]}
            output+="\n"
            output+="$word"
            output+="\n"
            ((i++))
        done
    else
        first=0
    fi
done < <(printf '%s\n' "$command")

printf "$output" > ./tmp_files/top_parsed.tmp

exit 0