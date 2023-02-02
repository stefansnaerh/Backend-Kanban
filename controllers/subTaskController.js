const asyncHandler = require('express-async-handler')

const Board = require('../models/boardModel')
const Task = require('../models/taskModel')
const SubTask = require('../models/subTaskModel')




// Desc : set subTask
// Route : set /api/boards/:boardsId/tasks/:taskId
// access : private
const setSubTask = asyncHandler(async(req, res) => {
    const boardId = req.params.boardId
    const taskId = req.params.taskId

    Board.findOne({_id : req.params.boardId}, function(err, result){
        const newSubtask = new SubTask({
            name : req.body.name,
            done : false
        })
        const getTask = result
        const getSubTasks = getTask.tasks.filter(task => task._id == taskId)
        getSubTasks[0].subtasks.push(newSubtask)
        getTask.save(function(err, advResult){
            res.status(200).json(advResult)
        });
    });
    })

// Desc : update subTask
// Route : put /api/boards/:boardsId/tasks/:taskId
// access : private
const updateSubTask = asyncHandler(async(req, res) => {
   await Board.findById(req.params.boardId)
    .then((board) => {
        const findTaskToUpdate = board.tasks.id(req.params.taskId).subtasks.id(req.params.subtaskId)
        findTaskToUpdate.set(req.body)
        return board.save()
    })
    .then((board) => {
        res.send({board})
    }).catch(e => res.status(400).send(e))
   
})



// Desc : delete subTask
// Route : put /api/boards/:boardsId/tasks/:taskId
// access : private
const deleteSubTask = asyncHandler(async(req, res) => {
    await Board.findOneAndUpdate(
        {_id: req.params.boardId}, 
       {$pull : 
            {tasks : {
                subtasks: { $elemMatch : {_id:req.params.subtaskId}}
            }}},
         function(err, data){
            console.log(err, data)
     }).clone()
     res.status(200).json({id : req.params.subtaskId})
})

module.exports = {
    setSubTask,
    updateSubTask,
    deleteSubTask
}