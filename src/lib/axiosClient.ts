import { API_PREFIX_SERVER, API_PREFIX_UBUNTU_SERVER_NEW } from "@/env";
import { createAxiosClient } from "./createAxiosClient";
import { getSession } from "next-auth/react";

const apiPrefix =
  process.env.NODE_ENV === "development"
    ? API_PREFIX_SERVER
    : API_PREFIX_UBUNTU_SERVER_NEW;

const axiosClient = createAxiosClient({
  options: {
    baseURL: apiPrefix,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  },
  getAuthToken: async () => {
    const session = await getSession();
    if (session) {
      return session.user.token;
    }

    return null;
  },
});

export default axiosClient;
