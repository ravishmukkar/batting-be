const app = require("./index");
const http = require("http");
const config = require("./Config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
