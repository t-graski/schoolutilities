FROM node
EXPOSE 8888
WORKDIR /schoolutilities-backend
COPY . .
RUN npm install -g npm@8.1.3
RUN npm install
CMD ["npm run", "start:prod"]