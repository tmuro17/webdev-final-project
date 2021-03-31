#!/bin/bash
export SECRET_KEY_BASE=W68eso5YQOlbtvSNUR50N/HDWj6IaEhAwMR3LtzuBEQAefwYVbX84bvoTA7XtiGi
export MIX_ENV=prod
export PORT=4850

echo "Stopping old copy..."

/home/final/webdev_final_project/backend/_build/prod/rel/backend_final/bin/backend_final stop || true

echo "Starting app..."

/home/final/webdev_final_project/backend/_build/prod/rel/backend_final/bin/backend_final start
