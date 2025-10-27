"use server";

import { getCookies } from "@/lib/hooks/useCookiesServer";
import { sendLogError } from "./sendLogError";

const API_URL_STRAPI = process.env.STRAPI_API_URL;
const API_URL = API_URL_STRAPI + "/api";

const UNAUTHORIZED_ERROR_CODE_STATUS = 401;

type ServerPostArgs = {
  endPoint: string;
  payload?: any;
  apiURL?: string;
  headers?: Record<string, string>;
  method?: "POST" | "PATCH" | "PUT" | "DELETE";
  Authorization?: string;
};

export const SERVER_POST = async ({
  endPoint,
  payload,
  headers = {},
  method = "POST",
  Authorization,
}: ServerPostArgs) => {
  const token = await getCookies("accessToken") || Authorization

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: payload ? JSON.stringify(payload) : undefined,
    credentials: "include",
  };

  const res = await fetch(`${API_URL}/${endPoint}`, config)
    .then((res) => {
      switch (res.status) {
        case 404:
          throw `${res.status}: Not Found ${res.statusText}`;
        case UNAUTHORIZED_ERROR_CODE_STATUS:
          throw `${res.status}: Unauthorized`;
        case 500:
          throw `${res.status}: Server Error`;
      }
      return res.json();
    })
    .then((data) => {
      if (data?.error) {
        sendLogError(
          `Error API Call ${method} 400 Bad Request`,
          payload,
          API_URL,
          endPoint,
          data.error
        );
      }

      return {
        data,
      };
    })
    .catch((err: any) => {
      sendLogError(
        `Error API Call ${method} ${err}`,
        payload,
        API_URL,
        endPoint,
        err
      );

      return {
        data: null,
        error: err || { message: "Terjadi Kesalahan" },
      };
    });

  return res;
};
