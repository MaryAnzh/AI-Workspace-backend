## AI-Workspace-backend

/var/www/
    backend/
        docker-compose.yml
        .env
        src/
        prisma/
        node_modules/ (в контейнере)
        logs/
    frontend/
        index.html
        assets/
        ...
    db/
        postgres-data/
    nginx/
        nginx.conf
        ssl/

AI integration:
- Gemini + HuggingFace)

Деплой бека
cd /var/www/backend
git pull origin main
docker compose down
docker compose up --build -d
docker compose exec app npx prisma migrate deploy
