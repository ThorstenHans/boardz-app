#!/bin/bash

echo $1
npm run build
docker build -t thorstenhans/boardz-spa:$1 -t thorstenhans/boardz-spa:latest .

