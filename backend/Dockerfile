# 1. Usamos una imagen ligera de Node
FROM node:18-alpine

# 2. Definimos dónde vivirá la app dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de dependencias
COPY package*.json ./

# 4. Instalamos dependencias (esto se ejecutará al construir la imagen)
RUN npm install

# 5. Copiamos el resto del código
COPY . .

# 6. Exponemos el puerto interno
EXPOSE 3000

# 7. Comando por defecto (Docker Compose sobreescribirá esto en modo dev)
CMD ["npm", "start"]