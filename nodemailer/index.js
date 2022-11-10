require('dotenv').config()
const page = require('./page')
const nodemailer = require("nodemailer");
const config = require('./config')
const { google } = require('googleapis')
const Oauth2 = google.auth.OAuth2
const messageData = require('./../messageData')


const path = require('node:path');
const fs = require('fs');
const handlebars = require('handlebars');
const { language } = require('googleapis/build/src/apis/language');

const filePath = path.join(__dirname, '/emailTemplate/index.html');
const source = fs.readFileSync(filePath, 'utf-8').toString();
const template = handlebars.compile(source);


const OAuth2_client = new Oauth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({ refresh_token: config.refresh_token })
const accessToken =  OAuth2_client.getAccessToken()


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type : 'OAuth2',
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refresh_token,
      accessToken: accessToken
  }
});

function sendEmail(targetInfo, resp) {

  try {

    const replacements = {
      succes: messageData[targetInfo.Language]?.succes,
      contact: messageData[targetInfo.Language]?.contact,
      name: targetInfo.name,
      email: targetInfo.email,
      feedback1: messageData[targetInfo.Language]?.feedback[0],
      feedback2: messageData[targetInfo.Language]?.feedback[1],
      message: targetInfo.message
    };
    const htmlToSend = template(replacements);

    
    transporter.sendMail({
      text: '<Gabriel P. Oliveira> - Portfolio',
      subject: targetInfo.subject,
      from: " <Gabriel P. Oliveira>",
      to: targetInfo.email,
      // html: page(targetInfo),
      html: htmlToSend,
      attachments : [
        {
        filename: 'portfolio.png',
        path: './nodemailer/emailTemplate/portfolio.png',
        cid: 'portfolio'

      },
        {
        filename: 'github.png',
        path: './nodemailer/emailTemplate/github.png',
        cid: 'github'
      },
        {
        filename: 'email.png',
        path: './nodemailer/emailTemplate/email.png',
        cid: 'email'
      },
        {
        filename: 'linkedin.png',
        path: './nodemailer/emailTemplate/linkedin.png',
        cid: 'linkedin'
      },
        {
        filename: 'img.jpg',
        path: './nodemailer/emailTemplate/img.jpg',
        cid: 'img'

      },
    ]

    }, function(error, info){
      if (error) {
        throw error
      } else {
        return resp.send({ok: info.response})
      }
    });
  } catch (error) {
    console.log('error -> '+error)

    throw error
  }

}

module.exports = sendEmail

