const server = require("./server");
const startServer = () => {
  server.listen((port = process.env.PORT), () => {
    console.log(`Server is running on port ${port}`);
  });
};
startServer();
