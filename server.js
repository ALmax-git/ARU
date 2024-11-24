const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Route to add a new participant
app.post('/add-participant', (req, res) => {
    const newParticipant = req.body;

    const filePath = path.join(__dirname, 'ARU.json');

    // Read the existing JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read ARU.json file.' });
        }

        try {
            const aruData = JSON.parse(data);

            // Add the new participant to the participants array
            aruData.participants.push(newParticipant);

            // Write the updated JSON back to the file
            fs.writeFile(filePath, JSON.stringify(aruData, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to save ARU.json file.' });
                }

                res.status(200).json({ message: 'Participant added successfully!', data: newParticipant });
            });
        } catch (error) {
            res.status(500).json({ error: 'Error parsing ARU.json file.' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
