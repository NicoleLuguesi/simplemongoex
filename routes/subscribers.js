const express = require('express')
const router = express.Router() // use Router portion for express
const Subscriber = require('../models/subscriber')

module.exports = router

//Get all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Get One subscriber
router.get('/:id', getSubscriber, (req, res) => {
   // res.send(res.params.id)
  res.send(res.subscriber.name)
})

// Creating One subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber) //201 - successfully created an object
    } catch (err) {
        res.status(400).json({ message: err.message }) // something wrong with USER  input not SERVER
    }
})

// Updating One subscriber- patch to only update info given not ALL info as in (PUT)
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({ message: err.message})
        // res.subscriber
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber = null) {
            return res.status(404).json({ message: "Cannot find subscriber" })
        }
    } catch (err) {
        return res.status(500).json( { message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router

