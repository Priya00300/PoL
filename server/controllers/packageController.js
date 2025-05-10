const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const blockchainService = require('../services/blockchain/blockchainService');
const ipfsService = require('../services/ipfs/ipfsService');

exports.createPackage = async (req, res, next) => {
    try {
        const { 
            productDescription, 
            origin, 
            senderPrivateKey, 
            recipientPublicKey 
        } = req.body;
        
        // Generate unique package ID
        const packageId = uuidv4();
        
        // Create metadata to store on IPFS
        const metadata = {
            packageId,
            description: productDescription,
            origin,
            createdAt: new Date().toISOString(),
            recipientPublicKey
        };
        
        // Upload metadata to IPFS
        const ipfsHash = await ipfsService.uploadMetadata(metadata);
        
        // Register on blockchain
        const txResult = await blockchainService.createPackage(packageId, ipfsHash);
        
        // Generate QR code
        const qrData = JSON.stringify({
            packageId,
            ipfsHash,
            txHash: txResult.transactionHash
        });
        
        const qrCode = await QRCode.toDataURL(qrData);
        
        res.status(201).json({
            success: true,
            data: {
                packageId,
                ipfsHash,
                transactionHash: txResult.transactionHash,
                qrCode
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getPackage = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Get package details from blockchain
        const blockchainData = await blockchainService.getPackageDetails(id);
        
        // Get metadata from IPFS
        const metadata = await ipfsService.getMetadata(blockchainData.ipfsHash);
        
        // Get location proofs
        const locationProofs = await blockchainService.getLocationProofs(id);
        
        res.status(200).json({
            success: true,
            data: {
                ...metadata,
                owner: blockchainData.owner,
                isActive: blockchainData.isActive,
                locationProofs
            }
        });
    } catch (error) {
        next(error);
    }
};