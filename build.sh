#!/bin/bash

#!/bin/bash
if [[ $1 -eq 0 ]] 
then
    echo 'no version passed, will only tag with :latest'
    docker build -t boardz-app:latest .
else    
    echo 'will tag with :latest and $($1)'
    docker build -t boardz-app:$1 -t boardz-app:latest .
fi


