module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    // Weitere Netzwerkkonfigurationen...
  },
  
  compilers: {
    solc: {
      version: "0.8.20", // Ändern Sie dies auf 0.8.20
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },

  // Weitere Konfigurationen...
};
