FROM node:20.5

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm

COPY . .

RUN pnpm install

ENTRYPOINT ["pnpm", "run", "build"]
