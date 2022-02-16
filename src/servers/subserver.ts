import express from "express";
import { watchContracts } from "../utils/watchContracts";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";

export class SubServer {
  private app: express.Application;
  private port: number;
  constructor() {
    this.app = express();
    this.port = 9786;
    this.configuration();
  }

  /**
   * Express Server Configuration
   */
  public configuration() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(cors());
  }

  /**
   * Start Express Server
   */
  public start() {
    this.app.listen(this.port, () => {
      console.info("SubServer is listening on", this.port);
      new watchContracts().watch();
    });
  }
}
