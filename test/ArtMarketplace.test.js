const ArtMarketplace = artifacts.require("ArtMarketplace");
const { expectRevert, time } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');

contract("ArtMarketplace", accounts => {
  const [owner, artist1, buyer1] = accounts;
  let marketplace;
  const tokenURI = "ipfs://QmTest...";
  const price = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    marketplace = await ArtMarketplace.new({ from: owner });
  });

  describe("NFT Creation", () => {
    it("should create a new NFT", async () => {
      await marketplace.createToken(tokenURI, price, { from: artist1 });
      const tokenId = 1;
      
      const newToken = await marketplace.getToken(tokenId);
      assert.equal(newToken.creator, artist1, "Creator should be artist1");
      assert.equal(newToken.price.toString(), price.toString(), "Price should match");
    });

    it("should emit TokenCreated event", async () => {
      const result = await marketplace.createToken(tokenURI, price, { from: artist1 });
      
      const event = result.logs[0];
      assert.equal(event.event, "TokenCreated", "Should emit TokenCreated event");
      assert.equal(event.args.creator, artist1, "Creator should be artist1");
    });
  });

  describe("NFT Purchase", () => {
    beforeEach(async () => {
      await marketplace.createToken(tokenURI, price, { from: artist1 });
    });

    it("should allow purchase of NFT", async () => {
      await marketplace.purchaseToken(1, {
        from: buyer1,
        value: price
      });

      const newOwner = await marketplace.ownerOf(1);
      assert.equal(newOwner, buyer1, "Buyer should be new owner");
    });

    it("should not allow purchase with insufficient funds", async () => {
      const lowPrice = web3.utils.toWei("0.5", "ether");
      
      await expectRevert(
        marketplace.purchaseToken(1, {
          from: buyer1,
          value: lowPrice
        }),
        "Insufficient payment"
      );
    });
  });

  describe("Marketplace Operations", () => {
    it("should track total NFTs", async () => {
      await marketplace.createToken(tokenURI, price, { from: artist1 });
      await marketplace.createToken(tokenURI, price, { from: artist1 });
      
      const totalNFTs = await marketplace.totalSupply();
      assert.equal(totalNFTs.toString(), "2", "Should have 2 NFTs");
    });

    it("should allow price updates", async () => {
      await marketplace.createToken(tokenURI, price, { from: artist1 });
      const newPrice = web3.utils.toWei("2", "ether");
      
      await marketplace.updateTokenPrice(1, newPrice, { from: artist1 });
      const token = await marketplace.getToken(1);
      assert.equal(token.price.toString(), newPrice.toString(), "Price should be updated");
    });
  });

  describe("Security Features", () => {
    it("should prevent non-owners from updating price", async () => {
      await marketplace.createToken(tokenURI, price, { from: artist1 });
      const newPrice = web3.utils.toWei("2", "ether");
      
      await expectRevert(
        marketplace.updateTokenPrice(1, newPrice, { from: buyer1 }),
        "Not token owner"
      );
    });

    it("should prevent double purchases", async () => {
      await marketplace.createToken(tokenURI, price, { from: artist1 });
      await marketplace.purchaseToken(1, { from: buyer1, value: price });
      
      await expectRevert(
        marketplace.purchaseToken(1, { from: accounts[3], value: price }),
        "Token already sold"
      );
    });
  });
});