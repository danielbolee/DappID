import { useState } from 'react';
import dotenv from 'dotenv';
import { ethers } from 'ethers';

import contractABI from '../../artifacts/contracts/DappIDMinter.sol/DappIDMinter.json';

const mintImage = async (connectedAddress, imageURI) => {
    console.log('Starting mintImage');
    const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

    const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const contractAddress = '0x547d1Be0ba1FFd6dE9a6C6c5118370903A0A122f';

    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const signer = provider.getSigner(connectedAddress);

    try {
        // Call the safeMint function
        const tx = await contract.connect(signer).safeMint(connectedAddress, imageURI);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log("NFT minted successfully!");
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
};

export default mintImage;