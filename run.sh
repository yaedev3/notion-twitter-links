#!/bin/bash

case "$1" in 
  'i')
    npm install
  ;;

  'notion')
    curl http://localhost:3000/export-notion
  ;;

  *)
    npm start
  ;;
esac