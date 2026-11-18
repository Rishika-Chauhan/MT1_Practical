const { getCourses, saveCourses } = require('./model');

exports.getAll = (req, res) => {
    res.json(getCourses());
};

exports.getById = (req, res) => {
    const courses = getCourses();
    const course = courses.find(c => c.id === Number(req.params.id));

    if (!course) return res.status(404).send('Course not found');

    res.json(course);
};

exports.add = (req, res) => {
    const courses = getCourses();
    const course = req.body;

    if (!course.id || !course.courename ||
        !course.coursecode || !course.department) {
        return res.status(400).send('All fields are required');
    }

    if (courses.some(c => c.id === Number(course.id))) {
        return res.status(409).send('ID already exists');
    }

    course.id = Number(course.id);
    courses.push(course);
    saveCourses(courses);

    res.status(201).send('Course added successfully');
};

exports.update = (req, res) => {
    const courses = getCourses();
    const id = Number(req.params.id);

    const index = courses.findIndex(c => c.id === id);

    if (index === -1) return res.status(404).send('Course not found');

    const { courename, coursecode, department } = req.body;

    if (!courename || !coursecode || !department) {
        return res.status(400).send('All fields are required');
    }

    courses[index] = { id, courename, coursecode, department };
    saveCourses(courses);

    res.send('Course updated successfully');
};

exports.remove = (req, res) => {
    const courses = getCourses();
    const id = Number(req.params.id);

    const newCourses = courses.filter(c => c.id !== id);

    if (courses.length === newCourses.length) {
        return res.status(404).send('Course not found');
    }

    saveCourses(newCourses);
    res.send('Course deleted successfully');
};