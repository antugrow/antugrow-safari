"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { RefineThemes } from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { FC, ReactNode } from "react";
import routerProvider, { UnsavedChangesNotifier } from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
import { authProvider } from "./authProvider";
import { useTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import notificationProvider from "./notificationProvider";
import Web3ContextProvider from "./context/Web3Context";

const API_URL = "https://api.fake-rest.refine.dev";

interface IProps {
	children: ReactNode | ReactNode[];
	session: any;
}

const AppProviders: FC<IProps> = ({ children, session }) => {
	const { t, i18n } = useTranslation();

	const i18nProvider = {
		translate: (key: string, params: object) => t(key, params),
		changeLocale: (lang: string) => i18n.changeLanguage(lang),
		getLocale: () => i18n.language,
	};
	return (
		<>
			<SessionProvider session={session}>
				<NextUIProvider>
					<RefineKbarProvider>
						<ChakraProvider theme={RefineThemes.Purple}>
							<Web3ContextProvider>
								<Refine routerProvider={routerProvider} dataProvider={dataProvider(API_URL)} notificationProvider={notificationProvider} authProvider={authProvider} i18nProvider={i18nProvider}>
									{children}
									<RefineKbar />
									<UnsavedChangesNotifier />
								</Refine>
							</Web3ContextProvider>
						</ChakraProvider>
					</RefineKbarProvider>
				</NextUIProvider>
			</SessionProvider>
		</>
	);
};

export default AppProviders;
