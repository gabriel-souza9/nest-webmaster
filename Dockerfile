# Use uma imagem base do Node.js
FROM node:18

# Crie o diretório de trabalho da aplicação
WORKDIR /usr/src/app

# Copie o arquivo package.json e o arquivo package-lock.json (se existir)
COPY package*.json ./

# Copie o arquivo tsconfig.json para o contêiner
COPY tsconfig.json ./

# Copie o resto dos arquivos da aplicação
COPY . .

# Instale as dependências da aplicação
RUN npm install

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "start"]
