FROM node:22-alpine
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate
EXPOSE 4000

CMD [ "sh", "-c", "npm run prisma:dev && npm run start" ]
