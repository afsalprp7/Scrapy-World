import { Request } from "express";

export interface AuthenticatedRequest extends Request{
    user? : any
}

export type loginData = {
    email : string,
    password : string

}