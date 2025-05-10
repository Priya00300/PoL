import React from 'react';
import { Package, QrCode, Map, Key } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import FeatureCard from '../components/FeatureCard';
import { Database } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      title: 'Create Package',
      description: 'Create new packages with cryptographic signatures and metadata for secure tracking',
      icon: <Package size={24} />,
      to: '/create',
    },
    {
      title: 'Scan & Verify',
      description: 'Scan QR codes to verify package authenticity and validate Zero-Knowledge Proofs',
      icon: <QrCode size={24} />,
      to: '/scan',
    },
    {
      title: 'Track Logistics',
      description: 'Monitor package movement through the supply chain with proof of location',
      icon: <Map size={24} />,
      to: '/track',
    },
    {
      title: 'Manage Keys',
      description: 'Generate and manage cryptographic keys for secure package signing and verification',
      icon: <Key size={24} />,
      to: '/keys',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Blockchain Logistics Security Platform"
        icon={<Database size={28} />}
      />
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Secure Supply Chain Authentication</h2>
        <p className="text-text-secondary mb-6">
          Our platform utilizes blockchain technology and Zero-Knowledge Proofs to ensure end-to-end 
          transparency and authenticity in logistics operations. Track packages through their entire 
          journey with cryptographic certainty, detect tampering, and verify quality control at each 
          checkpoint with immutable records.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-accent p-4 rounded">
            <h3 className="text-sm font-semibold text-primary mb-2">Zero-Knowledge Proofs</h3>
            <p className="text-sm text-text-secondary">
              Verify location data without revealing exact coordinates, providing privacy while ensuring 
              compliance with logistics routes.
            </p>
          </div>
          
          <div className="bg-accent p-4 rounded">
            <h3 className="text-sm font-semibold text-primary mb-2">Immutable Records</h3>
            <p className="text-sm text-text-secondary">
              All logistics data is cryptographically secured and stored on the blockchain, 
              creating tamper-proof records of package movement.
            </p>
          </div>
        </div>
      </Card>
      
      <h2 className="text-xl font-semibold mb-4">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            to={feature.to}
          />
        ))}
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <h3 className="font-medium">Create Package Identity</h3>
              <p className="text-sm text-text-secondary">
                Generate a unique digital identity for your package with secure cryptographic signatures.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <h3 className="font-medium">Track with Zero-Knowledge Proofs</h3>
              <p className="text-sm text-text-secondary">
                Verify package locations without compromising sensitive route details.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <h3 className="font-medium">Perform Quality Checks</h3>
              <p className="text-sm text-text-secondary">
                Record quality inspections at logistics checkpoints with blockchain verification.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              4
            </div>
            <div>
              <h3 className="font-medium">Verify Authenticity</h3>
              <p className="text-sm text-text-secondary">
                Scan package QR codes to confirm authenticity and view the complete logistics history.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;