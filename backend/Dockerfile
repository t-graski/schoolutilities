FROM node
EXPOSE 8888
WORKDIR /schoolutilities-backend
COPY . .
RUN npm install -g npm@7.5.5
RUN npm install
CMD ["npm", "start"]