import { NextSeo } from 'next-seo'

//Import thorin design components
import { Avatar, Skeleton, Toast, Dialog, Button, Card, Heading, Typography, Select } from '@ensdomains/thorin'
//Import custom button logic
import { ConnectButton } from '@/components/ConnectButton'
import generateImage from '@/components/GenerateAIButton';

//Other misc imports
import { Container, Layout } from '@/components/templates'
import styled, { css } from 'styled-components'
import { useState } from 'react';
import { useContractWrite, useSwitchNetwork  } from 'wagmi'

import { createHelia } from 'helia'
import { json } from '@helia/json'

export default function Page() {
  const contractJson = require('../../artifacts/contracts/DappIDMinter.sol/DappIDMinter.json');

  //Address of the minting contract on the Sepolia Testnet
  const contractAddress = '0x547d1Be0ba1FFd6dE9a6C6c5118370903A0A122f';

  //States for connected/chosen data
  const [ensName, setEnsName] = useState('');
  const [connectedAddress, setAddress] = useState('');
  const [artStyle, setArtStyle] = useState(''); 
  const [theme, setTheme] = useState(''); 
  const [poseSetting, setPoseSetting] = useState(''); 
  const [mintTransaction, setMintTrans] = useState('');

  //URL for generated image
  const [imageUrl, setImageUrl] = useState(null);
  //URI to pass into mint contract
  const [nftURI, setNftURI] = useState('');

  //States for Toast/Dialog popups
  const [ensToast, ensToastOpen] = useState(false);
  const [paramToast, paramToastOpen] = useState(false);
  const [imageToast, imageToastOpen] = useState(false);
  const [generateDialog, generateDialogOpen] = useState(false);
  const [mintDialog, mintDialogOpen] = useState(false);


  //Handles data passed into minting contract
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: '0x547d1Be0ba1FFd6dE9a6C6c5118370903A0A122f',
    abi: contractJson.abi,
    functionName: 'safeMint',
    chainId: 11155111,
    args: [connectedAddress, nftURI],
  })

  //For switching network to Sepolia testnet for minting
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();

  //Handles logic when user tries to generate an image
  const handleGenerateClick = async () => {
    try {
      console.log('ENS Name:', ensName);
      console.log('Art Style:', artStyle);
      console.log('Theme:', theme);
      console.log('Pose/Setting:', poseSetting);
      
      //If any params missing,
      if (!ensName){
        ensToastOpen(!ensToast);
      }
      else if (!artStyle || !theme || !poseSetting) {
        paramToastOpen(!paramToast);
      }
      else{ //Generate success, calls API through GenerateAIButton.tsx
        generateDialogOpen(!generateDialog);
        const AIImageUrl = await generateImage(ensName, artStyle, theme, poseSetting);
        console.log('Generated Image URL:', imageUrl);
        setImageUrl(AIImageUrl); //Updates placeholder URL to newly generated image
      }
    } catch (error) {
      console.log('Error caused' + error); // Handle error if image generation fails
    }
  };

  //Handles logic when user tries to mint as an NFT
  const handleMintClick = async () => {
    try {
      //If imageUrl null, then hasn't generated yet and can't mint
      if (!imageUrl) {
        imageToastOpen(!imageToast);
        console.log('Image not generated yet');
      }
      else{ //Good to start minting process
        console.log('Minting the image as an NFT');

        //Creates helia node to upload json metadata to IPFS
        const helia = await createHelia()
        const j = json(helia)
        const myImmutableAddress = await j.add({
          "description": "AI Generated Profile Picture from DappID.",
          "image": imageUrl, 
          "name": ensName + "'s AI PFP"
        })
        console.log(myImmutableAddress);
        
        console.log(await j.get(myImmutableAddress))
        // Switch network to sepolia then mints
        switchNetwork?.(11155111);
        write();
        setMintTrans(JSON.stringify(data));
        mintDialogOpen(!mintDialog);
      }
    } catch (error) {
      console.log('Error caused' + error);  // Handle error if minting fails
    }
  }

  //Functions to update ENS and address as user changes it
  const updateEnsName = (newEnsName) => {
    console.log("Updating ENS name to :" + newEnsName);
    setEnsName(newEnsName);
  };
  const updateAddress = (newAddress) => {
    console.log("Updating address to :" + newAddress);
    setAddress(newAddress);
  };

  return (
    <>
      <NextSeo title="generate" />

      <Layout>
        <header />

        <Container as="main" $variant="flexVerticalCenter" $width="large">
          <Heading level="1">DappID</Heading>

          <> 
            <Toast
              description="Select an option for all the parameters."
              open={paramToast}
              title="Finish Parameters"
              variant="desktop"
              onClose={() => paramToastOpen(false)}
            >
            </Toast>
            <Toast
              description="Please use a wallet with a valid ENS."
              open={ensToast}
              title="Wallet has no ENS"
              variant="desktop"
              onClose={() => ensToastOpen(false)}
            >
            </Toast>
            <Toast
              description="Please generate an image first."
              open={imageToast}
              title="Missing Image to Mint"
              variant="desktop"
              onClose={() => imageToastOpen(false)}
            >
            </Toast>
          </>
          
          <>
            <Dialog
              alert="info"
              currentStep={1}
              open={generateDialog}
              subtitle="AI Image Generating, please wait a few seconds"
              title="Success!"
              onDismiss={() => generateDialogOpen(false)}
            >
            </Dialog>
            <Dialog
              alert="info"
              currentStep={1}
              open={mintDialog}
              subtitle={"Follow instructions in your wallet"}
              title="Minting Started!"
              onDismiss={() => mintDialogOpen(false)}
            >
            </Dialog>
          </>
          
          <Grid>

            <ColContent>
                
              <Card divider>
                <OptionRow>
                  <Typography color="textSecondary">
                    Connect ENS
                  </Typography>
                  <ConnectButton updateEnsName={updateEnsName} updateAddress={updateAddress}/>
                </OptionRow>
                <Card.Divider />

                <OptionRow>
                  <Typography color="textSecondary">
                    ArtStyle
                  </Typography>
                  <Select
                    autocomplete
                    options={[
                      { value: 'Pixel Art', label: 'Pixel Art' },
                      { value: 'Anime', label: 'Anime' },
                      { value: 'Cartoon', label: 'Cartoon' },
                      { value: 'Realistic', label: 'Realistic' },
                      { value: 'Abstract', label: 'Abstract' },
                      { value: 'Retro', label: 'Retro' },
                    ]}
                    placeholder="Select an option..."
                    tabIndex="2"
                    onChange={(event) => {
                      console.log('Selected Art Style:', event.target);
                      setArtStyle(event.target.value);
                    }}
                  />
                </OptionRow>
                <OptionRow>
                  <Typography color="textSecondary">  
                    Theme
                  </Typography>
                  <Select
                    autocomplete
                    options={[
                      { value: 'Futuristic', label: 'Futuristic' },
                      { value: 'Nature', label: 'Nature' },
                      { value: 'Space', label: 'Space' },
                      { value: 'Music', label: 'Music' },
                      { value: 'Gaming', label: 'Gaming' },
                      { value: 'Superhero', label: 'Superhero' },
                    ]}
                    placeholder="Select an option..."
                    tabIndex="2"
                    onChange={(event) => {
                      console.log('Selected Theme:', event.target);
                      setTheme(event.target.value);
                    }}
                  />
                </OptionRow>   
                <OptionRow>   
                  <Typography color="textSecondary">  
                    Pose/Setting
                  </Typography>
                  <Select
                    autocomplete
                    options={[
                      { value: 'Portrait', label: 'Portrait' },
                      { value: 'Full body', label: 'Full body' },
                      { value: 'Scenic background', label: 'Scenic background' },
                      { value: 'Avatar style', label: 'Avatar style' },
                      { value: 'With pet or animal', label: 'With pet or animal' },
                    ]}
                    placeholder="Select an option..."
                    tabIndex="2"
                    onChange={(event) => {
                      console.log('Selected Pose/Setting:', event.target);
                      setPoseSetting(event.target.value);
                    }}
                  />
                </OptionRow>
                <Card.Divider />
                <Button onClick={handleGenerateClick}>
                  Generate Image
                </Button>            
              </Card>
            </ColContent>
            
            <ColContent>
              <Card divider>
                {imageUrl ? (
                  <img src={imageUrl} alt="Generated Art" style={{ maxWidth: '300px' }} />
                ) : (
                  <Skeleton loading={true}>
                    <img src="placeholder.png" alt="Placeholder" style={{ width: '300px', height: '300px' }} />
                  </Skeleton>
                )}
                <Button onClick={handleMintClick}>
                  Mint as NFT
                </Button>
              </Card>
            </ColContent>

          </Grid>

        </Container>

        <footer />
      </Layout>
    </>
  )
}
/* For testing above
<Typography color="textSecondary">
  Address: {connectedAddress}
  ENS Name: {ensName} 
  Art Style: {artStyle} 
  Theme: {theme} 
  Pose/Setting: {poseSetting}
</Typography>
*/

const OptionRow = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between; // Align items to the start and end of the container
    gap: ${theme.space['2']}; // Adjust the gap as needed
  `
);

const Grid = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    gap: ${theme.space['4']};
    grid-template-columns: 1fr 1fr;

    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: 1fr; /* Single column on smaller screens */
    }
  `
)

const ColContent = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space['4']};
  `
);
