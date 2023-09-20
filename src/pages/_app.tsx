import "@/styles/global.css";
import { Nunito } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { AppPropsWithLayout } from "@/types/Layout";
import Head from "next/head";
import AppProviders from "@/AppProviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["200", "300", "400", "600", "700", "800", "900"],
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	const [queryClient] = useState(() => new QueryClient());

	return (
		<main className={nunito.className}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<style>
					{`
          :root {
            --font-nunito: ${nunito.style.fontFamily}, 'Nunito', sans-serif;
          }
          `}
				</style>
				<title>Antugrow</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<AppProviders session={session}>{getLayout(<Component {...pageProps} />)}</AppProviders>
				<Toaster
					toastOptions={{
						duration: 5000,
						style: {
							background: "#363636",
							color: "#fff",
						},
						className: "text-xs md:text-sm ",
						success: {
							duration: 3000,
							// great success toast
							icon: "🎉",
						},
						error: {
							duration: 3000,
							// great error toast
							icon: "👎",
						},
					}}
				/>
			</QueryClientProvider>
		</main>
	);
}

export default appWithTranslation(MyApp);
