const blockchainService = require('../services/blockchain/blockchainService');
const zkpService = require('../services/zkp/zkpService');

exports.addLocationProof = async (req, res, next) => {
    try {
        const { 
            packageId, 
            actualLocation, 
            claimedLocation, 
            privateKey 
        } = req.body;
        
        // Generate Zero-Knowledge Proof
        const zkp = await zkpService.generateLocationProof(
            actualLocation,
            claimedLocation,
            privateKey
        );
        
        // Create location hash (for blockchain storage)
        const locationHash = JSON.stringify(claimedLocation);
        
        // Submit to blockchain
        const txResult = await blockchainService.addLocationProof(
            packageId,
            locationHash,
            zkp.proof
        );
        
        res.status(201).json({
            success: true,
            data: {
                packageId,
                transactionHash: txResult.transactionHash,
                timestamp: new Date().toISOString(),
                location: claimedLocation
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getLocationProofs = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Get location proofs from blockchain
        const proofs = await blockchainService.getLocationProofs(id);
        
        res.status(200).json({
            success: true,
            data: proofs
        });
    } catch (error) {
        next(error);
    }
};