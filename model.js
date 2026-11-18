const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'courses.json');
function getCourses() {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}
function saveCourses(courses) {
    fs.writeFileSync(file, JSON.stringify(courses, null, 2));
}
module.exports = { getCourses, saveCourses };
