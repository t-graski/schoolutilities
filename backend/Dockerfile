FROM node:latest As production
EXPOSE 8888
WORKDIR /schoolutilities-backend
COPY . .
RUN npm install --only=production
RUN npm run build
RUN npx prisma generate
CMD ["npm", "start"]