#!/bin/bash

docker run -d -p 4855:5432 \
 -e POSTGRES_PASSWORD=final_postgres \
 postgres
