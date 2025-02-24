import { Request, Response } from "express";

export default abstract class BaseController {
  abstract getData(req : Request, res : Response): Promise<void>

  abstract createData(req : Request, res : Response): Promise<void>

  abstract updateData(req : Request, res : Response): Promise<void>

  abstract deleteData(req : Request, res : Response): Promise<void>
}
