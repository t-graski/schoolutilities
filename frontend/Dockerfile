FROM node:latest As production
EXPOSE 3000
WORKDIR /schoolutilites-frontend
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
