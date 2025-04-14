
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryMedium, Bell, Settings, Shield, AlertTriangle, Mic, Video } from 'lucide-react';

const Dashboard = () => {
  // Function to open battery details in a completely new window
  const openBatteryDetails = () => {
    // Use the backend server URL directly
    window.open('http://localhost:5000/battery-details', '_blank');
  };

  // Function to open SOS reports in a new window
  const openSOSReports = () => {
    window.open('http://localhost:5000/sos-reports', '_blank');
  };

  // Function to open SOS voicemails in a new window
  const openSOSVoicemails = () => {
    window.open('http://localhost:5000/sos-voicemails', '_blank');
  };

  // Function to open Emergency Footage in a new window
  const openEmergencyFootage = () => {
    window.open('http://localhost:5000/emergency-footage', '_blank');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-safyra-navy mb-4">
            Device Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to your Safyra device management dashboard. Here you will be able to monitor and control your smart jewelry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-safyra-gold/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <BatteryMedium className="text-safyra-gold h-8 w-8" />
              <CardTitle>Battery Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600">Monitor your device's battery life and receive low battery alerts.</p>
                <button 
                  className="px-4 py-2 bg-safyra-gold text-white rounded-md hover:bg-safyra-navy hover:text-safyra-gold transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  onClick={openBatteryDetails}
                >
                  <BatteryMedium className="h-4 w-4" />
                  <span>View Battery Details</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-safyra-gold/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <AlertTriangle className="text-safyra-gold h-8 w-8" />
              <CardTitle>SOS Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600">View and manage emergency SOS alerts and incident reports from your device.</p>
                <button 
                  className="px-4 py-2 bg-safyra-gold text-white rounded-md hover:bg-safyra-navy hover:text-safyra-gold transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  onClick={openSOSReports}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>View SOS Reports</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-safyra-gold/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <Mic className="text-safyra-gold h-8 w-8" />
              <CardTitle>SOS Voicemails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600">Access recorded voice messages sent during emergency situations.</p>
                <button 
                  className="px-4 py-2 bg-safyra-gold text-white rounded-md hover:bg-safyra-navy hover:text-safyra-gold transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  onClick={openSOSVoicemails}
                >
                  <Mic className="h-4 w-4" />
                  <span>Listen to Voicemails</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-safyra-gold/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <Video className="text-safyra-gold h-8 w-8" />
              <CardTitle>Emergency Footage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600">View video recordings captured during emergency situations for evidence and review.</p>
                <button 
                  className="px-4 py-2 bg-safyra-gold text-white rounded-md hover:bg-safyra-navy hover:text-safyra-gold transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  onClick={openEmergencyFootage}
                >
                  <Video className="h-4 w-4" />
                  <span>View Emergency Footage</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Rest of the cards remain unchanged */}
        </div>

        {/* Rest of the component remains unchanged */}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
