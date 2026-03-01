import { Request } from "express";
import { IUserWithId } from "../../user/_shared/types/users.interface";

export interface Addtodorequest{
    title:string,
    description:string
}

export interface Addtodo extends Request{
    body:Addtodorequest
}

export interface AuthenticatedRequest extends Request {
  authenticatedUser?: IUserWithId;
}