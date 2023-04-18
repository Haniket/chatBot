var express = require('express');
var router = express.Router();
// const {Configuration, OpenAIApi} = require("openai");
require('dotenv').config()
console.log(process.env.OPENAI_API_KEY);

var service = {};
service.getBotResponse=getBotResponse;
module.exports = service;


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let chathistory='';

async function getBotResponse(req,res) {
    try {
        // console.log("object",req.body.userMessage);
        chathistory=chathistory.concat('\nMe: ',req.body.userMessage)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `The following is a conversation between one of my friends and I, and you have to act like you are my friend and rember that you will not find bugs and complete the part of sentence that I missed in my chat but rather understands and make the chat going.My friend is helpful,kidding,emotional like a 25 year old human and very friendly and moody at times.Use imojie for showing expression\n\n ${req.body.userMessage}`,
            temperature: 0.5,
            max_tokens: 2160,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            // stop: ["You:"],
            // stop: [" Me:", "Friend:"],
        });
        // console.log(response.data.choices[0].text);
        chathistory=chathistory.concat('\nFriend: ',response.data.choices[0].text.split('\n\n').slice(1))
        return response.data.choices[0].text.split('\n\n').slice(1);
    }
    catch (error) {
        return error;
    }
}

