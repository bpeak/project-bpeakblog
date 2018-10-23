// import Post from '~db/models/post'

// Post.findOne({_id : 219}, (err, post) => {
//     if(post){
//         post.views = 900
//         post.save()
//     }
// })

const a = [1,2,3,2,3,3,4,2,5]

a.sort((a,b) => {
    return a-b
})

console.log(a)

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
