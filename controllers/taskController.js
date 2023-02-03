const asyncHandler = require('express-async-handler')

const Board = require('../models/boardModel')
const Task = require('../models/taskModel')


// Desc : set task
// Route : set /api/boards/:boardsId
// access : private   
const setTask = asyncHandler(async(req, res) => {
    if(!req.body.name){
        res.status(400)
        throw new Error('please add task name')
    }
    Board.findOne({_id: req.params.boardId}, function(err, result){
        const task =  new Task({
            name : req.body.name,
            status: req.body.status,
            description: req.body.description,
            subtasks : req.body.subtasks

        })
        const destination = result
        destination.tasks.push(task)
        destination.save(function(err, advResult){
          res.status(200).json(advResult)
        })
    })
})

// Desc : update task  .
// Route : GET /api/boards/:boardId/tasks/:taskId
// access : Private  
const updateTask = asyncHandler(async(req, res) => {
        await Board.findById(req.params.boardId)
        .then((board) => {
            const taskToUpdate = board.tasks.id(req.params.taskId)
            taskToUpdate.set(req.body)
            return board.save()
        })
        .then((board) => {
            res.send({board})
        }).catch(e => res.status(400).send(e))
})

// Desc : delete task
// Route : GET /api/boards/:boardId/tasks/:taskId
// access : Private 
const deleteTask = asyncHandler(async(req, res) => {
     await Board.findOneAndUpdate(
        {_id: req.params.boardId}, 
        {$pull: {tasks : {_id: req.params.taskId}}},
         function(err, data){
     }).clone()
     res.status(200).json({id : req.params.taskId})
})


module.exports = {
    setTask,
    deleteTask,
    updateTask,
}