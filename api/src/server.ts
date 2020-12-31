import { app } from "./app";

const PORT = '8070';
const server = app.listen(PORT, onListening);

function onListening() {
  console.log(`Listening on ${PORT}`);
}

export default server;
