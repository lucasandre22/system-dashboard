#!/bin/bash

#primeira vez, rodar lcpu
#roda top aqui
#pega pid
#enquanto tiver rodando, enquanto nao apertar ctrl+c:wq
#top -b -n 1
top_processes_headers=(Pid User Pr Ni Virt Res Shr S Cpu Mem Time Command)
output=""
first=1
#awk '/%MEM/,0' tmp_files/top.tmp | while read -r line
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
printf $output

#while read name
#do
#    echo "$name"
#done < tmp_files/top.tmp