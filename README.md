# DappID

DappID is a web app that allows users to create unique AI generated avatars from their ENS name, and then mint those avatars as NFTs on the blockchain.

Users simply connect their Ethereum wallet, enter their ENS name (or use their connected wallet address), customize the art style, and generate and mint a one-of-a-kind identity-linked PFP NFT on the blockchain.

## Features

- Generate AI-powered profile pictures tailored to any ENS name or wallet address
- Customize the art style - anime, pixel art, landscapes, and more
- Seamlessly mint the finalized image as an ERC-721 NFT
- Built with React, Next.js, Thorin, Styled Components, Viem, Wagmi, Rainbowkit, Helia, StableDiffusion API


## How it works

1. Users first can read what DappID does from the landing page, and move on by clicking "Get Started"
![Landing Page](/readme_images/image.png)

2. On the main generation page, users are prompted to connect their wallet for their ENS resolution
![Generation Page](/readme_images/image-1.png)

3. After connecting their wallet, they can then fill in the parameters below before they generate image 
![ENS Connected Successfully](/readme_images/image-2.png)
![Parameters Filled Out](/readme_images/image-3.png)

4. Users can then see their generated image to the right that was created using StableDiffusion text-to-image API, and then have the option to mint their NFT through their wallet
![Generation Page with Generated Image](/readme_images/image-4.png)

![Minting prompted through connected Wallet](/readme_images/image-5.png)

## Video Demonstration

Link to video demo of how the product works: https://drive.google.com/file/d/1R8VvBzuFNUI1Xb8Fa5xtpliQSEGBuoPG/view?usp=drive_link

## Credits

Big thank you to the ENS team for the frontend template to expediate the frontend development process!
Link to template used: https://github.com/ensdomains/frontend-template/tree/main