import React, { useState } from 'react';
import { Key, FileText, Download, Trash2, Copy, Plus, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import InputField from '../components/InputField';
import FileUpload from '../components/FileUpload';
import Alert from '../components/Alert';
import DataDisplay from '../components/DataDisplay';

interface KeyPair {
  id: string;
  type: 'Private' | 'Public';
  name: string;
  key: string;
  lastUsed: string;
}

const ManageKeysPage: React.FC = () => {
  const [keyName, setKeyName] = useState('');
  const [generatedKeys, setGeneratedKeys] = useState<{
    publicKey: string;
    privateKey: string;
  } | null>(null);
  
  const [importedKeyText, setImportedKeyText] = useState('');
  const [importedKeyFile, setImportedKeyFile] = useState<File | null>(null);
  const [importedKeyType, setImportedKeyType] = useState<'Public' | 'Private'>('Public');
  
  const [savedKeys, setSavedKeys] = useState<KeyPair[]>([
    {
      id: '1',
      type: 'Public',
      name: 'My Public Key',
      key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8HMB2',
      lastUsed: '2023-04-05 14:32',
    },
    {
      id: '2',
      type: 'Private',
      name: 'Personal Signing Key',
      key: 'LWEFkwjefLKJEFoiwej320fjwkeFJI3fjj2903f2p',
      lastUsed: '2023-04-10 09:15',
    },
    {
      id: '3',
      type: 'Public',
      name: 'Vendor Key',
      key: 'KLJFi3j20fjFjw93jfFJIEFj28jFLSKjef0239fj2',
      lastUsed: '2023-04-08 16:45',
    },
  ]);
  
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const generateKeyPair = () => {
    if (!keyName) {
      setNotification({
        type: 'error',
        message: 'Please enter a name for your key pair',
      });
      return;
    }
    
    // Simulate key generation
    setTimeout(() => {
      const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC' + 
        Array.from(Array(40), () => Math.floor(Math.random() * 36).toString(36)).join('');
      
      const privateKey = 'MIICXAIBAAKBgQC' + 
        Array.from(Array(60), () => Math.floor(Math.random() * 36).toString(36)).join('');
      
      setGeneratedKeys({
        publicKey,
        privateKey,
      });
      
      setNotification({
        type: 'success',
        message: 'Key pair generated successfully',
      });
    }, 1000);
  };

  const saveGeneratedKeys = () => {
    if (!generatedKeys) return;
    
    const newKeys: KeyPair[] = [
      {
        id: Date.now().toString(),
        type: 'Public',
        name: `${keyName} (Public)`,
        key: generatedKeys.publicKey,
        lastUsed: 'Never',
      },
      {
        id: (Date.now() + 1).toString(),
        type: 'Private',
        name: `${keyName} (Private)`,
        key: generatedKeys.privateKey,
        lastUsed: 'Never',
      },
    ];
    
    setSavedKeys([...newKeys, ...savedKeys]);
    setGeneratedKeys(null);
    setKeyName('');
    
    setNotification({
      type: 'success',
      message: 'Keys saved to your keyring',
    });
  };

  const importKey = () => {
    if (!importedKeyText && !importedKeyFile) {
      setNotification({
        type: 'error',
        message: 'Please enter or upload a key to import',
      });
      return;
    }
    
    // In real app, we would validate the key format here
    
    const newKey: KeyPair = {
      id: Date.now().toString(),
      type: importedKeyType,
      name: importedKeyFile ? importedKeyFile.name.replace('.pem', '') : `Imported ${importedKeyType} Key`,
      key: importedKeyText || (importedKeyFile ? 'Key from file: ' + importedKeyFile.name : ''),
      lastUsed: 'Never',
    };
    
    setSavedKeys([newKey, ...savedKeys]);
    setImportedKeyText('');
    setImportedKeyFile(null);
    
    setNotification({
      type: 'success',
      message: 'Key imported successfully',
    });
  };

  const deleteKey = (id: string) => {
    setSavedKeys(savedKeys.filter(key => key.id !== id));
    setNotification({
      type: 'info',
      message: 'Key deleted from your keyring',
    });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setNotification({
      type: 'success',
      message: 'Key copied to clipboard',
    });
  };

  return (
    <div>
      <PageHeader
        title="Manage Cryptographic Keys"
        description="Generate, import, and manage cryptographic keys for secure package signing and verification."
        icon={<Key size={28} />}
      />
      
      {notification && (
        <Alert
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
          className="mb-6"
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Generate New Key Pair</h2>
            
            <InputField
              label="Key Name"
              name="keyName"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Enter a name for this key pair"
              required
            />
            
            <Button
              variant="primary"
              onClick={generateKeyPair}
              disabled={!keyName}
              icon={<Key size={18} />}
              className="mt-2"
            >
              Generate Key Pair
            </Button>
            
            {generatedKeys && (
              <div className="mt-6 space-y-4">
                <DataDisplay
                  label="Public Key"
                  value={generatedKeys.publicKey}
                  monospace
                />
                
                <DataDisplay
                  label="Private Key"
                  value={generatedKeys.privateKey}
                  monospace
                />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    icon={<Download size={18} />}
                    className="flex-1"
                  >
                    Download Public Key
                  </Button>
                  
                  <Button
                    variant="outline"
                    icon={<Download size={18} />}
                    className="flex-1"
                  >
                    Download Private Key
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={saveGeneratedKeys}
                    icon={<Plus size={18} />}
                  >
                    Save Keys to Keyring
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          <Card>
            <h2 className="text-lg font-semibold mb-4">Import Existing Key</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <label className="flex-1">
                <span className="text-sm font-medium text-text-primary mb-1 block">Key Type</span>
                <div className="flex">
                  <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium border rounded-l ${
                      importedKeyType === 'Public'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white text-text-secondary'
                    }`}
                    onClick={() => setImportedKeyType('Public')}
                  >
                    Public Key
                  </button>
                  
                  <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium border rounded-r ${
                      importedKeyType === 'Private'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white text-text-secondary'
                    }`}
                    onClick={() => setImportedKeyType('Private')}
                  >
                    Private Key
                  </button>
                </div>
              </label>
            </div>
            
            <div className="space-y-4">
              <InputField
                label="Paste Key"
                name="importedKeyText"
                as="textarea"
                value={importedKeyText}
                onChange={(e) => setImportedKeyText(e.target.value)}
                placeholder="Paste your key here"
              />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-text-secondary">OR</span>
                </div>
              </div>
              
              <FileUpload
                label="Upload Key File"
                accept=".pem,.key"
                onChange={setImportedKeyFile}
              />
              
              <Button
                variant="primary"
                onClick={importKey}
                disabled={!importedKeyText && !importedKeyFile}
                fullWidth
                icon={<FileText size={18} />}
              >
                Import Key
              </Button>
            </div>
          </Card>
        </div>
        
        <div>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Saved Keys</h2>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded text-text-secondary">
                {savedKeys.length} Keys
              </span>
            </div>
            
            {savedKeys.length > 0 ? (
              <div className="space-y-4">
                {savedKeys.map(key => (
                  <div key={key.id} className="p-3 border rounded bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{key.name}</h3>
                        <span className={`text-xs rounded-full px-2 py-0.5 ${
                          key.type === 'Public' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {key.type} Key
                        </span>
                      </div>
                      <span className="text-xs text-text-secondary">
                        Last used: {key.lastUsed}
                      </span>
                    </div>
                    
                    <div className="mt-2 font-mono text-xs text-text-secondary truncate">
                      {key.key}
                    </div>
                    
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        className="p-1 text-text-secondary hover:text-primary"
                        onClick={() => copyKey(key.key)}
                        title="Copy key"
                      >
                        <Copy size={16} />
                      </button>
                      
                      <button
                        className="p-1 text-text-secondary hover:text-primary"
                        title="Download key"
                      >
                        <Download size={16} />
                      </button>
                      
                      <button
                        className="p-1 text-text-secondary hover:text-error"
                        onClick={() => deleteKey(key.id)}
                        title="Delete key"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-secondary">
                <Key size={32} className="mx-auto mb-2 opacity-30" />
                <p>No saved keys yet</p>
              </div>
            )}
          </Card>
          
          <Card className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Cryptographic Usage Guide</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium mb-1">Signing Packages</h3>
                <p className="text-text-secondary">
                  Use your private key to digitally sign packages, creating a unique fingerprint that verifies your identity as the sender.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Verifying Authenticity</h3>
                <p className="text-text-secondary">
                  Recipients use your public key to verify the signature, ensuring the package hasn't been tampered with in transit.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Zero-Knowledge Proofs</h3>
                <p className="text-text-secondary">
                  ZKPs allow verification of data without revealing sensitive information, using cryptographic keys as inputs.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Key Security</h3>
                <p className="text-text-secondary">
                  Always keep private keys secure. They cannot be recovered if lost and could compromise your supply chain if stolen.
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-accent rounded">
              <div className="flex items-start">
                <CheckCircle size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-text-primary">
                  This platform uses RSA-2048 encryption for key generation and ECDSA for blockchain signatures.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageKeysPage;