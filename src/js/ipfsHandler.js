import { create } from 'ipfs-http-client';

class IPFSHandler {
    constructor() {
        // Configure IPFS client to use Infura
        this.ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https'
        });
        
        this.gateway = 'https://ipfs.io/ipfs/';
    }
    
    async uploadFile(file) {
        try {
            // Convert file to buffer
            const buffer = await this.fileToBuffer(file);
            
            // Upload to IPFS
            const added = await this.ipfs.add(buffer);
            
            return {
                hash: added.path,
                url: `${this.gateway}${added.path}`
            };
        } catch (error) {
            console.error('IPFS upload error:', error);
            throw error;
        }
    }
    
    async uploadMetadata(imageHash, title, description) {
        try {
            const metadata = {
                name: title,
                description: description,
                image: `ipfs://${imageHash}`,
                created: new Date().toISOString()
            };
            
            const added = await this.ipfs.add(JSON.stringify(metadata));
            
            return {
                hash: added.path,
                url: `${this.gateway}${added.path}`
            };
        } catch (error) {
            console.error('Metadata upload error:', error);
            throw error;
        }
    }
    
    fileToBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const buffer = Buffer.from(reader.result);
                resolve(buffer);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
}

export default IPFSHandler;