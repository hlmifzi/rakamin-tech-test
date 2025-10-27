"use server";

import { SERVER_FETCH } from "../SERVER_FETCH";

export const getBanners = async () => {
  const res = await SERVER_FETCH("banners?populate=*");
  return res?.data || []
}