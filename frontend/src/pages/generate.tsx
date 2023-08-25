import { NextSeo } from 'next-seo'

import { Avatar, Button, Card, EnsSVG, Heading, Typography, Select } from '@ensdomains/thorin'
import { CopySVG, EthSVG, WalletSVG, MoonSVG } from '@ensdomains/thorin'

import { ConnectButton } from '@/components/ConnectButton'
import { Container, Layout } from '@/components/templates'
import styled, { css } from 'styled-components'

import { useState } from 'react';

export default function Page() {


  const [ensName, setEnsName] = useState('');
  const [artStyle, setArtStyle] = useState(''); // Add state for art style
  const [theme, setTheme] = useState(''); // Add state for theme
  const [poseSetting, setPoseSetting] = useState(''); // Add state for pose/setting

  const updateEnsName = (newEnsName) => {
    setEnsName(newEnsName);
  };
  return (
    <>
      <NextSeo title="generate" />

      <Layout>
        <header />

        <Container as="main" $variant="flexVerticalCenter" $width="large">
          <Heading level="1">DappID</Heading>
          
          
          <ExamplesGrid>

            <LeftContent>
                
              <Card divider>
                <OptionRow>
                  <Typography color="textSecondary">
                    Verify ENS
                  </Typography>
                  <ConnectButton updateEnsName={updateEnsName}/>
                </OptionRow>
                <Card.Divider />

                <OptionRow>
                  <Typography color="textSecondary">
                    ArtStyle
                  </Typography>
                  <Select
                    autocomplete
                    options={[
                      { value: '0', label: 'Pixel Art' },
                      { value: '1', label: 'Anime' },
                      { value: '2', label: 'Cartoon' },
                      { value: '3', label: 'Realistic' },
                      { value: '4', label: 'Abstract' },
                      { value: '5', label: 'Retro' },
                    ]}
                    placeholder="Select an option..."
                    tabIndex="2"
                  />
                </OptionRow>
                <OptionRow>
                  <Typography color="textSecondary">  
                    Theme
                  </Typography>
                  <Select
                    autocomplete
                    options={[
                      { value: '0', label: 'Futuristic' },
                      { value: '1', label: 'Nature' },
                      { value: '2', label: 'Space' },
                      { value: '3', label: 'Music' },
                      { value: '4', label: 'Gaming' },
                      { value: '5', label: 'Superhero' },
                    ]}
                    placeholder="Select an option..."
                    tabIndex="2"
                  />
                </OptionRow>   
                <OptionRow>   
                  <Typography color="textSecondary">  
                    Pose/Setting
                  </Typography>
                  <Select
                    autocomplete
                    options={[
                      { value: '0', label: 'Portrait' },
                      { value: '1', label: 'Full body' },
                      { value: '2', label: 'Scenic background' },
                      { value: '3', label: 'Avatar style' },
                      { value: '4', label: 'With pet or animal' },
                    ]}
                    placeholder="Select an option..."
                    tabIndex="2"
                  />
                </OptionRow>
                <Card.Divider />
                <Button>

                </Button>              
              </Card>
            </LeftContent>
            
            <RightContent>
              <Card divider>
                <Typography color="textSecondary">
                  ENS Name: {ensName}
                </Typography>
                    
              </Card>
            </RightContent>

          </ExamplesGrid>

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