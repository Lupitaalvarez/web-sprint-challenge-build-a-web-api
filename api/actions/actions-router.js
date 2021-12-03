// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Action = require('./actions-model')
const { validateActionId, validateActionPost } = require('./actions-middlware')

router.get('/', async (req, res, next) => {
    await Action.get(req.id).then(respnse => {
        if (!respnse) {
            respnse = []
            next()
        }
        res.json(respnse)
    })
        .catch(next)
})

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        res.status(200).json(req.action)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateActionPost, async (req, res, next) => {
    await Action.insert(req.body)
        .then(newAction => {
        res.status(201).json(newAction)
        })
    .catch(next)
})

router.put('/:id', validateActionPost, async (req, res, next) => {
    await Action.update(req.params.id, req.body)
        .then(updatedAction => {
        res.status(200).json(updatedAction)
        })
    .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    await Action.remove(req.params.id)
        .then(() => {
        res.status(200).json()
        })
    .catch(next)
})

module.exports = router;