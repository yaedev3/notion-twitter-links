#!/bin/bash

case "$1" in 
  'i')
    npm install
  ;;

  *)
    npm start
  ;;
esac