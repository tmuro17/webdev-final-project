#!/bin/bash

export SECRET_KEY_BASE=W68eso5YQOlbtvSNUR50N/HDWj6IaEhAwMR3LtzuBEQAefwYVbX84bvoTA7XtiGi
export MIX_ENV=prod
export PORT=4850
export DATABASE_URL="ecto://postgres:final_postgres@localhost:4855/final"

echo "Building..."

mix local.rebar --force
mix local.hex --force
mix deps.get --only prod
mix compile
mix phx.digest

echo "Generating release..."
mix release --overwrite

mix ecto.create
mix ecto.migrate
