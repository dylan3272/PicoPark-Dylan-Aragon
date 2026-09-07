
#!/bin/bash
APP_DIR="/opt/docker/PicoPark-Dylan-Aragon"
IMAGE_NAME="dylanaragon/picopark"
TAG=$(git rev-parse --short HEAD 2>/dev/null || echo "v1")

echo "[INFO] Iniciando despliegue de la versión: $TAG"

cd $APP_DIR || { echo "[ERROR] No se pudo acceder"; exit 1; }

if docker inspect type $IMAGE_NAME:latest > /dev/null 2>&1; then
    echo "[INFO] Creando backup..."
    docker tag $IMAGE_NAME:latest $IMAGE_NAME:backup
fi

echo "[INFO] Construyendo imagen..."
docker build -t $IMAGE_NAME:latest -t $IMAGE_NAME:$TAG .

echo "[INFO] Reiniciando servicios..."
docker compose down picopark-app
docker compose up -d picopark-app
echo "[ÉXITO] Despliegue completado."
