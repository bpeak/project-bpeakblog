import Post from '~db/models/post'

// 105 10
// 104 9
// 103 8
// 102 7
// 101 6
// 100 6
// 99 6
// 80 100

const conditions = { _id : 98 }
const update = { views : 300 }
Post.findOneAndUpdate(conditions, update, () => {

})


console.log('SERVER STARTING.....')

import * as path from 'path'
global.__rootDir = path.resolve(__dirname)
import App from './App'
import dbLauncher from './db/dbLauncher'

dbLauncher()
const app = new App().app
const PORT : number = Number(process.env.PORT) || 80
app.listen(PORT, () : void => { console.log(`PORT ${PORT} CONNECTED SUCCESS`) })
