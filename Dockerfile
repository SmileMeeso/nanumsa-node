FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["node", "index.js"]
CMD ["sh", "-c", "DEBUG=engine,socket.io* node index.js"]