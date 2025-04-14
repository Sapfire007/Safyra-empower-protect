import express from 'express';
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

export default router;