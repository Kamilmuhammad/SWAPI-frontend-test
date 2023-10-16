import Layout from 'components/layout';
import React from 'react';
import styled from 'styled-components';

import { Planet } from 'utils/interface';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useWishlist } from 'context/wishlist';
type Props = {
  data: Planet;
};
const PlanetDetail: React.FC<Props> = ({ data }) => {
  const date = new Date(data.created);
  const { dataWishlist, setDataWishlist } = useWishlist();
  const isDataInWishlist = dataWishlist.some((wishlistData) => wishlistData.name === data.name);
  const formattedDate = date.toLocaleDateString('id');
  const handleAddToWishlist = () => {
    if (!isDataInWishlist) {
      setDataWishlist([...dataWishlist, data]);
    } else {
      const updatedWishlist = dataWishlist.filter(
        (wishlistData) => wishlistData.name !== data.name
      );
      setDataWishlist(updatedWishlist);
    }
  };
  return (
    <Layout>
      <Title>{data.name}</Title>
      <Container>
        <UlStyled>
          <li>climate: {data.climate}</li>
          <li>population: {data.population}</li>
          <li>diameter: {data.diameter}</li>
          <li>gravity: {data.gravity}</li>
          <li>rotation period: {data.rotation_period}</li>
        </UlStyled>
        <UlStyled>
          <li>films: ( {data.films.length} )</li>
          <li>resident: ( {data.residents.length} )</li>
          <li>terrain: {data.terrain}</li>
          <li>surface water: {data.surface_water}</li>
          <li>orbital Period: {data.orbital_period}</li>
        </UlStyled>
      </Container>
      <p className="text-white text-right p-4">Last edited: {formattedDate}</p>
      <DetailContainer>
        <Link href={`/`} passHref>
          <ViewMore>Back to Home</ViewMore>
        </Link>
        <ButtonAddWhislist onClick={() => handleAddToWishlist()}>
          {isDataInWishlist ? 'Delete from Wishlist' : 'Add Whislist'}
        </ButtonAddWhislist>
      </DetailContainer>
    </Layout>
  );
};
export default PlanetDetail;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  try {
    const response = await fetch(`https://swapi.dev/api/planets/${slug}`);
    const dataPlanet = await response.json();
    return { props: { data: dataPlanet } };
  } catch (error) {
    console.error('error data:', error);
    return { notFound: true };
  }
};
const DetailContainer = styled.div`
  color: white;
  display: grid;
  font-size: 12px;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Title = styled.h1`
  color: white;
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
  text-transform: uppercase;
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: white;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  margin-top: 20px;
  min-height: 50vh;
  padding: 20px;

  @media (min-width: 640px) {
    padding-top: 60px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const UlStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: flex-start; /* Sesuaikan jarak yang Anda inginkan dalam piksel */
`;
const buttonStyle = ` background: rgba(0, 0, 0, 0.8);
  border: 1px solid #fff; 
  border-radius: 8px;
  margin: auto;
  padding: 8px;
  text-align: center;
  width: 100%;

  &:hover {
    background: rgba(0, 0, 0, 1);
  }`;
const ViewMore = styled.a`
  ${buttonStyle}
`;

const ButtonAddWhislist = styled.button`
  ${buttonStyle}
`;
