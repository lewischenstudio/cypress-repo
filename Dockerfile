FROM cypress/included:latest

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT []

CMD [ "npm", "run", "cy:run:all" ]