var CRUD = require('../models/model');

// create and save new course
exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message: "content can not be empty!"});
        return;
    }

    //new course
    const course = new CRUD({
        courseName: req.body.courseName,
        duration: req.body.duration,
        fees: req.body.fees
    })

    //save course in database
    course
        .save(course)
        .then(data => {
            // res.send(data)
            res.redirect('/add-course')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while cretae a create operation"
            })
        })
}

// retrive and return all course
exports.find = (req, res) => {
    CRUD.find()
    .then(course => {
        res.send(course)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || " error occured while cretae a create operation"
        })
    })
}

// update a new course
exports.update = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message: "content can not be empty!"});
        return;
    }

    const id = req.params.id;
    console.log(id);
    CRUD.findByIdAndUpdate(id,req.body,{ useFindAndModify: false })
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update user information"})
    })
}

// delete a course
exports.delete = (req, res) => {

    const id = req.params.id;
    CRUD.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.send({
                message : "Course was deleted successfully!"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete Course with id=" + id
        });
    });
}