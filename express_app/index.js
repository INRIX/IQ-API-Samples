const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const port = 3000
const axios = require('axios')
const NodeCache = require("node-cache")
const apiCache = new NodeCache()

var config = require('./config')

app.get('/getToken', (req, res) => {  // url to produce token based on appId and hashToken
  res.setHeader('Access-Control-Allow-Origin', '*'); // setup cors compatibility
  // get from .env variables
  // const appId = process.env.APP_ID; // req.query.appId
  // const hashToken = process.env.HASH_TOKEN;

    const appId=config.appId;
    const hashToken=config.hashToken;

  if (apiCache.has(appId)) {
    // Serve response from cache 
    // console.log('Retrieved value from cache !!!');
    res.json(apiCache.get(appId))
  } else {
    // create server request
    const config = {
      headers: {
        "content-type": "application/json",
        "Accept": "application/json"
      }
    }
    axios
      .get('https://api.iq.dev.inrix.systems/auth/v1/appToken',
        {
          params: {
            appId,
            hashToken
          }
        },
        config)
      .then(response => {
        if (response.status === 200) {
          //const twelvehours = 12*60*60;
          const twelvehours = 15;
          const exp =  (new Date().getTime() + twelvehours * 1000)/1000
        
          const payload = { 
            token: response.data.result.token,
            exp //in seconds
          }
          // Set value for same appId, in order to serve future requests efficiently
          apiCache.set(appId, payload)
          res.json(payload)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
})

app.listen(port, () => {
  console.log(`Token API listening at http://localhost:${port}`)
})


//console.log(`statusCode: ${response.status}`)
// console.log(response.data.result.token);