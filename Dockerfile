FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Create a shell script to run migrations, seed data, and start the app
RUN echo '#!/bin/sh' > /usr/src/app/start.sh
RUN echo 'npm run seed:run && npm run start:prod' >> /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

CMD ["/usr/src/app/start.sh"]