

const mongoose = require('mongoose')
const TaskSchema = require('./taskModel').schema


const BoardSchema = mongoose.Schema(
    {
    title : {
        type : String,
        required: true
    },
    columns: [],
    tasks: [TaskSchema]
}, {
    timestamps : true,
    }
) 



module.exports = mongoose.model('Board', BoardSchema)