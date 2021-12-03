// add middlewares here related to projects
const Project = require('./projects-model');

 function validateId(req, res, next) {
 	const { id } = req.params
 	Project.get(id)
 	.then(foundId => {
 		if (foundId) {
 		req.project = foundId
 		next()
 		} else {
 		res.status(404).json({ message: 'user not found!' })
 		}
 	})
 	.catch(next)
 }

 function validateProject(req, res, next) {
 	const { name, description } = req.body;
 	if (name && description ) {
 		next()
 	} else {
 		res.status(400).json({message: "name and description required"})
 	}
 }
 function validateUpdatedProject(req, res, next) {
 	const { name, description, completed } = req.body;
 	if (name && description && typeof completed === 'boolean' ) {
 		next()
 	} else {
 		res.status(400).json({message: "name and description required"})
 	}
 }

 function handleError(err, req, res) {
 	res.status(err.status || 400).json({
 	message: err.message
 	})
 }

 module.exports = {handleError, validateId, validateProject, validateUpdatedProject}