import { useWishlist } from 'context/wishlist';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export default function Navbar() {
  const { dataWishlist } = useWishlist();
  return (
    <NavMain>
      <NavContainer>
        <Link href={'/'} passHref>
          <a>
            <Image src={'/assets/starWarsLogo.png'} alt="logo/" width={70} height={50} />
          </a>
        </Link>
        <MenuContainer>
          <Link href={'/wishlist'} passHref>
            <a>
              <Image src={'/assets/icon/rocket.svg'} width={30} height={30} alt="rocket" />
            </a>
          </Link>
          {dataWishlist.length > 0 && <Count>{dataWishlist.length}</Count>}
        </MenuContainer>
      </NavContainer>
    </NavMain>
  );
}
const NavMain = styled.div`
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;
const NavContainer = styled.div`
  align-items: center;
  color: white;
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 800px;
  padding: 10px 40px;
  width: 100%;

  @media (max-width: 640px) {
    padding: 10px 20px;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: end;
  position: relative;
`;
const Count = styled.span`
  align-items: center;
  background-color: rgba(255, 0, 0, 1);
  border-radius: 50%;
  display: flex;
  font-size: 12px;
  height: 24px;
  justify-content: center;
  position: absolute;
  right: -16px;
  top: -4px;
  width: 24px;
`;
