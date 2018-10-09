import * as path from 'path'
import * as express from "express"
import { Request, Response } from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"

import api from './api'

class App {
    
    public app: express.Application

    constructor() {
        this.app = express()
        this.parserSetup()
        this.RouterSetup()
    }

    private parserSetup(): void{
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cookieParser())
    }

    private RouterSetup(): void{
        this.app.use('/api', (req, res, next) => {
            // const authorization : string | undefined = req.headers['authorization']
            // if(!authorization){ return console.log('헤더미존재')}

            // console.log(authorization.split(' ')[1])
            // res.sendFile(path.resolve(path.join(global.__rootDir, '../../frontend/dist/index.html')))
            next()
        }, api)
        this.app.use('/dist', express.static(path.join(global.__rootDir, '../../frontend/dist')))
        this.app.use('/public', express.static(path.join(global.__rootDir, '/public')))
        this.app.get('*', (req : Request, res : Response) : void => {
            res.sendFile(path.resolve(path.join(global.__rootDir, '../../frontend/dist/index.html')))
        })
    }

}

export default App