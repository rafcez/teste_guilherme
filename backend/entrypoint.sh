#!/bin/sh

set -e

echo "Executando as migrations do banco de dados..."
npx prisma migrate deploy

exec "$@"