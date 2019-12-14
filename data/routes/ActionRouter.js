const express = require('express')
const action = require('../helpers/actionModel')

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Successfully navigated to the action endpoint.")
})

module.exports = router;