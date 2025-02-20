class MarketplaceHandler {
    constructor(web3, contractAddress, contractABI) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(contractABI, contractAddress);
        this.account = null;
    }
    
    async initialize() {
        try {
            // Get connected accounts
            const accounts = await this.web3.eth.requestAccounts();
            this.account = accounts[0];
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                this.account = accounts[0];
                this.onAccountChange(this.account);
            });
            
            return this.account;
        } catch (error) {
            console.error('Error initializing marketplace:', error);
            throw error;
        }
    }
    
    async createArtwork(ipfsHash, price, title, description) {
        try {
            const priceWei = this.web3.utils.toWei(price.toString(), 'ether');
            
            const result = await this.contract.methods
                .createArtwork(ipfsHash, priceWei, title, description)
                .send({ from: this.account });
                
            return result;
        } catch (error) {
            console.error('Error creating artwork:', error);
            throw error;
        }
    }
    
    async buyArtwork(tokenId, price) {
        try {
            const result = await this.contract.methods
                .buyArtwork(tokenId)
                .send({ 
                    from: this.account,
                    value: this.web3.utils.toWei(price.toString(), 'ether')
                });
                
            return result;
        } catch (error) {
            console.error('Error buying artwork:', error);
            throw error;
        }
    }
    
    async getArtwork(tokenId) {
        try {
            const artwork = await this.contract.methods
                .getArtwork(tokenId)
                .call();
                
            return {
                ...artwork,
                price: this.web3.utils.fromWei(artwork.price, 'ether')
            };
        } catch (error) {
            console.error('Error getting artwork:', error);
            throw error;
        }
    }
    
    async getAllArtworks() {
        try {
            const tokenCount = await this.contract.methods.totalSupply().call();
            const artworks = [];
            
            for (let i = 1; i <= tokenCount; i++) {
                const artwork = await this.getArtwork(i);
                artworks.push(artwork);
            }
            
            return artworks;
        } catch (error) {
            console.error('Error getting all artworks:', error);
            throw error;
        }
    }
    
    onAccountChange(account) {
        // Override this method to handle account changes
        console.log('Account changed:', account);
    }
}

export default MarketplaceHandler;