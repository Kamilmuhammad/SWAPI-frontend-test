/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Layout from 'components/layout';
import PlanetCard from 'components/card/planet.card';
import { Planet } from 'utils/interface';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  dataPlanet: Planet[];
};

const Home: NextPage<Props> = ({ dataPlanet }) => {
  const [data, setData] = useState<Planet[]>([]);
  const [page, setPage] = useState<number>(2);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [hasmore, setHasmore] = useState<boolean>(true);
  useEffect(() => {
    setData(dataPlanet);
  }, [dataPlanet]);

  const fetchData = async () => {
    if (nextUrl === null) {
      setHasmore(false);
      return;
    }

    setPage(page + 1);
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        page: `/?page=${page.toString()}`
      }
    };

    try {
      const response = await fetch(`/api/planets`, requestOptions);
      if (response.ok) {
        const res = await response.json();
        const newResults = res.data.results;
        setNextUrl(res.data.next);
        if (newResults) {
          setData([...data, ...newResults]);
        }
      }
    } catch (error) {
      console.error('error data:', error);
    }
  };

  return (
    <Layout>
      <Title>choose your planet</Title>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasmore}
        loader={<p className="text-lg text-white text-center pt-2">loading...</p>}
        endMessage={
          <p className="text-lg text-white text-center pt-2">all data has been displayed</p>
        }
      >
        <ContainerList>
          {data.map((planet, index) => (
            <PlanetCard data={planet} key={index} />
          ))}
        </ContainerList>
      </InfiniteScroll>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const response = await fetch(`https://swapi.dev/api/planets/?page=1`);
    const res = await response.json();
    const dataPlanet = res.results;
    return { props: { dataPlanet } };
  } catch (error) {
    console.error('error data:', error);
    return { props: { dataPlanet: [] } };
  }
};

const Title = styled.h1`
  color: white;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`;

const ContainerList = styled.div`
  color: white;
  display: grid;
  flex-wrap: wrap;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 16px;
`;
