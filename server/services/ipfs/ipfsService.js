const { create } = require('ipfs-http-client');

class IPFSService {
    constructor() {
        // Connect to IPFS node
        // For development, you can use Infura's IPFS gateway
        this.ipfs = create({
            host: process.env.IPFS_HOST || 'ipfs.infura.io',
            port: process.env.IPFS_PORT || 5001,
            protocol: process.env.IPFS_PROTOCOL || 'https',
            headers: {
                authorization: process.env.IPFS_PROJECT_ID && process.env.IPFS_PROJECT_SECRET
                    ? `Basic ${Buffer.from(`${process.env.IPFS_PROJECT_ID}:${process.env.IPFS_PROJECT_SECRET}`).toString('base64')}`
                    : undefined
            }
        });
    }
    
    async uploadMetadata(metadata) {
        try {
            const result = await this.ipfs.add(JSON.stringify(metadata));
            return result.path; // This is the CID (Content Identifier)
        } catch (error) {
            console.error('Error uploading to IPFS:', error);
            throw new Error('Failed to upload metadata to IPFS');
        }
    }
    
    async getMetadata(cid) {
        try {
            const stream = this.ipfs.cat(cid);
            let data = '';
            
            for await (const chunk of stream) {
                data += chunk.toString();
            }
            
            return JSON.parse(data);
        } catch (error) {
            console.error('Error retrieving from IPFS:', error);
            throw new Error('Failed to retrieve metadata from IPFS');
        }
    }
}

module.exports = new IPFSService();