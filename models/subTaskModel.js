
const mongoose = require('mongoose')

const Schema = mongoose.Schema


const SubTaskSchema = new Schema ({
    name: String,
})

module.exports = mongoose.model('SubTask', SubTaskSchema)
