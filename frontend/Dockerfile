FROM node
EXPOSE 3000
WORKDIR /
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]