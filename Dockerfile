FROM node:6.14-alpine

MAINTAINER Saqib Ahmed "saqibahmed515@gmail.com"

WORKDIR /app
COPY . /app
ENV PORT 3000
EXPOSE 3000

CMD [ "node", "app.js" ]
