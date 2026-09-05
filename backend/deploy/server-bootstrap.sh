#!/usr/bin/env bash
# One-time setup on the server. Does NOT touch cbn-* or mailcow containers.
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/apps/elm}"
TS_IP="$(tailscale ip -4)"

echo "==> Tailscale IP: $TS_IP"
echo "==> App dir: $APP_DIR"

mkdir -p "$APP_DIR/backend"

if ! docker network inspect elm-net >/dev/null 2>&1; then
  docker network create elm-net
  echo "==> Created docker network elm-net"
else
  echo "==> Network elm-net already exists"
fi

if docker inspect elm-postgres >/dev/null 2>&1; then
  if ! docker inspect elm-postgres --format '{{json .NetworkSettings.Networks}}' | grep -q 'elm-net'; then
    docker network connect elm-net elm-postgres
    echo "==> Connected elm-postgres to elm-net"
  else
    echo "==> elm-postgres already on elm-net"
  fi
else
  echo "ERROR: elm-postgres container not found. Create it first."
  exit 1
fi

if [[ ! -f "$APP_DIR/backend/.env" ]]; then
  cat > "$APP_DIR/backend/.env" <<'EOF'
DB_PASSWORD=luka00!!
EOF
  chmod 600 "$APP_DIR/backend/.env"
  echo "==> Wrote $APP_DIR/backend/.env (edit password if needed)"
else
  echo "==> .env already exists, leaving it alone"
fi

echo
echo "Done. GitHub Actions will sync backend/ into $APP_DIR/backend and run:"
echo "  cd $APP_DIR/backend && docker compose up -d --build --force-recreate"
echo
echo "Backend will listen on ${TS_IP}:8081 (Tailscale only)."
