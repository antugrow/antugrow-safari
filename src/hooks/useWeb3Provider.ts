import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface IWeb3State {
	address: string | null;
	currentChain: number | null;
	signer: JsonRpcSigner | null;
	provider: BrowserProvider | null;
	isAuthenticated: boolean;
}

const useWeb3Provider = () => {
	const initialWeb3State: IWeb3State = {
		address: null,
		currentChain: null,
		signer: null,
		provider: null,
		isAuthenticated: false,
	};

	const [state, setState] = useState(initialWeb3State);

	const connectWallet = useCallback(async () => {
		if (state.isAuthenticated) return;

		try {
			const { ethereum } = window;

			if (!ethereum) {
				toast.error("Please install MetaMask!");
				return;
			}

			const provider = new BrowserProvider(ethereum);

			const accounts: string[] = await provider.send("eth_requestAccounts", []);

			if (accounts.length > 0) {
				const signer = await provider.getSigner();
				const chain = Number(await provider.getNetwork().then((network) => network.chainId));

				setState({
					...state,
					address: accounts[0],
					signer,
					currentChain: chain,
					provider,
					isAuthenticated: true,
				});

				toast.success("Wallet connected!");

				localStorage.setItem("isAuthenticated", "true");
			}
		} catch (err) {}
	}, [state]);

	const disconnectWallet = () => {
		setState(initialWeb3State);
		localStorage.removeItem("isAuthenticated");
	};

	useEffect(() => {
		if (window === null) return;

		if (localStorage.hasOwnProperty("isAuthenticated")) {
			connectWallet();
		}
	}, [connectWallet, state.isAuthenticated]);

	useEffect(() => {
		if (typeof window.ethereum === "undefined") return;

		window.ethereum.on("accountsChanged", (accounts: string[]) => {
			if (accounts.length > 0) {
				setState({
					...state,
					address: accounts[0],
				});
			} else {
				disconnectWallet();
			}
		});

		window.ethereum.on("networkChanged", (networkId: string) => {
			setState({
				...state,
				currentChain: Number(networkId),
			});
		});

		return () => {
			window.ethereum.removeAllListeners();
		};
	}, [state]);

	return { connectWallet, disconnectWallet, state };
};

export default useWeb3Provider;
