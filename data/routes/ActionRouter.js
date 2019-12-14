const express = require('express')
const data = require('../helpers/actionModel')

const { 
    validateProjectId,
    validateAction,
    validateActionId
} = require('../../middleware/validation')

const router = express.Router({ mergeParams: true });

router.get('/:actionId', validateProjectId(), validateActionId(), (req, res, next) => {
    try {
        res
            .status(200)
            .json(req.action)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', validateAction(), validateProjectId(), async (req, res, next) => {

})

module.exports = router;

