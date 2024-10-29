import { Request, Response } from "express";

export default class BaseController {
  async index(req : Request, res : Response) {
    res.send("Hello World");
  }
}
