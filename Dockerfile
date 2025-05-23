FROM node:23-alpine
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate
EXPOSE 4000

CMD [ "sh", "-c", "npm run prisma:migrate && npm run start" ]
