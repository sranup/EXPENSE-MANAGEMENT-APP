const Category = require('../models/Categories')

const categoryCtrl = {}

categoryCtrl.create = (req, res) => {
    const body = req.body
    const categoryDetails = new Category(body)
    categoryDetails.userId = req.user._id
    categoryDetails.save()
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            res.json(err)
        })
}

categoryCtrl.list = (req, res) => {
    Category.find({ userId: req.user._id })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

categoryCtrl.show = (req, res) => {
    const id = req.params.id
    Category.findOne({ _id: id, userId: req.user._id })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })

}

categoryCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Category.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

categoryCtrl.destroy = (req, res) => {
    const id = req.params.id
    Category.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })

}

module.exports = categoryCtrl