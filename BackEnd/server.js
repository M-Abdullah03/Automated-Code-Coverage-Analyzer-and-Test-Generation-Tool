const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { generateTestCases } = require('./Driver.js');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './')
    },
    filename: function (req, file, cb) {
        cb(null, 'main.js') // Set the file name
    }
})

const upload = multer({ storage: storage }); // use the custom storage

const app = express();
const port = 3000;
app.use(cors());

app.listen(port, () => console.log(`Server running on port ${port}`));

app.post('/coverage', upload.single('file'), (req, res) => {
    try {
        console.log("Generating test cases")
        const result = generateTestCases('main.js');

        // Return the results
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating test cases' });
    }
});

app.get('/getLcov', (req, res) => {
    const file = path.join(__dirname, './coverage/lcov-report/main.js.html');
    res.sendFile(file);
});

app.get('/getTests', (req, res) => {
    const file = path.join(__dirname, './test.js');
    res.sendFile(file);
});
