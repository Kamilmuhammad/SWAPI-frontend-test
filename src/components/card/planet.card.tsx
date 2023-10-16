import { useWishlist } from 'context/wishlist';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Planet } from 'utils/interface';

const PlanetCard = ({ data }: { data: Planet }) => {
  const { dataWishlist, setDataWishlist } = useWishlist();
  const isDataInWishlist = dataWishlist.some((wishlistData) => wishlistData.name === data.name);

  const { url } = data;
  const match = url.match(/(\d+)/);
  const urlPlanet = match ? match[0] : null;

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
    <Container>
      <PlanetName>{data.name}</PlanetName>
      <DetailContainer>
        <p>Climate: {data.climate}</p>
        <p>Diameter: {data.diameter}</p>
        <p>Population: {data.population}</p>
        <p>Gravitacy: {data.gravity}</p>
      </DetailContainer>
      <DetailContainer>
        <Link href={`/planet/${urlPlanet}`} passHref>
          <ViewMore>View Detail</ViewMore>
        </Link>
        <ButtonAddWhislist onClick={() => handleAddToWishlist()}>
          {isDataInWishlist ? 'Delete from Wishlist' : 'Add Whislist'}
        </ButtonAddWhislist>
      </DetailContainer>
    </Container>
  );
};

export default PlanetCard;

const Container = styled.div`
  background: rgba(169, 169, 169, 0.3);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
  padding: 8px;
`;

const DetailContainer = styled.div`
  display: grid;
  font-size: 12px;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PlanetName = styled.h1`
  border: 1px solid white;
  border-radius: 8px;
  padding: 36px 0;
  text-align: center;
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
