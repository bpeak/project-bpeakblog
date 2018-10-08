console.log('SERVER STARTING.....')

import * as path from 'path'
global.__rootDir = path.resolve(__dirname)
import App from './App'
import dbLauncher from './db/dbLauncher'

dbLauncher()
const app = new App().app
const PORT : number = Number(process.env.PORT) || 80
app.listen(PORT, () : void => { console.log(`PORT ${PORT} CONNECTED SUCCESS`) })
