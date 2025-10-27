"use server";

import { SERVER_FETCH } from "../SERVER_FETCH";

export const getJobs = async () => {
  const res = await SERVER_FETCH("jobs", { query: { populate: "*", publicationState: "live" } });
  return res?.data || [];
}