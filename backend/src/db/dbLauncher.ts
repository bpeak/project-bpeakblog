import * as mongoose from 'mongoose'
import { dbConfig } from '~configs/secret/secret.config'

const dbLauncher = () : void => {
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error : '))
    db.once('open', () : void => {
        console.log('MONGODB CONNECTED SUCCESS BY MONGOOSE')
    })  
    mongoose.connect(dbConfig.url, dbConfig.option)
}

export default dbLauncher