FROM node:18-alpine


WORKDIR /app


COPY app/package.json ./
RUN npm install


COPY app/ .


EXPOSE 3000


HEALTHCHECK --interval=5s --timeout=3s --retries=5 \
    CMD wget -qO- http://localhost:3000/health || exit 1


CMD ["node", "server.js"]