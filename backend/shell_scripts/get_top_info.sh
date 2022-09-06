#!/bin/bash

top -b -n 1 | head -n 100 > ./tmp_files/top.tmp
exit 0
