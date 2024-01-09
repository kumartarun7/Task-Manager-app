const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  Duedate: {
    type: String,
  }
});

module.exports = mongoose.model("ToDo", toDoSchema);



