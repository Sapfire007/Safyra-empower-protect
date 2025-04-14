const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Endpoint to save alert data
app.post('/save-alert', (req, res) => {
    try {
        const alertData = req.body;
        const filePath = path.join(__dirname, 'response.json');
        
        fs.writeFileSync(filePath, JSON.stringify(alertData, null, 2));
        
        console.log(`Alert saved to ${filePath}`);
        res.status(200).send({ success: true, message: 'Alert saved successfully' });
    } catch (error) {
        console.error('Error saving alert:', error);
        res.status(500).send({ success: false, message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open this URL in your browser to view the weapon detection app`);
});