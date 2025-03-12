FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Expose the port!
EXPOSE 4000

# Start the API server
CMD ["node", "app.js"]
