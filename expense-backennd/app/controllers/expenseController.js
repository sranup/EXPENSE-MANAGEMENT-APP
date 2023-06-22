const Expense = require('../models/Expense')
const Category = require('../models/Expense')

const expenseCtrl = {}

expenseCtrl.create = (req, res) => {
    const body = req.body
    const expenseDetails = new Expense(body)
    expenseDetails.userId = req.user._id
    const category = Category.find({ userId: req.user._id })
    expenseDetails.save()
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCtrl.list = (req, res) => {
    Expense.find({ userId: req.user._id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCtrl.show = (req, res) => {
    const id = req.params.id
    Expense.findOne({ _id: id, userId: req.user._id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Expense.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCtrl.showDeleted = (req, res) => {
    Expense.find({ userId: req.user._id, deleted: true })
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            res.json(err)
        })
}


expenseCtrl.softDelete = (req, res) => {
    const id = req.params.id
    Expense.delete({ _id: id, userId: req.user._id })
        .then((expense) => {
            res.json({
                'expense': expense,
                '_id': id
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCtrl.restoreExpense = (req, res) => {
    const id = req.params.id
    console.log('id', id)
    console.log('userId', req.user._id)
    Expense.findOne({ _id: id, userId: req.user._id, deleted: true })
        .then((expense) => {
            console.log('expense', expense)
            if (expense) {
                expense.restore()
                    .then((restored) => {
                        res.json(restored)
                        //console.log("restored", restored)
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } else {
                res.json('not found')
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCtrl.hardDelete = (req, res) => {
    const id = req.params.id
    Expense.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = expenseCtrl