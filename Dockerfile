FROM node:23-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application and build
COPY . .
RUN yarn build

RUN npx prisma generate

EXPOSE 50051

CMD ["node", "dist/main"]
