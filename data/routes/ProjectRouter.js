const express = require('express')
const data = require('../helpers/projectModel')
const { validateProject, validateProjectId } = require('../../middleware/validation')

const router = express.Router();

router.get('/', async (req, res, next) => {
    
    try {
        const projects = await data.get()
        res
            .status(200)
            .json(projects)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId(), (req, res, next) => {
    try {
        res
            .status(200)
            .json(req.project)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', validateProject(), async (req, res, next) => {
    try {
        const project = {
            name: req.body.name,
            description: req.body.description,
        }
        const newProject = await data.insert(project)
        res.status(201).json(newProject)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', validateProject(), validateProjectId(), async (req, res, next ) => {
    try {
        const project = {
            name: req.body.name,
            description: req.body.description
        }

        const update = await data.update(req.params.id, project)
        .then (update => {
            res
                .status(200)
                .json(update)
        })
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId(), async (req, res, next) => {
    try {
        const deletedProject = await data.delete(req.params.id)
        if(deletedProject) {
            res
                .status(204)
                .json({ message: "Project was successfully deleted. "})
        } 
    }
    catch (err) {
        next(err)
    }
})


module.exports = router;