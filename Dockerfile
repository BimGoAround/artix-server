# Dockerfile for Artix server with nestjs

# Node version
FROM node:20.12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

RUN npm run build

# Expose port
EXPOSE 8080

# Run the app
CMD [ "node", "dist/main" ]
