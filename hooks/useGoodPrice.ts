import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { getNFTPrice } from "../utils/services/actions";

export const useGoodTokenPrice = (interval?: number) => {
  const [price, setPrice] = useState<number>(0);
  const [priceForOne, setPriceForOne] = useState<number>(0);
  const getGoodToken = () => {
    getNFTPrice().then((res: AxiosResponse<{ ticker: { last: string }[] }>) => {
      setPrice(parseFloat(res?.data?.ticker?.[0]?.last ?? "0"));
    });
  };

  useEffect(() => {
    getGoodToken();
  }, []);

  useEffect(() => {
    if (interval) {
      const inter = window.setInterval(getGoodToken, interval);
      return () => {
        window.clearInterval(inter);
      };
    }
  }, [interval]);

  useEffect(() => {
    setPriceForOne(price / 5);
  }, [price]);

  return { price, goodPriceForOneCredit: priceForOne };
};
