const express = require('express');
const multer = require('multer');
const cors = require('cors');

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
    console.log(req.file);
    console.log("File saved")
    // req.file is the uploaded file
    // The file is automatically saved to the root directory by multer

    // Return the results
    res.json({ message: 'Code executed successfully' });
});