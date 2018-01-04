// We get the mongoose model created in /modules/todo.module
var ToDo = require ('../models/todo.model')

// Saves the context of this module under the variable _this
_this = this

// Async function to get the To do List

exports.getTodos = async function(query, page, limit){
    
    // Options setup for the mongoose paginate
    
    var options = {
        page,
        limit
    }
    
    // Try catch the awaited promise to handle the error
    
    try {
        var todos = await ToDo.paginate(query,options)
        
        // Return the todos list that was returned by the mongoose promise
        
        return todos;
        
    } catch (e) {
        
        // return an Error message describind the reason
        
        throw Error('Error while paginating Todos');
    }
}

exports.createTodo = async function(todo){
    
    // Create a new mongoose object by using the new keyword
    
    var newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    })
    
    try {
        
        //Saving the todo
        
        var savedTodo = await newTodo.save()
        
        return savedTodo;
        
    } catch (e) {
        
        // return an Error message describing the reason
        
        throw Error('Error while creating Todo');
    }
}

exports.updateTodo = async function(todo){
    var id = todo.id
    
    try {
        
        //Find the old Todo Object by the Id
        
        var oldTodo = await ToDo.findById(id);
        
    } catch (e) {
        
        throw Error("Error ocurred while finding todo")
    }
    
    // If no oldTodo exists, return false
    
    if(!oldTodo){
        return false;
    }
    
    console.log(oldTodo);
    
    //Edit the Todo Object
    
    oldTodo.title = todo.title
    oldTodo.description = todo.description
    oldTodo.status = todo.status
    
    console.log(oldTodo)
    
    try{
      
      var savedTodo = await oldTodo.save()
      return savedTodo;
      
    } catch (e) {
        
        throw Error ("Error while updating todo")
        
    }
    
}

exports.deleteTodo = async function(id){
    
    //Delete the Todo
    
    try{
        
        var deleted = await ToDo.remove({_id:id})
        
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted")
            
        }
        
        return deleted
        
    } catch (e) {
        
        throw Error("Error ocurred while deleting the Todo");
    }
}