// Accessing the service that we just started

var TodoService = require('../services/todos.service');

// Saves the context of this module under the variable _this
var _this = this;


// Async Controller function to get the Todo List

exports.getTodos = async function(req, res, next){
    
    
    // Check the existence of the query parameters, if don't,
    // assigns a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    
    try{
        
        var todos = await TodoService.getTodos({}, page, limit)
        
        // Return the todos list with the appropiate HTTP Status code and Message
        
        return res.status(200)
                .json({status:200, data:todos, message: "Succesfully recieved Todos"});
                
    }catch (e) {
        
        // Return an error response Message with code and the error message
        
        return res.status(400)
                .json({status:400, message: e.message});
    }
}

exports.createTodo = async function(req, res, next){
    
    //req.body contains the form submit values
    
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }
    
    try {
        
        //Calling the service function with the new object from Request Body
        
        var createdTodo = await TodoService.createTodo(todo)
        
        return res.status(201)
            .json({status: 201, data: createdTodo, message: "Sucessfully created Todo"})
        
    } catch (e) {
        
        // Return an Error response message with code ant the Error Message
        
         return res.status(400)
            .json({status: 400, message: "Todo creation was unsucessfull"})
    }
}

exports.updateTodo = async function(req, res, next){
    
    // Id is necessary for the update, so we check if there is one
    
    if(!req.body._id){
        return res.status(400)
            .json({status: 400, message: "Id must be present"})
    }
    
    var id = req.body._id;
    
    console.log(req.body);
    
    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }
    
    try {
        
        var updatedTodo = await TodoService.updateTodo(todo)
        
        return res.status(200)
        .json({status: 200, data: updatedTodo, message: "Succesfully updated Todo"}) 
        
    } catch (e) {
        return res.status(400)
        .json({status: 400, message: e.message}) 
    }
}

exports.removeTodo = async function(req, res, next){
    
    var id = req.params.id;
    
    try {
        
        var deleted = await TodoService.deleteTodo(id)
        
        return res.status(204)
            .json({status: 204, message: "Sucessfully deleted Todo"});
            
    } catch (e) {
        
        return res.status(400)
            .json({status: 400, message: e.message});
    }
}