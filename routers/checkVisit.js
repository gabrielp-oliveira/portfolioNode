const express = require('express')
const router = express.Router()

require('dotenv').config()

var count = 0

router.post('/',  async (req, res) => {
        count = count+1
        return res.send('ok')
})
router.get('/',  async (req, res) => {
        return res.send({count: count})
})


module.exports = app => app.use('/checkvisit', router)
