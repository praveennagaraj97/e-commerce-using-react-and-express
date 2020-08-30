import { connect, connection } from "mongoose";

import app from "./app";
import { serverCloser } from "./handlers/errorHandler";

connect(process.env.URIS, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database Connection Established!");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
    console.log(err);
  });

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  serverCloser(server, connection);
});
