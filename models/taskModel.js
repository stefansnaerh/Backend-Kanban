
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubTaskSchema = require('./subTaskModel').schema


const TaskSchema = new Schema({
    name : String,
    description : String,
    status: String,
    subtasks: []
    
})



module.exports = mongoose.model('Task', TaskSchema)