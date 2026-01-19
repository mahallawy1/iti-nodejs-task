const fs = require('fs');

const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];
///sync
fs.writeFileSync('students.json', JSON.stringify(studentData, null, 2));


const datafrom = JSON.parse(fs.readFileSync('students.json', 'utf8'));
console.log(datafrom);
/*
//async
fs.readFile('students.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  } 
    const studentsasync = JSON.parse(data);
    console.log(studentsasync);
});

fs.writeFile('students_async.json', JSON.stringify(studentData, null, 2), (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully');
});

function addStudent(student) {
    fs.readFile('students.json', 'utf8', (err, data) => {   
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const students = JSON.parse(data);
        students.push(student);
        fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Student added successfully');
        });
    });
}

const newStudent = {
  id: 4,
  name: "abdo mahalawy",
  age: 18,
  course: "os",
  grades: {
    networking: 85,
    cryptography: 90,
  },
};
addStudent(newStudent);
console.log("student added");
*/
//delete student by id
function deleteStudentById(studentId) {
    fs.readFile('students.json', 'utf8', (err, data) => {   
        if (err) {
            console.error('Error reading file:', err);
            return;
        }       
        let students = JSON.parse(data);
        students = students.filter(s => s.id !== studentId);
        fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {
            if (err) {  
                console.error('Error writing file:', err);
                return;
            }
            console.log('Student deleted successfully');
        });
    });
}
deleteStudentById(3);