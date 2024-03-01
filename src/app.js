import express from "express";

export class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000; // get .env port
  }

  // initiate server listener
  listen() {
    this.app.listen(this.port, () =>
      console.log(`server is running at http://localhost:${this.port} `)
    );
  }
}
