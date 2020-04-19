FROM node:lts-alpine
EXPOSE 8080
WORKDIR /srv/quotes-api
ADD . /srv/quotes-api
RUN yarn
CMD ["yarn", "start"]