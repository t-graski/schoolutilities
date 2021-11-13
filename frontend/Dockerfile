FROM node
EXPOSE 80
EXPOSE 443
WORKDIR /schoolutilities
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]