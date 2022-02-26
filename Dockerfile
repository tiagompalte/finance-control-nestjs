FROM node:14-alpine
USER root
ENV TZ America/Sao_Paulo
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
