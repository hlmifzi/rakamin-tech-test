"use server";
import { cookies } from "next/headers";
import { sendLogError } from "./sendLogError";

const UNAUTHORIZED_ERROR_CODE_STATUS = 401;

const API_URL = process.env.STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const API_URL_FETCH = API_URL + "/api";
const DEFAULT_REVALIDATE = 300; // 5 minutes

type RequestCache =
  | "default"
  | "no-store"
  | "reload"
  | "no-cache"
  | "force-cache"
  | "only-if-cached"
  | string;

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type NextFetchOptions = RequestInit & {
  next?: { tags?: string[]; revalidate?: number };
  cache?: RequestCache;
};

type argsType = {
  tags?: string[];
  revalidate?: number;
  cache?: RequestCache;
  Authorization?: string;
  query?: QueryParams;
}[];

const getOptions = (args: argsType, token?: string): NextFetchOptions => {
  let next: NextFetchOptions["next"] = undefined;
  let cache: Pick<NextFetchOptions, "cache"> = {};
  let authHeader: Record<string, string> = {};


  if (args?.[0]?.tags || args?.[0]?.revalidate) {
    next = {
      ...(args?.[0]?.tags && { tags: args?.[0]?.tags }),
      ...(args?.[0]?.revalidate && { revalidate: args?.[0]?.revalidate }),
    };
  } else {
    next = { revalidate: DEFAULT_REVALIDATE };
  }

  if (args?.[0]?.cache) {
    cache = {
      cache: args?.[0]?.cache || "cache",
    };
  }

  if (token) {
    authHeader = { Authorization: `Bearer ${token}` };
  }

  const options: NextFetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    next,
    ...cache,
    credentials: "include",
  };

  return options;
};

// const readCookieToken = (): string | undefined => cookies().get("accessToken")?.value;

export const SERVER_FETCH = async (endPoint: string, ...args: argsType) => {
  // Prefer cookie accessToken; fallback to STRAPI_API_TOKEN if provided
  // const cookieToken = readCookieToken();
  // const token = cookieToken || API_TOKEN || undefined;
  const token = API_TOKEN || undefined;
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
    .catch((err: unknown) => {
      const errMessage =
        typeof err === "string"
          ? err
          : err instanceof Error
          ? err.message
          : "Unknown error";
      sendLogError(
        `Error API (GET) ${errMessage}`,
        `searchParams: ${searchParams}`,
        API_URL,
        endPoint,
        errMessage,
      );

      return {
        data: null,
        error: errMessage || {
          message: "Terjadi Kesalahan",
        },
      };
    });

  return res;
};
