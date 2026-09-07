#!/bin/bash
APP_DIR="/opt/docker/PicoPark-Dylan-Aragon"
IMAGE_NAME="dylanaragon/picopark"

echo "[WARN] Iniciando ROLLBACK..."
cd $APP_DIR || { echo "[ERROR] No se pudo acceder"; exit 1; }

if ! docker inspect type $IMAGE_NAME:backup > /dev/null 2>&1; then
    echo "[ERROR] No hay backup para restaurar."
    exit 1
fi

echo "[INFO] Restaurando versión anterior..."
docker tag $IMAGE_NAME:backup $IMAGE_NAME:latest

echo "[INFO] Reiniciando contenedor..."
docker compose down picopark-app
docker compose up -d picopark-app
echo "[ÉXITO] Rollback completado."
