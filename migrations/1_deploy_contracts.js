const ArtMarketplace = artifacts.require("ArtMarketplace");
const fs = require('fs');
const path = require('path');

module.exports = async function(deployer, network, accounts) {
    try {
        // Deploy the contract
        await deployer.deploy(ArtMarketplace);
        const marketplace = await ArtMarketplace.deployed();

        // Log deployment address
        console.log(`ArtMarketplace deployed at: ${marketplace.address}`);

        // Save deployment address to a file for frontend use
        const deploymentInfo = {
            address: marketplace.address,
            network: network
        };

        const deploymentPath = path.join(__dirname, '..', 'src', 'deployments');
        if (!fs.existsSync(deploymentPath)) {
            fs.mkdirSync(deploymentPath, { recursive: true });
        }

        fs.writeFileSync(
            path.join(deploymentPath, 'deployment.json'),
            JSON.stringify(deploymentInfo, null, 2)
        );

    } catch (error) {
        console.error('Error during deployment:', error);
        throw error;
    }
};