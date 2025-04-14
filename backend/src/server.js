import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import batteryRoutes from './routes/batteryRoutes.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create batteryRoutes manually to avoid path-to-regexp issues
const router = express.Router();

// Get battery status
router.get('/status', (req, res) => {
  res.json({
    deviceId: 'device-001',
    batteryLevel: 78,
    lastCharged: '2023-11-15T08:30:00Z',
    estimatedTimeRemaining: '32 hours',
    chargeCycles: 42,
    batteryHealth: 'Good',
    status: 'Discharging',
    temperature: '28°C'
  });
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../../public')));
// Serve audio files from the VCTrack/OutputSOS directory
app.use('/sos-audio', express.static(path.join(__dirname, '../VCTrack/OutputSOS')));

// API Routes
app.use('/api/battery', batteryRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Route to serve the battery details page
app.get('/battery-details', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/battery-details.html'));
});

// Route to serve the SOS reports page
app.get('/sos-reports', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/sos-reports.html'));
});

// Route to serve the SOS voicemails page
app.get('/sos-voicemails', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/sos-voicemails.html'));
});

// API endpoint to get SOS reports data
app.get('/api/sos-reports', (req, res) => {
  try {
    // Read the response.json file from the WreaponDetect2 directory
    const sosReportsPath = path.join(__dirname, '../WreaponDetect2/response.json');
    
    if (fs.existsSync(sosReportsPath)) {
      const sosReportData = JSON.parse(fs.readFileSync(sosReportsPath, 'utf8'));
      res.status(200).json({
        success: true,
        data: sosReportData
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No SOS reports found'
      });
    }
  } catch (error) {
    console.error('Error fetching SOS reports:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SOS reports',
      error: error.message
    });
  }
});

// API endpoint to get SOS voicemail data
app.get('/api/sos-voicemails', (req, res) => {
  try {
    const sosVoicemailsDir = path.join(__dirname, '../VCTrack/OutputSOSaudio');
    
    if (!fs.existsSync(sosVoicemailsDir)) {
      return res.status(404).json({
        success: false,
        message: 'OutputSOSaudio directory not found'
      });
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(sosVoicemailsDir);
    
    // Filter for audio files and JSON files
    const audioFiles = files.filter(file => file.endsWith('.wav') || file.endsWith('.mp3'));
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No JSON files found in OutputSOSaudio directory'
      });
    }
    
    // Process each JSON file to get metadata
    const voicemails = jsonFiles.map(jsonFile => {
      const jsonPath = path.join(sosVoicemailsDir, jsonFile);
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      
      // Find corresponding audio file (assuming naming convention matches)
      const audioFileNameWav = jsonFile.replace('.json', '.wav');
      const audioFileNameMp3 = jsonFile.replace('.json', '.mp3');
      
      let audioFile = null;
      if (audioFiles.includes(audioFileNameWav)) {
        audioFile = `/sos-audio/${audioFileNameWav}`;
      } else if (audioFiles.includes(audioFileNameMp3)) {
        audioFile = `/sos-audio/${audioFileNameMp3}`;
      }
      
      return {
        id: path.basename(jsonFile, '.json'),
        audioFile: audioFile,
        metadata: jsonData,
        timestamp: jsonData.timestamp || new Date().getTime(),
        duration: jsonData.duration || "Unknown"
      };
    });
    
    // Sort by timestamp (newest first)
    voicemails.sort((a, b) => b.timestamp - a.timestamp);
    
    res.status(200).json({
      success: true,
      data: voicemails
    });
  } catch (error) {
    console.error('Error fetching SOS voicemails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SOS voicemails',
      error: error.message
    });
  }
});

// Serve audio files from the VCTrack/OutputSOSaudio directory
app.use('/sos-audio', express.static(path.join(__dirname, '../VCTrack/OutputSOSaudio')));

// Serve video files from the EvidenceFeedback/OutputVid directory with proper MIME types and streaming support
app.use('/emergency-videos', (req, res, next) => {
  if (req.path.endsWith('.mp4')) {
    const videoPath = path.join(__dirname, '../EvidenceFeedback/OutputVid', decodeURIComponent(req.path).replace(/^\//, ''));
    
    try {
      if (!fs.existsSync(videoPath)) {
        console.error('Video not found:', videoPath);
        return res.status(404).send('Video not found');
      }

      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      // Log request details for debugging
      console.log('Video request:', {
        path: videoPath,
        size: fileSize,
        range: range
      });

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        
        if (start >= fileSize) {
          res.status(416).send('Requested range not satisfiable');
          return;
        }
        
        const chunksize = Math.min((end - start) + 1, fileSize - start);
        const file = fs.createReadStream(videoPath, {
          start,
          end: start + chunksize - 1,
          highWaterMark: 64 * 1024 // 64KB chunks
        });
        
        const head = {
          'Content-Range': `bytes ${start}-${start + chunksize - 1}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
          'Access-Control-Allow-Origin': '*',
          'Cross-Origin-Resource-Policy': 'cross-origin'
        };
        
        res.writeHead(206, head);
        
        file.on('error', (error) => {
          console.error('Stream error:', error);
          if (!res.headersSent) {
            res.status(500).send('Error streaming video file');
          }
        });
        
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*',
          'Cross-Origin-Resource-Policy': 'cross-origin'
        };
        
        res.writeHead(200, head);
        
        const file = fs.createReadStream(videoPath, {
          highWaterMark: 64 * 1024 // 64KB chunks
        });
        
        file.on('error', (error) => {
          console.error('Stream error:', error);
          if (!res.headersSent) {
            res.status(500).send('Error streaming video file');
          }
        });
        
        file.pipe(res);
      }
    } catch (error) {
      console.error('Error serving video:', error);
      res.status(500).send('Error serving video file');
    }
  } else {
    next();
  }
});

// Route to serve the emergency footage page
app.get('/emergency-footage', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/emergency-footage.html'));
});

// API endpoint to get emergency footage data
app.get('/api/emergency-footage', (req, res) => {
  try {
    const emergencyFootageDir = path.join(__dirname, '../EvidenceFeedback/OutputVid');
    
    if (!fs.existsSync(emergencyFootageDir)) {
      return res.status(404).json({
        success: false,
        message: 'No emergency footage directory found'
      });
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(emergencyFootageDir);
    
    // Filter for video files and JSON files
    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // Log found files for debugging
    console.log('Found video files:', videoFiles);
    console.log('Found JSON files:', jsonFiles);
    
    // Check if video files are valid (at least have some size)
    const validVideoFiles = videoFiles.filter(file => {
      try {
        const stats = fs.statSync(path.join(emergencyFootageDir, file));
        // Log file size for debugging
        console.log(`Video file ${file} size: ${stats.size} bytes`);
        return stats.size > 0; // Accept any size for now
      } catch (err) {
        console.error(`Error checking video file ${file}:`, err);
        return false;
      }
    });
    
    // If no JSON files but we have videos, create entries for the videos
    if (jsonFiles.length === 0 && validVideoFiles.length > 0) {
      const footageItems = validVideoFiles.map(videoFile => {
        // Extract timestamp from filename (assuming format recording_YYYYMMDD_HHMMSS.mp4)
        const timestampMatch = videoFile.match(/recording_(\d{8})_(\d{6})\.mp4/);
        let recordedAt = new Date().toISOString();
        
        if (timestampMatch) {
          const year = timestampMatch[1].substring(0, 4);
          const month = timestampMatch[1].substring(4, 6);
          const day = timestampMatch[1].substring(6, 8);
          const hour = timestampMatch[2].substring(0, 2);
          const minute = timestampMatch[2].substring(2, 4);
          const second = timestampMatch[2].substring(4, 6);
          
          recordedAt = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).toISOString();
        }
        
        return {
          id: path.basename(videoFile, '.mp4'),
          video_file: videoFile,
          recorded_at: recordedAt,
          alert_info: {
            alert: "Emergency Recording",
            date: recordedAt.split('T')[0],
            time: recordedAt.split('T')[1].substring(0, 8)
          }
        };
      });
      
      // Sort by recorded_at (newest first)
      footageItems.sort((a, b) => {
        const dateA = new Date(a.recorded_at);
        const dateB = new Date(b.recorded_at);
        return dateB - dateA;
      });
      
      return res.status(200).json({
        success: true,
        data: footageItems
      });
    }
    
    if (jsonFiles.length === 0 && videoFiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No footage found'
      });
    }
    
    // Process each JSON file to get metadata
    let footageItems = jsonFiles.map(jsonFile => {
      const jsonPath = path.join(emergencyFootageDir, jsonFile);
      let jsonData = {};
      
      try {
        jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      } catch (err) {
        console.error(`Error parsing JSON file ${jsonFile}:`, err);
        // Create basic metadata if JSON is invalid
        jsonData = {
          video_file: jsonFile.replace('.json', '.mp4'),
          recorded_at: new Date().toISOString(),
          alert_info: { alert: "Emergency Recording" }
        };
      }
      
      // Find corresponding video file
      const videoFileName = jsonData.video_file || jsonFile.replace('.json', '.mp4');
      const videoExists = videoFiles.includes(videoFileName);
      
      return {
        id: path.basename(jsonFile, '.json'),
        video_file: videoExists ? videoFileName : null,
        recorded_at: jsonData.recorded_at || new Date().toISOString(),
        alert_info: jsonData.alert_info || {}
      };
    });
    
    // Add any videos that don't have corresponding JSON files
    videoFiles.forEach(videoFile => {
      const jsonFile = videoFile.replace('.mp4', '.json');
      if (!jsonFiles.includes(jsonFile)) {
        // Extract timestamp from filename (assuming format recording_YYYYMMDD_HHMMSS.mp4)
        const timestampMatch = videoFile.match(/recording_(\d{8})_(\d{6})\.mp4/);
        let recordedAt = new Date().toISOString();
        
        if (timestampMatch) {
          const year = timestampMatch[1].substring(0, 4);
          const month = timestampMatch[1].substring(4, 6);
          const day = timestampMatch[1].substring(6, 8);
          const hour = timestampMatch[2].substring(0, 2);
          const minute = timestampMatch[2].substring(2, 4);
          const second = timestampMatch[2].substring(4, 6);
          
          recordedAt = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).toISOString();
        }
        
        footageItems.push({
          id: path.basename(videoFile, '.mp4'),
          video_file: videoFile,
          recorded_at: recordedAt,
          alert_info: {
            alert: "Emergency Recording",
            date: recordedAt.split('T')[0],
            time: recordedAt.split('T')[1].substring(0, 8)
          }
        });
      }
    });
    
    // Sort by recorded_at (newest first)
    footageItems.sort((a, b) => {
      const dateA = new Date(a.recorded_at);
      const dateB = new Date(b.recorded_at);
      return dateB - dateA;
    });
    
    // When returning video files, ensure they exist and are valid
    footageItems = footageItems.filter(item => {
      if (!item.video_file) return false;
      
      try {
        const videoPath = path.join(emergencyFootageDir, item.video_file);
        const stats = fs.statSync(videoPath);
        return stats.size > 1024; // Ensure file is at least 1KB
      } catch (err) {
        console.error(`Error checking video file ${item.video_file}:`, err);
        return false;
      }
    });
    
    res.status(200).json({
      success: true,
      data: footageItems
    });
  } catch (error) {
    console.error('Error fetching emergency footage:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emergency footage',
      error: error.message
    });
  }
});

// Catch-all route for the frontend SPA
app.get('*', (req, res) => {
  // For API routes that weren't matched, return 404 JSON
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ 
      status: 'error', 
      message: 'API endpoint not found' 
    });
  }
  
  // For all other routes, serve the index.html to let the frontend router handle it
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the application at: http://localhost:${PORT}`);
});