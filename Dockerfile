FROM node
EXPOSE 80
EXPOSE 443
WORKDIR /
COPY . .
RUN npm install
CMD ["npm", "start"]