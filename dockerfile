# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# COPY package*.json ./

#RUN npm install

COPY . .

EXPOSE 5000

# Define the command to run the application
CMD ["npm", "run", "dev"]
