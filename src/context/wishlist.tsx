import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Planet } from 'utils/interface';

type WishlistContextType = {
  dataWishlist: Planet[];
  setDataWishlist: React.Dispatch<React.SetStateAction<Planet[]>>;
};
const WishlistContext = createContext<WishlistContextType>({
  dataWishlist: [],
  setDataWishlist: () => {}
});

export const useWishlist = () => {
  return useContext(WishlistContext);
};
type Provider = {
  children: ReactNode;
};

const WishlistProvider: React.FC<Provider> = ({ children }) => {
  const [dataWishlist, setDataWishlist] = useState<Planet[]>([]);
  return (
    <WishlistContext.Provider value={{ dataWishlist, setDataWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
