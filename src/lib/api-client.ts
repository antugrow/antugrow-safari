import { IMethodParams, getEndpoint } from "@/types/Api";
import axiosClient from "./axiosClient";
import { RequestHeader } from "@/types/RequestHeader";

export const apiClient = {
  /**
   * @param endpoint - The endpoint to call
   * @param data - The data to send to the endpoint
   * @param checkAuth - If true, the request will be sent with the firebase auth token
   * @example
   * ```ts
   * // for endpoints that require auth
   * const { data } = await post({
   *  endpoint: 'user/1',
   *  data: { name: 'test' }
   * });
   * ```
   * @example
   * ```ts
   * // for endpoints that don't require auth
   * const { data } = await post({
   *    endpoint: 'user/1',
   *    data: { name: 'test' },
   *    checkAuth: false
   * });
   * ```
   */
  post: async <T = any>({ endpoint, data, checkAuth = true }: IMethodParams) =>
    axiosClient.post<T>(getEndpoint(endpoint), data, {
      headers: {
        "Content-Type": "application/json",
        [RequestHeader.AUTHORIZATION]: checkAuth,
      },
    }),

  /**
   * @param endpoint - The endpoint to call
   * @param checkAuth - If true, the request will be sent with the firebase auth token
   * @param signal - (optional) the abortcontroller signal used to hanle cleanup of request in useEfffects
   * @param queryParams - (optional) any query parameters needed for the endpoints
   * @example
   * ```ts
   * // for endpoints that require auth
   * const { data } = await get({
   *    endpoint: 'user/1',
   * });
   * ```
   * @example
   * ```ts
   * // for endpoints that don't require auth
   * const { data } = await get({
   *    endpoint: 'user/1',
   *    checkAuth: false
   * });
   *
   * ```
   * @example
   * ```ts
   * // for endpoints that require query params
   * const { data } = await get({
   *    endpoint: 'users/',
   *    queryParams: {limit: 10},
   *    checkAuth = false
   * });
   *
   * ```
   */
  get: async <T = any>({
    endpoint,
    queryParams,
    signal,
    checkAuth = true,
  }: IMethodParams) =>
    axiosClient.get<T>(getEndpoint(endpoint), {
      params: queryParams,
      headers: {
        "Content-Type": "application/json",
        [RequestHeader.AUTHORIZATION]: checkAuth,
      },
      signal,
    }),
};
