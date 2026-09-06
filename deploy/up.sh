#!/usr/bin/env bash
# Pokreće Postgres na serveru. Jednokratno: kopira .env.example ako .env ne postoji.
set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f .env ]]; then
  cp .env.example .env
  chmod 600 .env
  echo "==> Kreiran deploy/.env — promeni POSTGRES_PASSWORD pa ponovo pokreni:"
  echo "    ./up.sh"
  exit 1
fi

if grep -q 'POSTGRES_PASSWORD=change_me' .env; then
  echo "ERROR: U .env još stoji change_me — postavi pravu lozinku."
  exit 1
fi

docker compose up -d
echo "==> nomi-postgres je pokrenut (healthy check u toku)."
echo "    Provera: docker compose ps && docker compose logs -f postgres"
