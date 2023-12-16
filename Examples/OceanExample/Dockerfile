FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# run 'docker build -t oceanexample:1.0 .'
# check your images with 'docker images' or use docker desktop
# run 'docker run -d -p 2222:8080 oceanexample:1.0'