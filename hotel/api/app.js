const Joi = require('joi');
const express = require('express');
const path = require('path');
const app = express();




app.use(express.json());
app.use(express.static(__dirname + '/../public')); //__dir and not _dir


// app.use(__dirname,  {
//     extensions: ['html', 'htm'],

// });




const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('*', function (req, res, next) {
    // console.log(req.params[0] );
    var request = req.params[0];

    if ((request.substr(0, 1) === "/") && (request.substr(request.length - 4) === "html")) {
        request = request.substr(1);
        res.sendFile(path.join(__dirname + '/../public/' + request));
        //  ReactDOM.render(path.join(__dirname + '/../public/' + request), document.getElementById("loader"));
    } else { next(); }
})
// app.get('/', function(req, res) {
//     // console.log(path.join(__dirname + '/../public/index.html'));

//     res.sendFile(path.join(__dirname + '/../public/index.html'));


// });

app.get('/api/courses', (req, res) => {
    console.log(`recived request by `);
    console.log(req);
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');



    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(course);
}




// PORT
const port = process.env.PORT || 8080; // se non c'è una porta preimpostata dal enviroment usa 8080

app.listen(port, () => {

    console.log(`listening on port ${port}`);
});