import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import Button from './Button';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  includeMargin?: boolean;
  level?: 'L' | 'M' | 'Q' | 'H';
  title?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  includeMargin = true,
  level = 'M',
  title = 'QR Code',
}) => {
  // Create a download link for the QR code
  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // If no value is provided, show a placeholder message
  if (!value) {
    return (
      <div className="bg-gray-100 rounded flex items-center justify-center" style={{ width: size, height: size }}>
        <p className="text-sm text-text-secondary text-center p-4">QR Code will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-medium mb-3 text-text-secondary">{title}</h3>
      <div className="bg-white p-4 rounded shadow-sm mb-3">
        <QRCodeSVG
          value={value}
          size={size}
          level={level}
          includeMargin={includeMargin}
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={downloadQRCode}
        icon={<Download size={16} />}
      >
        Download QR Code
      </Button>
    </div>
  );
};

export default QRCodeDisplay;