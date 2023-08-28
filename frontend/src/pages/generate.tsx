import { NextSeo } from 'next-seo'

import { Avatar, Toast, Dialog, Skeleton, Button, Card, Heading, Typography, Select } from '@ensdomains/thorin'
import { CopySVG, EthSVG, WalletSVG, MoonSVG } from '@ensdomains/thorin'

import { ConnectButton } from '@/components/ConnectButton'
import { Container, Layout } from '@/components/templates'
import styled, { css } from 'styled-components'

import { useState } from 'react';

import generateImage from '@/components/GenerateAIButton';
import mintImage from '@/components/MintButton';


export default function Page() {


  const [ensName, setEnsName] = useState('');
  const [connectedAddress, setAddress] = useState('');
  const [artStyle, setArtStyle] = useState(''); 
  const [theme, setTheme] = useState(''); 
  const [poseSetting, setPoseSetting] = useState(''); 
  const [imageUrl, setImageUrl] = useState(null);

  const [ensToast, ensToastOpen] = useState(false);
  const [paramToast, paramToastOpen] = useState(false);
  const [imageToast, imageToastOpen] = useState(false);

  
  const [generateDialog, generateDialogOpen] = useState(false);


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
      else{
        generateDialogOpen(!generateDialog);
        const AIImageUrl = await generateImage(ensName, artStyle, theme, poseSetting);
        console.log('Generated Image URL:', imageUrl);
        setImageUrl(AIImageUrl);
      }
    } catch (error) {
      console.log('Error caused' + error);
      // Handle error if image generation fails
    }
  };

  const handleMintClick = async () => {
    try {
      //If imageUrl null, then hasn't generated yet and can't mint
      if (!imageUrl) {
        imageToastOpen(!imageToast);
        console.log('Image not generated yet');
      }
      else{
        console.log('Minting the image as an NFT');
        // Calls the mintImage function and passes in the connected users address and the imageUrl
        await mintImage(connectedAddress, imageUrl);
      }
    } catch (error) {
      // Handle error if minting fails
    }
  }


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
              subtitle="AI Image Generating..."
              title="Success!"
              onDismiss={() => generateDialogOpen(false)}
            >
            </Dialog>
          </>
          
          <ExamplesGrid>

            <LeftContent>
                
              <Card divider>
                <OptionRow>
                  <Typography color="textSecondary">
                    Verify ENS
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
            </LeftContent>
            
            <RightContent>
              <Card divider>
                {imageUrl ? (
                  <img src={imageUrl} alt="Generated Art" style={{ maxWidth: '100%' }} />
                ) : (
                  <img src="placeholder.png" alt="Placeholder" style={{ width: '300px', height: '300px' }} />
                )}
                <Button onClick={handleMintClick}>
                  Mint as NFT
                </Button>
              </Card>
            </RightContent>

          </ExamplesGrid>
        <Typography color="textSecondary">
          Address: {connectedAddress}
          ENS Name: {ensName} 
          Art Style: {artStyle} 
          Theme: {theme} 
          Pose/Setting: {poseSetting}
        </Typography>

        </Container>

        <footer />
      </Layout>
    </>
  )
}


const OptionRow = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between; // Align items to the start and end of the container
    gap: ${theme.space['2']}; // Adjust the gap as needed
  `
);

const ExamplesGrid = styled.div(
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

const LeftContent = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space['4']};
  `
);

const RightContent = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space['4']};
  `
);