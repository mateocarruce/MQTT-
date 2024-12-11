# Usa una imagen base de Node.js
FROM node:14

# Crea y establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 3000 (puerto en el que corre la app)
EXPOSE 3000

# Inicia la aplicación
CMD ["node", "app.js"]
