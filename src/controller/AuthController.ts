import { Request, Response } from "express";

export default class AthController {
  async login(req : Request, res : Response) : Promise<void>{
    res.status(200).json({
      message: "Hello world",
    });
    return;
  }

  async register(req : Request, res : Response) : Promise<void>{

  }
}
