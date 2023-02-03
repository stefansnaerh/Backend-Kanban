const express = require('express')
const router = express.Router()
const {getBoards, setBoard, updateBoard, deleteBoard } = require('../controllers/boardController')
const { setTask, deleteTask, updateTask } = require('../controllers/taskController')

const { protect } = require('../middleware/authMiddleware')


// routes for boards
router.route('/').get(getBoards).post(setBoard)
router.route('/:id').delete( deleteBoard).put(updateBoard)

// routes for tasks
router.post('/:boardId', setTask)
router.delete('/:boardId/tasks/:taskId', deleteTask)
router.put('/:boardId/tasks/:taskId', updateTask)




module.exports = router 