const Budget = require('../models/Budget')
const Category = require('../models/Categories')

const budgetCtrl = {}

budgetCtrl.update = (req, res) => {
    const id = req.params.id
    console.log('id', id)
    const body = req.body
    console.log('body', body)
    Budget.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((budget) => {
            console.log('budget', budget)
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

budgetCtrl.list = (req, res) => {
    Budget.findOne({ userId: req.user._id })
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports = budgetCtrl