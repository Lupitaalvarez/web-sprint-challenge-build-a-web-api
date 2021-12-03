// add middlewares here related to actions

const Action = require('./actions-model')

async function validateActionId(req, res, next){
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({message: 'ID not found'})
        } else{
            req.action = action
            next()
        }
    }catch(err){
        res.status(500).json({message: 'an error occurred, action not found'})
    }
}

function validateActionPost(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (project_id && description && notes) {
        next()
    } else {
        res.status(400).json({message: "missing required fields"})
    }
}

module.exports = {validateActionId, validateActionPost}