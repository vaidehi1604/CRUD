const axios = require('axios');

exports.homeRoutes = (req, res) => {
    //make a get request to /api/course
    axios.get('http://localhost:3000/api/course')
        .then(function(response){
            res.render('index',{course: response.data});
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_course = (req, res) => {
    res.render('add_course');
}

exports.update_course = (req, res) => {
    axios.get('http://localhost:3000/api/course',{params:{id:req.query.id}})
    .then(function(coursedata){
        res.render("update_course",{course:coursedata.data});
    })
    .catch(err=>{
        res.send(err);
    })    
    
}