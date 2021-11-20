require('dotenv').config()
const page = require('./page')
const nodemailer = require("nodemailer");
const config = require('./config')
const { google } = require('googleapis')
const Oauth2 = google.auth.OAuth2

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
    
    transporter.sendMail({
      text: '<Gabriel P. Oliveira> - Portfolio',
      subject: targetInfo.subject,
      from: " <Gabriel P. Oliveira>",
      to: targetInfo.email,
      html: page(targetInfo),
    }, function(error, info){
      if (error) {
        throw error
      } else {
        console.log(info)
        return resp.send({ok: info.response})
      }
    });
  } catch (error) {
    console.log('error -> '+error)

    throw error
  }

}

module.exports = sendEmail

