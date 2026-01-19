const http = require('http');
const mongoose = require('mongoose');
const Student = require('../model/students');

const MONGODB_URI = 'mongodb+srv://abdo:wN4aPxwBtuBdEomS@abdo.wdvxc.mongodb.net/?appName=abdo';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  
  if (req.url === '/students' && req.method === 'GET') {
    try {
      const students = await Student.find();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(students));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  else if (req.url === '/stats' && req.method === 'GET') {
    try {
      const total = await Student.countDocuments();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ total }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  else if (req.url === '/courses' && req.method === 'GET') {
    try {
      const students = await Student.find();
      const courses = students.map(s => s.course);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(courses));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  else if (req.url === '/students' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const student = new Student(data);
        await student.save();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(student));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
      }
    });
  }


  else if (req.url.startsWith('/students/') && req.method === 'GET') {
    try {
      const id = req.url.split('/')[2];
      const student = await Student.findById(id);

      if (student) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(student));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Student not found' }));
      }
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID format' }));
    }
  }

 
  else if (req.url.startsWith('/students/') && req.method === 'DELETE') {
    try {
      const id = req.url.split('/')[2];
      const student = await Student.findByIdAndDelete(id);

      if (student) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Student deleted successfully' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Student not found' }));
      }
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID format' }));
    }
  }


  else if (req.url.startsWith('/students/') && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    let body = '';

    req.on('data', chunk => { body += chunk; });

    req.on('end', async () => {
      try {
        const updateData = JSON.parse(body);
        const student = await Student.findByIdAndUpdate(id, updateData, { new: true });

        if (student) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(student));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Student not found' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid ID format' }));
      }
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`HTTP Server: http://localhost:${PORT}`);
  console.log('Routes:');
  console.log('  GET    /students     - Get all students');
  console.log('  GET    /students/:id - Get one student');
  console.log('  POST   /students     - Add student');
  console.log('  PUT    /students/:id - Update student');
  console.log('  DELETE /students/:id - Delete student');
  console.log('  GET    /stats        - Get stats');
  console.log('  GET    /courses      - Get courses');
});