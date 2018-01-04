var express = require('express')

var router = express.Router()

// Getting the todo controller that we just created

var todoController = require('../../controllers/todos.controller')


// Map each API to the controller functions

router.get('/', todoController.getTodos)

router.post('/', todoController.createTodo)

router.put('/', todoController.updateTodo)

router.delete('/:id', todoController.removeTodo)

// Export the router

module.exports = router;