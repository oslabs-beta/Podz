FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# run 'docker build -t whaleexample:1.0 .'
# check your images with 'docker images' or use docker desktop
# run 'docker run -d -p 2221:8080 whaleexample:1.0'
