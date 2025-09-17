#!/bin/bash

# Load connection string from .env
set -a
source .env
set +a

dotnet tool install -g dotnet-ef && dotnet ef dbcontext scaffold "$CONN_STR" Npgsql.EntityFrameworkCore.PostgreSQL \
  --context MyDbContext \
  --no-onconfiguring \
  --schema library \
  --output-dir Models \
  --force
