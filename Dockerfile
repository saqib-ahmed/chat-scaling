FROM node:6.14-alpine

ARG BUILD_DATE="25th April, 2018"
ARG VCS_REF="467076ce9200d7c4a2556767367599fdfb3a0015"
ARG VERSION="1.0"
LABEL org.label-schema.build-date=$BUILD_DATE \
        org.label-schema.name="Scalable chat" \
        org.label-schema.description="This application shows how web-sockets behave with multiple replicas of a chat application." \
        org.label-schema.url="e.g. https://www.example.com/" \
        org.label-schema.vcs-ref=$VCS_REF \
        org.label-schema.vcs-url="https://github.com/saqibahmed515/chat-scaling" \
        org.label-schema.vendor="Saqib" \
        org.label-schema.version=$VERSION \
        org.label-schema.schema-version="1.0"

MAINTAINER Saqib Ahmed "saqibahmed515@gmail.com"

WORKDIR /app
COPY . /app
ENV PORT 3000
EXPOSE 3000

CMD [ "node", "app.js" ]
