#!/bin/bash

#primeira vez, rodar lcpu
#roda top aqui
#pega pid
#enquanto tiver rodando, enquanto nao apertar ctrl+c:wq
#top -b -n 1

while true
do
    top -d 0.2 > teste.txt
done

