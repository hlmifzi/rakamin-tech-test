"use server";
import { FIVE_MINUTES } from "@/lib/constant";
import { sendLogError } from "./sendLogError";
import { getCookies } from "@/lib/hooks/useCookiesServer";

const UNAUTHORIZED_ERROR_CODE_STATUS = 401;

const API_URL = process.env.STRAPI_API_URL;
const API_URL_FETCH = API_URL + "/api";

type RequestCache =
  | "default"
  | "no-store"
  | "reload"
  | "no-cache"
  | "force-cache"
  | "only-if-cached"
  | string;

type argsType = {
  tags?: string[];
  revalidate?: number;
  cache?: RequestCache;
  Authorization?: string;
  query?: any;
}[];

const getOptions = (args: argsType, token?: string) => {
  let next = {};
  let cache = {};
  let Authorization = {};


  if (args?.[0]?.tags || args?.[0]?.revalidate) {
    next = {
      next: {
        ...(args?.[0]?.tags && {
          tags: args?.[0]?.tags,
        }),
        ...(args?.[0]?.revalidate && {
          revalidate: args?.[0]?.revalidate,
        }),
      },
    };
  } else {
    next = {
      next: {
        revalidate: FIVE_MINUTES
      },
    };
  }

  if (args?.[0]?.cache) {
    cache = {
      cache: args?.[0]?.cache,
    };
  }

  if (token) {
    Authorization = {
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  const options: any = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...Authorization,
    },
    ...next,
    ...cache,
    credentials: "include",
  };

  return options;
};

export const SERVER_FETCH = async (endPoint: string, ...args: argsType) => {
  
  const token = await getCookies("accessToken");
  const options = getOptions(args, token);
  const searchParams = `${args[0]?.query ? `?${new URLSearchParams({ ...args[0]?.query }).toString()}` : ""}`;

  const url = `${API_URL_FETCH}/${endPoint}${searchParams}`;
  const res = await fetch(url, options)
    .then((res) => {
      switch (res.status) {
        case 404:
          throw `${res.status}: Not Found  ${res?.statusText}`;
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
          `Error API (GET) 400 Bad Request`,
          `searchParams: ${searchParams}`,
          API_URL,
          endPoint,
          data?.error,
        );
      }
      
      return {
        data: data?.data || data,
        meta: data?.meta,
        error: data?.error,
      };
    })
    .catch((err: any) => {
      sendLogError(
        `Error API (GET) ${err}`,
        `searchParams: ${searchParams}`,
        API_URL,
        endPoint,
        err,
      );

      return {
        data: null,
        error: err || {
          message: "Terjadi Kesalahan",
        },
      };
    });

  return res;
};
