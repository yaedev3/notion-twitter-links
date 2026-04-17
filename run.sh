#!/bin/bash

case "$1" in 
  'i')
    npm install
  ;;

  'notion')
    curl http://localhost:3000/export-notion
  ;;

  'database')
    curl http://localhost:3000/export-database
  ;;

  'convert')
    curl http://localhost:3000/convert-database
  ;;

  'clean')
    curl http://localhost:3000/clean-file
  ;;

  'tag')
    curl http://localhost:3000/package-tag
  ;;

  *)
    npm start
  ;;
esac