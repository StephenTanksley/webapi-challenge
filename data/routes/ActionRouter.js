const express = require('express')
const data = require('../helpers/actionModel')
const projectData = require('../helpers/projectModel')

const { 
    validateProjectId,
    validateAction,
    validateActionId
} = require('../../middleware/validation')

const router = express.Router({ mergeParams: true });


router.get('/', validateProjectId(), async (req, res, next) => {
    try {
        const projectActions = await projectData.getProjectActions(req.params.id)
        res
            .status(200)
            .json(projectActions)
    }
    catch (err) {
        next(err)
    }
})


router.get('/:actionId', validateProjectId(), validateActionId(), async (req, res, next) => {
    // console.log(req.action)
    try {
        res
            .status(200)
            .json(req.action)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:actionId', validateAction(), validateProjectId(), validateActionId(), async (req, res, next) => {
    try {
        const action = {
            project_id: req.params.id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed,
        }
        const updatedAction = await data.update(req.params.actionId, action)
        .then(updatedAction => {
            res
                .status(200)
                .json(updatedAction)
        })
    }
    catch (err) {
        next(err)
    }
})

router.post('/', validateAction(), validateProjectId(), async (req, res, next) => {
    try {
        const action = {
            project_id: req.params.id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed,
        }

        const newAction = await data.insert(action)
        res
            .status(201)
            .json(newAction)
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:actionId', validateActionId(), validateProjectId(), async (req, res, next) => {
    try {
        const deletedAction = await data.remove(req.params.actionId)
        if(deletedAction) {
            res
                .status(204)
                .json({ message: "The action was deleted. "})
        }
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;