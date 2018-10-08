import { Request, Response } from 'express'
import fetch from 'node-fetch'

const googleCtrl = (req : Request, res : Response) => {
    const { code } = req.query

    // var postVal = "grant_type=authorization_code"+"&code="+req.query.code+"&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&redirect_uri="+REDIRECT_URI;

    fetch('https://www.googleapis.com/auth/plus.login', {
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        method : "POST"
    })
    .then(data => data.json())
    .then(json => console.log(json))
}

export default googleCtrl