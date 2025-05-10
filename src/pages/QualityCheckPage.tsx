import React, { useState } from 'react';
import { ClipboardCheck, QrCode, Camera, Upload, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import FileUpload from '../components/FileUpload';
import Alert from '../components/Alert';

const QualityCheckPage: React.FC = () => {
  const [formData, setFormData] = useState({
    packageId: '',
    inspectorName: '',
    temperature: '',
    notes: '',
  });
  
  const [checklistData, setChecklistData] = useState({
    packagingIntact: false,
    visualDefects: false,
  });
  
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof typeof checklistData, checked: boolean) => {
    setChecklistData(prev => ({ ...prev, [name]: checked }));
  };

  const handleScanQR = () => {
    // Mock scanning QR code
    setFormData(prev => ({
      ...prev,
      packageId: 'PKG-2023-05-1542',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.packageId || !formData.inspectorName) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      const mockTxHash = '0x' + Array.from(Array(64), () => Math.floor(Math.random() * 16).toString(16)).join('');
      setTxHash(mockTxHash);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      packageId: '',
      inspectorName: '',
      temperature: '',
      notes: '',
    });
    setChecklistData({
      packagingIntact: false,
      visualDefects: false,
    });
    setPhoto(null);
    setIsSubmitted(false);
    setTxHash('');
  };

  const currentTimestamp = new Date().toLocaleString();

  return (
    <div>
      <PageHeader
        title="Quality Check Entry"
        description="Record quality inspection data and upload to the blockchain."
        icon={<ClipboardCheck size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-success bg-opacity-10 rounded-full p-4 inline-flex mb-4">
                  <CheckCircle size={48} className="text-success" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Quality Check Submitted Successfully</h2>
                <p className="text-text-secondary mb-6">
                  The quality check data has been recorded and submitted to the blockchain for verification.
                </p>
                
                <div className="max-w-md mx-auto bg-gray-50 p-4 rounded mb-6">
                  <h3 className="font-medium mb-2 text-text-primary">Transaction Details</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Package ID:</span>
                      <span className="font-medium">{formData.packageId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Inspector:</span>
                      <span className="font-medium">{formData.inspectorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Timestamp:</span>
                      <span className="font-medium">{currentTimestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Transaction Hash:</span>
                      <span className="font-mono text-xs">{txHash.substring(0, 18)}...</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={resetForm}>
                  Start New Quality Check
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">Quality Check Form</h2>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-grow">
                    <InputField
                      label="Package ID"
                      name="packageId"
                      value={formData.packageId}
                      onChange={handleInputChange}
                      placeholder="Enter package ID or scan QR code"
                      required
                    />
                  </div>
                  <div className="flex items-end">
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
                </div>
                
                <InputField
                  label="Inspector Name"
                  name="inspectorName"
                  value={formData.inspectorName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-sm font-medium text-text-secondary">Timestamp:</div>
                  <div className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {currentTimestamp} (Auto-filled)
                  </div>
                </div>
                
                <div className="border-t border-b py-4 my-4">
                  <h3 className="font-medium mb-3">Quality Check Criteria</h3>
                  
                  <InputField
                    label="Temperature (°C)"
                    name="temperature"
                    type="number"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="Enter measured temperature"
                  />
                  
                  <Checkbox
                    label="Packaging Intact?"
                    checked={checklistData.packagingIntact}
                    onChange={(checked) => handleCheckboxChange('packagingIntact', checked)}
                  />
                  
                  <Checkbox
                    label="Visual Defects Present?"
                    checked={checklistData.visualDefects}
                    onChange={(checked) => handleCheckboxChange('visualDefects', checked)}
                  />
                  
                  <InputField
                    label="Notes"
                    name="notes"
                    as="textarea"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional observations or notes"
                  />
                </div>
                
                <FileUpload
                  label="Upload Photo or Documentation"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={setPhoto}
                />
                
                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting || !formData.packageId || !formData.inspectorName}
                  >
                    {isSubmitting ? 'Submitting to Blockchain...' : 'Submit Quality Check'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Quality Check Guide</h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Scan Package</h3>
                  <p className="text-sm text-text-secondary">
                    Scan the QR code on the package to identify it in the system.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Inspect Physical Condition</h3>
                  <p className="text-sm text-text-secondary">
                    Check package integrity, temperature, and visual appearance.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Document with Photos</h3>
                  <p className="text-sm text-text-secondary">
                    Take clear photos of any defects or the intact condition of the package.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Submit to Blockchain</h3>
                  <p className="text-sm text-text-secondary">
                    Record your findings permanently on the blockchain for verification.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-lg font-semibold mb-4">Temperature Guidelines</h2>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <h3 className="font-medium text-sm text-green-800">Acceptable: 2°C to 8°C</h3>
                <p className="text-xs text-green-700">
                  Ideal temperature range for most standard packages.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <h3 className="font-medium text-sm text-yellow-800">Warning: 0°C to 2°C or 8°C to 10°C</h3>
                <p className="text-xs text-yellow-700">
                  Borderline acceptable, requires additional verification.
                </p>
              </div>
              
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <h3 className="font-medium text-sm text-red-800">Critical: Below 0°C or Above 10°C</h3>
                <p className="text-xs text-red-700">
                  Package integrity may be compromised, flag for detailed inspection.
                </p>
              </div>
              
              <Alert
                type="info"
                message="Temperature thresholds vary by package type. Refer to specific product guidelines when available."
                className="mt-2"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QualityCheckPage;