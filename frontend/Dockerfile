# ============================================================
# FRONTEND DOCKERFILE - React 18.2.0
# ============================================================

FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Eliminar archivos .env copiados del host
RUN rm -f .env .env.local .env.*.local

# Crear .env con configuración correcta
RUN echo "REACT_APP_API_URL=/api" > .env && \
    echo "REACT_APP_BACKEND_HOST=http://backend:3000" >> .env && \
    echo "SKIP_PREFLIGHT_CHECK=true" >> .env && \
    echo "TSC_COMPILE_ON_ERROR=true" >> .env && \
    echo "ESLINT_NO_DEV_ERRORS=true" >> .env && \
    echo "DISABLE_ESLINT_PLUGIN=true" >> .env

# Configuración de entorno para ignorar errores de TypeScript
ENV TSC_COMPILE_ON_ERROR=true
ENV ESLINT_NO_DEV_ERRORS=true
ENV DISABLE_ESLINT_PLUGIN=true
ENV SKIP_PREFLIGHT_CHECK=true

# Puerto
EXPOSE 3000

# Comando para ejecutar (docker-compose override en dev)
CMD ["npm", "start"]
