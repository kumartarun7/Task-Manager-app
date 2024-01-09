const ToDoModel = require("../models/ToDoModel");

module.exports.getToDos = async (req, res) => {
  const toDos = await ToDoModel.find();
  res.send(toDos);
};

module.exports.saveToDo = (req, res) => {
  let  toDo  = req.body;

//  console.log(req.body);
//   let user = new ToDoModel();
//     user.toDo = req.body.toDo;
//     user.Duedate = req.body.Duedate;
//     const doc = await user.save();

  ToDoModel.create( toDo )
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  ToDoModel.findByIdAndUpdate(id, { toDo })
    .then(() => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
