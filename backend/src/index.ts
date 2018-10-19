// import { Request, Response, NextFunction } from 'express'

// enum TargetModelNameOfBody {
//     POST = 'post',
//     COMMENT = 'comment'
// }

// interface IbodyCheckOption {
//     name : TargetModelNameOfBody,
//     field : string[]
// }

// const bodyCheckMiddleware = (bodyCheckOption : IbodyCheckOption | IbodyCheckOption[] ) => {

//     console.log(bodyCheckOption)

//     return (req : Request, res : Response, next : NextFunction) => {
//         if(true){
//             return next()
//         } else {
//             return res
//         }
//     }
// }

// bodyCheckMiddleware({
//     name : TargetModelNameOfBody.POST,
//     field : ['d']
// })

console.log('SERVER STARTING.....')
import * as path from 'path'
global.__rootDir = path.resolve(__dirname)

import App from './App'
import dbLauncher from '~db/dbLauncher'

dbLauncher()
const app = new App().app
const PORT : number = Number(process.env.PORT) || 80

app.listen(PORT, () : void => { 
    console.log(`PORT ${PORT} CONNECTED SUCCESS`) 
})
