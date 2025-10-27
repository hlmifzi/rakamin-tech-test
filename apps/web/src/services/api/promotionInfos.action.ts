"use server"

import { SERVER_FETCH } from "../SERVER_FETCH";

type getPromotionInfoRes = {
  promotion_text: string
} | null

export const getPromotionInfo = async ():Promise<getPromotionInfoRes> => {
  const res = await SERVER_FETCH("promotion-info");
  return res?.data || ""
}