const BatteryModel = require('../models/batteryModel');

// Controller for battery-related operations
const batteryController = {
  // Get current battery details for a device
  getBatteryDetails: async (req, res) => {
    try {
      const { deviceId } = req.params;
      
      // In a real application, this would fetch from a database
      // For now, we'll use our mock data service
      const batteryDetails = await BatteryModel.getBatteryDetails(deviceId);
      
      if (!batteryDetails) {
        return res.status(404).json({ 
          success: false, 
          message: 'Battery details not found for this device' 
        });
      }
      
      res.status(200).json({
        success: true,
        data: batteryDetails
      });
    } catch (error) {
      console.error('Error fetching battery details:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch battery details',
        error: error.message 
      });
    }
  },
  
  // Get battery history for a device
  getBatteryHistory: async (req, res) => {
    try {
      const { deviceId } = req.params;
      
      // In a real application, this would fetch from a database
      const batteryHistory = await BatteryModel.getBatteryHistory(deviceId);
      
      res.status(200).json({
        success: true,
        data: batteryHistory
      });
    } catch (error) {
      console.error('Error fetching battery history:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch battery history',
        error: error.message 
      });
    }
  }
};

module.exports = batteryController;