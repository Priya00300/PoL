import React, { useState } from 'react';
import { Map, Search, QrCode, Download, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Timeline, { TimelineItem } from '../components/Timeline';
import SimpleMap from '../components/SimpleMap';
import Alert from '../components/Alert';

const TrackLogisticsPage: React.FC = () => {
  const [packageId, setPackageId] = useState('');
  const [trackingData, setTrackingData] = useState<null | {
    timelineItems: TimelineItem[];
    locations: Array<{
      id: string;
      label: string;
      longitude: number;
      latitude: number;
    }>;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!packageId) return;
    
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      // Mock tracking data
      const mockTimelineItems: TimelineItem[] = [
        {
          id: '1',
          title: 'Origin Checkpoint',
          description: 'Package created and registered on blockchain',
          timestamp: '2023-04-10 08:32 AM',
          location: 'San Francisco, CA',
          status: 'completed',
          verified: true,
        },
        {
          id: '2',
          title: 'Distribution Center',
          description: 'Quality check passed, package in transit',
          timestamp: '2023-04-11 02:15 PM',
          location: 'Sacramento, CA',
          status: 'completed',
          verified: true,
        },
        {
          id: '3',
          title: 'Regional Hub',
          description: 'Temperature and integrity verification completed',
          timestamp: '2023-04-12 09:45 AM',
          location: 'Salt Lake City, UT',
          status: 'completed',
          verified: true,
        },
        {
          id: '4',
          title: 'Local Distribution',
          description: 'Final quality check before delivery',
          timestamp: '2023-04-14 11:20 AM',
          location: 'Denver, CO',
          status: 'completed',
          verified: false,
        },
        {
          id: '5',
          title: 'Delivery',
          description: 'Package delivered to recipient',
          timestamp: '2023-04-15 03:50 PM',
          location: 'Denver, CO',
          status: 'pending',
          verified: false,
        },
      ];
      
      const mockLocations = [
        {
          id: '1',
          label: 'San Francisco, CA',
          latitude: 37.7749,
          longitude: -122.4194,
        },
        {
          id: '2',
          label: 'Sacramento, CA',
          latitude: 38.5816,
          longitude: -121.4944,
        },
        {
          id: '3',
          label: 'Salt Lake City, UT',
          latitude: 40.7608,
          longitude: -111.8910,
        },
        {
          id: '4',
          label: 'Denver, CO',
          latitude: 39.7392,
          longitude: -104.9903,
        },
      ];
      
      setTrackingData({
        timelineItems: mockTimelineItems,
        locations: mockLocations,
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handleScanQR = () => {
    // Mock scanning QR code
    setPackageId('PKG-2023-05-1542');
  };

  const mockDemoData = () => {
    setPackageId('PKG-2023-05-1542');
    handleSearch(new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <div>
      <PageHeader
        title="Track Logistics"
        description="Monitor package movement through the supply chain with proof of location."
        icon={<Map size={28} />}
      />
      
      <Card className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <InputField
              label="Package ID"
              name="packageId"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              placeholder="Enter package ID or reference number"
              required
            />
          </div>
          
          <div className="flex items-end space-x-3">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !packageId}
              icon={<Search size={18} />}
              className="mb-4"
            >
              {isLoading ? 'Searching...' : 'Track Package'}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={handleScanQR}
              icon={<QrCode size={18} />}
              className="mb-4"
            >
              Scan QR
            </Button>
          </div>
        </form>
        
        {!trackingData && !isLoading && (
          <div className="mt-2 text-center border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              icon={<Clock size={16} />}
              onClick={mockDemoData}
            >
              Load Demo Data
            </Button>
          </div>
        )}
      </Card>
      
      {trackingData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Package Journey Timeline</h2>
                <span className="text-sm bg-primary text-white px-2 py-1 rounded">
                  PKG-2023-05-1542
                </span>
              </div>
              
              <Timeline items={trackingData.timelineItems} />
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Download size={16} />}
                >
                  Download Full Log
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Download size={16} />}
                >
                  Export CSV
                </Button>
              </div>
            </Card>
            
            <Card>
              <h2 className="text-lg font-semibold mb-4">Location Map</h2>
              <SimpleMap
                locations={trackingData.locations}
                initialViewState={{
                  latitude: 39.5,
                  longitude: -111,
                  zoom: 4,
                }}
                height="400px"
              />
              
              <div className="mt-4 p-3 bg-accent rounded">
                <h3 className="text-sm font-medium text-primary mb-1">Route Information</h3>
                <p className="text-sm text-text-secondary">
                  Total distance: 1,241 miles | Estimated CO₂ emission: 526 kg | 
                  Average verification time: 45 seconds
                </p>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Quality Check Summary</h2>
              
              {trackingData.timelineItems.some(item => !item.verified) ? (
                <Alert
                  type="warning"
                  title="Verification Issue Detected"
                  message="One or more checkpoints have failed verification. This could indicate a quality control issue."
                  className="mb-4"
                />
              ) : (
                <Alert
                  type="success"
                  title="All Verifications Passed"
                  message="All quality checks and verifications have been successfully completed."
                  className="mb-4"
                />
              )}
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium text-sm">Temperature</h3>
                    <p className="text-xs text-text-secondary">Maintained within range</p>
                  </div>
                  <span className="text-success font-medium text-sm">Passed</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium text-sm">Packaging Integrity</h3>
                    <p className="text-xs text-text-secondary">No damage detected</p>
                  </div>
                  <span className="text-success font-medium text-sm">Passed</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium text-sm">Proof of Location</h3>
                    <p className="text-xs text-text-secondary">ZK proofs validated</p>
                  </div>
                  <span className="text-error font-medium text-sm">1 Failed</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium text-sm">Digital Signatures</h3>
                    <p className="text-xs text-text-secondary">Cryptographic verification</p>
                  </div>
                  <span className="text-success font-medium text-sm">Passed</span>
                </div>
              </div>
            </Card>
            
            <Card>
              <h2 className="text-lg font-semibold mb-4">Blockchain Transactions</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-1 font-medium text-text-secondary">Checkpoint</th>
                      <th className="text-left py-2 px-1 font-medium text-text-secondary">TX Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-1">Origin</td>
                      <td className="py-2 px-1 font-mono text-xs">0x72f3...d0b6</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-1">Distribution</td>
                      <td className="py-2 px-1 font-mono text-xs">0x81a9...f5e2</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-1">Regional Hub</td>
                      <td className="py-2 px-1 font-mono text-xs">0x93c7...1e4d</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-1">Local Dist.</td>
                      <td className="py-2 px-1 font-mono text-xs">0xa5d2...8c9f</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="mt-4"
              >
                View All Blockchain Records
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackLogisticsPage;