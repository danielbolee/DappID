import { Button, Card, EnsSVG, Heading, Typography } from '@ensdomains/thorin'
import { NextSeo } from 'next-seo'
import styled, { css } from 'styled-components'

import { Container, Layout } from '@/components/templates'
import Logo from '../public/DappIDLogo.png';

export default function Home() {
  return (
    <>
      <NextSeo title="Home" />

      <Layout>
        {/* Placeholder for the header */}
        <header />

        {/* Main content */}
        <Container as="main" $variant="flexVerticalCenter" $width="large">
          {/* Add DappIDLogo.png under here*/}
          <img src="DappIDLogo.png" alt="DappID Logo" style={{ width: '100px', height: '100px' }} />

          <Heading level="1">DappID</Heading>

          <ExamplesGrid>

            <Card title="Personalize your Online Identity." style={{ textAlign: "center" }}>
              <Typography color="textSecondary">
                Create and Mint Unique AI-Generated Avatars with Ease
              </Typography>

              <Button as="a" href="/generate">
                Get Started
              </Button>
            </Card>

          </ExamplesGrid>
        </Container>

        {/* Placeholder for the footer */}
        <footer />
      </Layout>
    </>
  )
}

const SvgWrapper = styled.div(
  ({ theme }) => css`
    --size: ${theme.space['16']};
    width: var(--size);
    height: var(--size);

    svg {
      width: 100%;
      height: 100%;
    }
  `
)

const ExamplesGrid = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    gap: ${theme.space['4']};
    grid-template-columns: repeat(auto-fit, minmax(${theme.space['64']}, 1fr));
  `
)
