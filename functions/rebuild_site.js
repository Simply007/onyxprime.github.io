const axios = require("axios");

exports.handler = async function(event, context, callback) {
    const body = {
        "event_type": "kontent_publish",
        "client_payload": {
          "unit": false,
          "integration": true
        }
      }
    const headers = {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,     
        "Accept":"application/vnd.github.everest-preview+json",
        "Content-Type":"application/json"
    }     
    try{ 
        const result = await axios.post("https://api.github.com/repos/OnyxPrime/onyxprime.github.io/dispatches", body, {headers})        
        return { statusCode: result.status, body: result.data }
    } catch(exception){
        console.log(exception);
    }
    
}