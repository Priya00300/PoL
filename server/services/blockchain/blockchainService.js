const { ethers } = require('ethers');
const PolAbi = require('../../../contracts/build/contracts/ProofOfLocation.json');

class BlockchainService {
    constructor() {
        // Initialize connection to blockchain
        this.provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_URL || 'http://localhost:8545');
        this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
        this.polContract = new ethers.Contract(
            process.env.POL_CONTRACT_ADDRESS,
            PolAbi.abi,
            this.signer
        );
    }
    
    async createPackage(packageId, ipfsHash) {
        try {
            const packageIdBytes = ethers.utils.id(packageId);
            const tx = await this.polContract.createPackage(packageIdBytes, ipfsHash);
            await tx.wait();
            return {
                transactionHash: tx.hash,
                packageId: packageIdBytes
            };
        } catch (error) {
            console.error('Error creating package on blockchain:', error);
            throw error;
        }
    }
    
    async addLocationProof(packageId, locationHash, zkProofHash) {
        try {
            const packageIdBytes = ethers.utils.id(packageId);
            const locationHashBytes = ethers.utils.id(locationHash);
            const zkProofHashBytes = ethers.utils.id(JSON.stringify(zkProofHash));
            
            const tx = await this.polContract.addLocationProof(
                packageIdBytes,
                locationHashBytes,
                zkProofHashBytes
            );
            await tx.wait();
            
            return {
                transactionHash: tx.hash
            };
        } catch (error) {
            console.error('Error adding location proof to blockchain:', error);
            throw error;
        }
    }
    
    async getPackageDetails(packageId) {
        try {
            const packageIdBytes = ethers.utils.id(packageId);
            const details = await this.polContract.getPackage(packageIdBytes);
            
            return {
                owner: details.owner,
                ipfsHash: details.ipfsHash,
                createdAt: new Date(details.createdAt.toNumber() * 1000),
                isActive: details.isActive
            };
        } catch (error) {
            console.error('Error getting package details from blockchain:', error);
            throw error;
        }
    }
    
    async getLocationProofs(packageId) {
        try {
            const packageIdBytes = ethers.utils.id(packageId);
            const count = await this.polContract.getLocationProofCount(packageIdBytes);
            
            const proofs = [];
            for (let i = 0; i < count.toNumber(); i++) {
                const proof = await this.polContract.locationProofs(packageIdBytes, i);
                proofs.push({
                    locationHash: proof.locationHash,
                    zkProofHash: proof.zkProofHash,
                    timestamp: new Date(proof.timestamp.toNumber() * 1000),
                    verifier: proof.verifier
                });
            }
            
            return proofs;
        } catch (error) {
            console.error('Error getting location proofs from blockchain:', error);
            throw error;
        }
    }
}

module.exports = new BlockchainService();