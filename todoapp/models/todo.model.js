var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// We create a todo schema with the necessary data for the todo items
var ToDoSchema = new  mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

// Then we create a model with that schema
ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('Todo', ToDoSchema)

// Then we export it as a module for external use
module.exports = ToDo;
