const actionData = require('../data/helpers/actionModel')
const projectData = require('../data/helpers/projectModel')


const validateAction = () => (req, res, next) => {
    if(!req.body) {
        return res
            .status(400)
            .json({ message: "Missing action data. "})
    }

    if (!req.body.description) {
        return res
            .status(400)
            .json({ message: "Missing required input - description"})
    }
    if (!req.body.notes) {
        return res
            .status(400)
            .json({ message: "Missing required input - notes"})
    }

    if (!req.body.completed) {
        return res
            .status(400)
            .json({ message: "Missing required input - completed"})
    }
    next()
}

const validateActionId = () => async (req, res, next) => {
    const action = await actionData.get(req.params.actionId)
    const project = await projectData.get(req.params.id)

    if(!project) {
        return res
            .status(400)
            .json({ message: "Invalid project id."})
    }
    if (!action) {
        return res
            .status(400)
            .json({ message: "Invalid action id"})
    }
    req.action = action;
    next()
}



const validateProject = () => (req, res, next) => {
    if(!req.body) {
        return res
            .status(400)
            .json({ message: "Missing project data. "})
    }
    if (!req.body.name) {
        return res
            .status(400)
            .json({ message: "Missing required input - name"})
    }
    if (!req.body.description) {
        return res
            .status(400)
            .json({ message: "Missing required input - description"})
    }
    next()
}

const validateProjectId = () => async (req, res, next) => {
    const id = await projectData.get(req.params.id)

    if (!id) {
        return res
            .status(400)
            .json({ message: "Invalid id."})
    } else {
        req.project = id;
    }
    next()
}


module.exports = {
    validateAction,
    validateActionId,
    validateProject,
    validateProjectId,
}