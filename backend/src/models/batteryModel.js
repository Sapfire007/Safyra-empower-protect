// Mock database for demonstration purposes
// In a real application, this would connect to a database
const mockBatteryData = {
  'device-001': {
    deviceId: 'device-001',
    batteryLevel: 78,
    lastCharged: '2023-11-15T08:30:00Z',
    estimatedTimeRemaining: '32 hours',
    chargeCycles: 42,
    batteryHealth: 'Good',
    status: 'Discharging',
    temperature: '28°C'
  }
};

// Mock battery history data
const mockBatteryHistory = {
  'device-001': [
    { timestamp: '2023-11-15T00:00:00Z', level: 90 },
    { timestamp: '2023-11-15T06:00:00Z', level: 85 },
    { timestamp: '2023-11-15T12:00:00Z', level: 80 },
    { timestamp: '2023-11-15T18:00:00Z', level: 78 },
    { timestamp: '2023-11-14T00:00:00Z', level: 95 },
    { timestamp: '2023-11-14T06:00:00Z', level: 90 },
    { timestamp: '2023-11-14T12:00:00Z', level: 85 },
    { timestamp: '2023-11-14T18:00:00Z', level: 80 },
    { timestamp: '2023-11-13T00:00:00Z', level: 100 },
    { timestamp: '2023-11-13T06:00:00Z', level: 95 },
    { timestamp: '2023-11-13T12:00:00Z', level: 90 },
    { timestamp: '2023-11-13T18:00:00Z', level: 85 },
  ]
};

const BatteryModel = {
  // Get current battery details for a device
  getBatteryDetails: async (deviceId) => {
    // Simulate database query delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockBatteryData[deviceId] || null;
  },
  
  // Get battery history for a device
  getBatteryHistory: async (deviceId) => {
    // Simulate database query delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockBatteryHistory[deviceId] || [];
  }
};

module.exports = BatteryModel;