import React, { useState } from 'react';
import { Package, MapPin, Download, Lock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';
import FileUpload from '../components/FileUpload';
import QRCodeDisplay from '../components/QRCodeDisplay';
import DataDisplay from '../components/DataDisplay';
import SimpleMap from '../components/SimpleMap';
import Alert from '../components/Alert';

const CreatePackagePage: React.FC = () => {
  const [packageData, setPackageData] = useState({
    packageId: '',
    description: '',
    originLocation: '',
    senderPrivateKey: '',
    recipientPublicKey: '',
  });
  
  const [supportingDoc, setSupportingDoc] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<typeof packageData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [qrData, setQrData] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');
  const [encryptedMetadata, setEncryptedMetadata] = useState('');
  
  // Mock location data for demo
  const [currentLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPackageData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Partial<typeof packageData> = {};
    if (!packageData.packageId) errors.packageId = 'Package ID is required';
    if (!packageData.description) errors.description = 'Description is required';
    if (!packageData.originLocation) errors.originLocation = 'Origin Location is required';
    if (!packageData.senderPrivateKey) errors.senderPrivateKey = 'Sender Private Key is required';
    if (!packageData.recipientPublicKey) errors.recipientPublicKey = 'Recipient Public Key is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAutoDetectLocation = () => {
    // In a real application, this would use the Geolocation API
    setPackageData(prev => ({
      ...prev,
      originLocation: `San Francisco, CA (${currentLocation.latitude}, ${currentLocation.longitude})`
    }));
  };

  const handleGenerateQRCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate blockchain processing
    setTimeout(() => {
      // Create QR code data
      const metadata = {
        packageId: packageData.packageId,
        description: packageData.description,
        originLocation: packageData.originLocation,
        timestamp: new Date().toISOString(),
        documentHash: supportingDoc ? 'SHA256:' + Math.random().toString(36).substring(2, 15) : null,
      };
      
      // Generate mock digital signature and encrypted data
      const mockSignature = 'SIG_' + Array.from(Array(40), () => Math.floor(Math.random() * 36).toString(36)).join('');
      const mockEncrypted = 'ENC_' + btoa(JSON.stringify(metadata));
      
      setQrData(JSON.stringify({
        ...metadata,
        signature: mockSignature.substring(0, 20) + '...',
      }));
      
      setDigitalSignature(mockSignature);
      setEncryptedMetadata(mockEncrypted);
      setIsGenerated(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      <PageHeader
        title="Create Package"
        description="Generate secure package identity with encrypted QR codes and digital signatures."
        icon={<Package size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleGenerateQRCode}>
              <h2 className="text-lg font-semibold mb-4">Package Information</h2>
              
              <InputField
                label="Package ID"
                name="packageId"
                value={packageData.packageId}
                onChange={handleInputChange}
                placeholder="Enter a unique package identifier"
                required
                error={formErrors.packageId}
              />
              
              <InputField
                label="Product Description"
                name="description"
                as="textarea"
                value={packageData.description}
                onChange={handleInputChange}
                placeholder="Describe the contents of the package"
                required
                error={formErrors.description}
              />
              
              <div className="flex items-end mb-4 gap-2">
                <div className="flex-grow">
                  <InputField
                    label="Origin Location"
                    name="originLocation"
                    value={packageData.originLocation}
                    onChange={handleInputChange}
                    placeholder="Location where package originates"
                    required
                    error={formErrors.originLocation}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleAutoDetectLocation}
                  icon={<MapPin size={16} />}
                  className="mb-4"
                >
                  Auto-detect
                </Button>
              </div>
              
              <FileUpload
                label="Supporting Documents (Optional)"
                accept=".pdf,.jpg,.png,.doc,.docx"
                onChange={setSupportingDoc}
              />
              
              <h2 className="text-lg font-semibold mt-6 mb-4">Cryptographic Keys</h2>
              
              <InputField
                label="Sender Private Key"
                name="senderPrivateKey"
                as="textarea"
                value={packageData.senderPrivateKey}
                onChange={handleInputChange}
                placeholder="Enter your private key to sign package"
                required
                error={formErrors.senderPrivateKey}
              />
              
              <InputField
                label="Recipient Public Key"
                name="recipientPublicKey"
                as="textarea"
                value={packageData.recipientPublicKey}
                onChange={handleInputChange}
                placeholder="Enter recipient's public key for encryption"
                required
                error={formErrors.recipientPublicKey}
              />
              
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                  icon={<Lock size={18} />}
                >
                  {isSubmitting ? 'Generating...' : 'Generate QR Code & Sign Package'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-4">QR Code</h2>
            {isGenerated ? (
              <div className="flex flex-col items-center">
                <QRCodeDisplay
                  value={qrData}
                  size={200}
                  title="Package QR Code"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded flex items-center justify-center w-48 h-48 mb-3">
                  <p className="text-sm text-text-secondary text-center p-4">
                    QR Code will appear here after generation
                  </p>
                </div>
                <span className="text-sm text-text-secondary">Fill the form to generate</span>
              </div>
            )}
          </Card>
          
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Origin Location</h2>
            <SimpleMap
              locations={[
                {
                  id: 'origin',
                  label: 'Package Origin',
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                },
              ]}
              initialViewState={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                zoom: 10,
              }}
              height="200px"
            />
          </Card>
          
          {isGenerated && (
            <Card>
              <h2 className="text-lg font-semibold mb-4">Package Metadata</h2>
              
              <Alert
                type="success"
                title="Package Created Successfully"
                message="The package has been signed and registered on the blockchain."
              />
              
              <DataDisplay
                label="Digital Signature"
                value={digitalSignature}
                monospace
              />
              
              <DataDisplay
                label="Encrypted Metadata"
                value={encryptedMetadata}
                monospace
              />
              
              <Button
                variant="outline"
                fullWidth
                className="mt-2"
                icon={<Download size={16} />}
              >
                Download Package Manifest
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePackagePage;