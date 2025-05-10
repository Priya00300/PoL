const snarkjs = require('snarkjs');
const fs = require('fs');
const path = require('path');

class ZKPService {
    async generateLocationProof(actualLocation, claimedLocation, privateKey) {
        try {
            // This is a simplified example
            // In a real implementation, you would use a specific ZK circuit
            
            // Input for the ZK proof
            const input = {
                actualLat: actualLocation.latitude,
                actualLong: actualLocation.longitude,
                claimedLat: claimedLocation.latitude,
                claimedLong: claimedLocation.longitude,
                privateKey: privateKey,
                tolerance: 0.001 // Acceptable difference in coordinates
            };
            
            // Path to your circuit files
            const wasmFile = path.join(__dirname, '../../circuits/location_proof.wasm');
            const provingKey = path.join(__dirname, '../../circuits/location_proof_proving_key.zkey');
            
            // Generate proof
            const { proof, publicSignals } = await snarkjs.groth16.fullProve(
                input, 
                wasmFile, 
                provingKey
            );
            
            return {
                proof,
                publicSignals
            };
        } catch (error) {
            console.error('Error generating ZK proof:', error);
            throw new Error('Failed to generate location proof');
        }
    }
    
    async verifyLocationProof(proof, publicSignals) {
        try {
            const verificationKey = JSON.parse(
                fs.readFileSync(path.join(__dirname, '../../circuits/verification_key.json'))
            );
            
            const isValid = await snarkjs.groth16.verify(
                verificationKey,
                publicSignals,
                proof
            );
            
            return isValid;
        } catch (error) {
            console.error('Error verifying ZK proof:', error);
            throw new Error('Failed to verify location proof');
        }
    }
}

module.exports = new ZKPService();