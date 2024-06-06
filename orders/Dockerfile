# Usar a imagem base oficial do Node.js
FROM node:20

# Criar o diretório de trabalho
WORKDIR /app

# Copiar o package.json e yarn.lock
COPY package.json yarn.lock ./

# Instalar as dependências
RUN yarn install

# Copiar todo o código da aplicação
COPY . .

# Gerar os arquivos do Prisma
RUN yarn prisma generate

# Expor a porta da aplicação
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]
