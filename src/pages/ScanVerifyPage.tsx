import React, { useState } from 'react';
import { QrCode, Camera, Upload, Search, CheckCircle, XCircle } from 'lucide-react';
import Webcam from 'react-webcam';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import DataDisplay from '../components/DataDisplay';
import SimpleMap from '../components/SimpleMap';
import Alert from '../components/Alert';
import FileUpload from '../components/FileUpload';

const ScanVerifyPage: React.FC = () => {
  const [scanActive, setScanActive] = useState(false);
  const [scannedData, setScannedData] = useState<null | {
    packageId: string;
    description: string;
    originLocation: string;
    timestamp: string;
    sender: string;
  }>(null);
  
  const [verificationStatus, setVerificationStatus] = useState<{
    signature?: 'valid' | 'invalid';
    zkProof?: 'valid' | 'invalid';
  }>({});
  
  // Mock location data
  const [mockLocations] = useState([
    {
      id: 'package',
      label: 'Package Location',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: 'blockchain',
      label: 'Blockchain Location',
      latitude: 37.7730,
      longitude: -122.4190,
    }
  ]);

  const handleScanQR = () => {
    // Toggle camera
    setScanActive(!scanActive);
  };

  const handleMockScan = () => {
    // Simulate a QR code scan
    setScanActive(false);
    
    // Mock scanned data
    const mockData = {
      packageId: 'PKG-2023-05-1542',
      description: 'High-value electronics shipment',
      originLocation: 'San Francisco, CA (37.7749, -122.4194)',
      timestamp: new Date().toISOString(),
      sender: '0x8F3Ba...A290',
    };
    
    setScannedData(mockData);
    setVerificationStatus({});
  };

  const handleVerifySignature = () => {
    // Simulate verification process
    setTimeout(() => {
      // Randomly determine validity for demo purposes
      const isValid = Math.random() > 0.3;
      setVerificationStatus(prev => ({
        ...prev,
        signature: isValid ? 'valid' : 'invalid',
      }));
    }, 1500);
  };

  const handleVerifyZKProof = () => {
    // Simulate verification process
    setTimeout(() => {
      // Randomly determine validity for demo purposes
      const isValid = Math.random() > 0.2;
      setVerificationStatus(prev => ({
        ...prev,
        zkProof: isValid ? 'valid' : 'invalid',
      }));
    }, 2000);
  };

  const getVerificationUI = (type: 'signature' | 'zkProof') => {
    const status = verificationStatus[type];
    
    if (!status) {
      return (
        <div className="text-text-secondary text-sm">
          Not verified yet
        </div>
      );
    }
    
    return (
      <div className={`flex items-center ${status === 'valid' ? 'text-success' : 'text-error'}`}>
        {status === 'valid' ? (
          <CheckCircle size={18} className="mr-2" />
        ) : (
          <XCircle size={18} className="mr-2" />
        )}
        <span className="font-medium capitalize">{status}</span>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Scan & Verify Package"
        description="Scan QR codes to verify package authenticity and validate Zero-Knowledge Proofs."
        icon={<QrCode size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-4">QR Code Scanner</h2>
            
            {scanActive ? (
              <div className="rounded overflow-hidden bg-gray-100 relative">
                <Webcam
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full border rounded"
                  videoConstraints={{
                    width: 720,
                    height: 480,
                    facingMode: 'environment',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-primary w-64 h-64 rounded-lg opacity-50"></div>
                </div>
                <div className="p-2 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScanActive(false)}
                    className="z-10"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleMockScan}
                    className="z-10"
                  >
                    Capture
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center bg-gray-100 rounded h-48 mb-4">
                  <div className="text-center p-6">
                    <QrCode size={48} className="mx-auto mb-2 text-text-secondary" />
                    <p className="text-text-secondary">
                      Click "Scan QR Code" to activate the camera or upload an image containing a QR code
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Button
                    variant="primary"
                    icon={<Camera size={18} />}
                    onClick={handleScanQR}
                    className="flex-1"
                  >
                    Scan QR Code
                  </Button>
                  
                  <Button
                    variant="secondary"
                    icon={<Upload size={18} />}
                    className="flex-1"
                  >
                    Upload Image
                  </Button>
                </div>
                
                <div className="text-center border-t pt-4 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Search size={16} />}
                    onClick={handleMockScan}
                  >
                    Use Demo Package Data
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          {scannedData && (
            <Card>
              <h2 className="text-lg font-semibold mb-4">Package Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataDisplay
                  label="Package ID"
                  value={scannedData.packageId}
                />
                
                <DataDisplay
                  label="Timestamp"
                  value={new Date(scannedData.timestamp).toLocaleString()}
                />
                
                <DataDisplay
                  label="Sender"
                  value={scannedData.sender}
                />
                
                <DataDisplay
                  label="Origin"
                  value={scannedData.originLocation}
                />
              </div>
              
              <DataDisplay
                label="Description"
                value={scannedData.description}
                className="mt-2"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Digital Signature</h3>
                    {getVerificationUI('signature')}
                  </div>
                  <Button
                    variant={verificationStatus.signature ? 'outline' : 'primary'}
                    size="sm"
                    fullWidth
                    onClick={handleVerifySignature}
                    disabled={!!verificationStatus.signature}
                  >
                    {verificationStatus.signature ? 'Verified' : 'Verify Signature'}
                  </Button>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Zero-Knowledge Proof</h3>
                    {getVerificationUI('zkProof')}
                  </div>
                  <Button
                    variant={verificationStatus.zkProof ? 'outline' : 'primary'}
                    size="sm"
                    fullWidth
                    onClick={handleVerifyZKProof}
                    disabled={!!verificationStatus.zkProof}
                  >
                    {verificationStatus.zkProof ? 'Verified' : 'Verify ZK Proof'}
                  </Button>
                </div>
              </div>
              
              {(verificationStatus.signature === 'invalid' || verificationStatus.zkProof === 'invalid') && (
                <Alert
                  type="error"
                  title="Verification Failed"
                  message="One or more verifications failed. This package may have been tampered with or is counterfeit."
                  className="mt-4"
                />
              )}
              
              {verificationStatus.signature === 'valid' && verificationStatus.zkProof === 'valid' && (
                <Alert
                  type="success"
                  title="Verification Successful"
                  message="All verification checks passed. This package is authentic and its blockchain records are valid."
                  className="mt-4"
                />
              )}
            </Card>
          )}
        </div>
        
        <div>
          {scannedData && (
            <>
              <Card className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Location Verification</h2>
                <SimpleMap
                  locations={mockLocations}
                  initialViewState={{
                    latitude: mockLocations[0].latitude,
                    longitude: mockLocations[0].longitude,
                    zoom: 14,
                  }}
                  height="250px"
                />
                
                <div className="mt-4 p-3 bg-accent rounded">
                  <h3 className="text-sm font-medium text-primary mb-1">Location Analysis</h3>
                  <p className="text-sm text-text-secondary">
                    Current scan location is within 20 meters of the blockchain recorded location.
                    This is within acceptable parameters.
                  </p>
                </div>
              </Card>
              
              <Card>
                <h2 className="text-lg font-semibold mb-4">Blockchain Record</h2>
                <div className="text-sm space-y-3">
                  <div>
                    <span className="font-medium text-text-primary">Transaction Hash: </span>
                    <span className="font-mono text-text-secondary break-words">0x72f359c5a59185a4f5d27af9c6fbd0b663d0b67ca5a5fd</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-text-primary">Block Number: </span>
                    <span className="text-text-secondary">14,258,690</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-text-primary">Timestamp: </span>
                    <span className="text-text-secondary">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-text-primary">Contract: </span>
                    <span className="font-mono text-text-secondary break-words">0x9e5A7561d0250e68c30</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="mt-4"
                >
                  View on Blockchain Explorer
                </Button>
              </Card>
            </>
          )}
          
          {!scannedData && (
            <Card>
              <h2 className="text-lg font-semibold mb-4">Instructions</h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Scan Package QR Code</h3>
                    <p className="text-sm text-text-secondary">
                      Use the scanner to scan the QR code on the package.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Verify Digital Signature</h3>
                    <p className="text-sm text-text-secondary">
                      Confirm the signature to ensure package authenticity.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Validate ZK Proof</h3>
                    <p className="text-sm text-text-secondary">
                      Check the Zero-Knowledge Proof for location verification.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Review Blockchain Record</h3>
                    <p className="text-sm text-text-secondary">
                      Examine the immutable blockchain record of the package journey.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanVerifyPage;