// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');
const { handleError, validateId, validateProject, validateUpdatedProject } = require('./projects-middleware');

router.get('/', (req, res, next) => {
 	Project.get()
 		.then(project => {
 		res.status(200).json(project)
 		})
 		.catch(next)
})

router.get('/:id', validateId, (req, res ) => {
 	res.json(req.project) 
})

router.post('/', validateProject, async (req, res, next) => {
 	try {
 		await Project.insert(req.body).then(newProject => {
 			res.json(newProject)
 		})
 	} catch (err) {
 		next(err)
 	}
})

router.put('/:id', validateUpdatedProject, validateId, async (req, res,) => {
 	const { id } = req.params
 		await Project.update(id, req.body).then(updatedP => {
 		res.json(updatedP)
 	})
})

router.delete('/:id', validateId, async (req, res) => {
 	const { id } = req.params;
 	await Project.remove(id).then(() => {
 		res.json()
 	})
})

router.use(handleError)

module.exports = router;