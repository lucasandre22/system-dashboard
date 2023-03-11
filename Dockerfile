#Be sure to exec the following command before:
#tar -cvzf backend.tar.gz backend --exclude='./backend/tmp_files' --exclude='./backend/node_modules'
#tar -cvzf frontend.tar.gz frontend

FROM node:16

WORKDIR /usr/src

#Copy node project packages declarations
ADD backend.tar.gz  ./
ADD frontend.tar.gz ./

#Install app dependencies
WORKDIR /usr/src/backend
RUN npm install

EXPOSE 7777

#Command to run the app
CMD [ "node", "src/server.js" ]