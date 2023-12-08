const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './' }); // save files to the root directory

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.post('/coverage', upload.single('file'), (req, res) => {
    // req.file is the uploaded file
    // The file is automatically saved to the root directory by multer

    // Return the results
    res.json({ message: 'Code executed successfully' });
});