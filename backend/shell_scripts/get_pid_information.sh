#!/bin/bash

proc_pid=$1

cmdline=$(cat /proc/$proc_pid/cmdline)