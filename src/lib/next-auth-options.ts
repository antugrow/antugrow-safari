import { AUTH_SECRET } from "@/env";
import { IApiResponse, IApiEndpoint } from "@/types/Api";
import { LoginFormValues } from "@/types/Forms";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiClient } from "./api-client";
import { AuthOptions } from "next-auth";

const { post } = apiClient;

export const nextAuthOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	secret: AUTH_SECRET,
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.user = user;
			}

			return token;
		},

		async session({ session, token }: any) {
			session.user = token.user;

			return session;
		},
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {},
			async authorize(credentials: LoginFormValues) {
				const { phoneNo, password } = credentials;

				try {
					const resp = await post<IApiResponse>({
						endpoint: IApiEndpoint.LOGIN,
						data: { phoneNo, password },
					});

					// console.log(resp.data, "69");

					if (resp.data?.status === "success") {
						const userInfo = resp.data?.data?.user;
						// check account status
						const notAllowArr = ["suspended", "inactive", "banned", "deleted"];
						if (notAllowArr.includes(userInfo?.user?.accountStatus?.toLowerCase())) {
							throw new Error("Your account has been suspended. Please contact support");
						}
						const token = resp.data?.data?.token;
						const tokenExpiresIn = resp.data?.data?.expiresIn;
						const refreshToken = resp.data?.data?.refreshToken;
						const tokenExpiresAt = new Date();
						tokenExpiresAt.setSeconds(tokenExpiresAt.getSeconds() + Number(tokenExpiresIn));

						const tokenInfo = {
							token,
							tokenExpiresAt,
							refreshToken,
						};

						const newUser = {
							...userInfo.user,
							...tokenInfo,
						};

						const { password, ...rest } = newUser;

						return rest;
					} else {
						throw new Error(resp.data?.msg);
					}
				} catch (err) {
					console.log(err)
					throw new Error(err?.message);
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
	},
};
