const express = require('express')
const checkEmail = require('../middlewares/validateEmail')
const checkEmailDomain = require('../middlewares/checkEmailDomain')
const router = express.Router()
const sendNewEmail = require('../nodeMailer/index')
require('dotenv').config()

router.post('/', checkEmail, checkEmailDomain, async (req, res) => {
    const info = req.body.info
    try {
        sendNewEmail(info, res)
    } catch (error) {
        console.log('error -> '+error)
        throw error
    }
    return res.send({ok: 'OK'})
})

module.exports = app => app.use('/sendEmail', router)