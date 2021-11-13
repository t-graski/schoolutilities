FROM node
EXPOSE 80
WORKDIR /schoolutilites-frontend
COPY . .
RUN npm install -g npm@8.1.3
RUN npm install
CMD ["npm", "start"]