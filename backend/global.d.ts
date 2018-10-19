// import { IUser } from '~db/models/user'

declare namespace NodeJS {
    export interface Global {
        __rootDir : string
    }
}

declare namespace Express {
    export interface Request {
        user : any
    }
}