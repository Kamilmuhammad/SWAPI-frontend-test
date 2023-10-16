import PlanetCard from 'components/card/planet.card';
import Layout from 'components/layout';
import { useWishlist } from 'context/wishlist';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export default function Wishlist() {
  const { dataWishlist } = useWishlist();
  return (
    <Layout>
      <Title>Wishlist Planets</Title>
      {dataWishlist.length > 0 ? (
        <ContainerList>
          {dataWishlist.map((planet, index) => (
            <PlanetCard data={planet} key={index} />
          ))}
        </ContainerList>
      ) : (
        <>
          <EmptyWishlist>
            <h1>Empty Whislist....</h1>
            <Link href={'/'} passHref>
              <BacktoHome>Back To Home</BacktoHome>
            </Link>
          </EmptyWishlist>
        </>
      )}
    </Layout>
  );
}

const Title = styled.h1`
  color: white;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`;
const EmptyWishlist = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: 12px;
  height: 50vh;
  justify-content: end;
  text-align: center;
`;

const ContainerList = styled.div`
  color: white;
  display: grid;
  flex-wrap: wrap;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 16px;
`;

const BacktoHome = styled.a`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 8px;
  text-align: center;

  &:hover {
    background: rgba(0, 0, 0, 1);
  }
`;
