export {};
interface Navigator {
	msSaveBlob(blob: Blob, fileName: string): boolean;
}

declare global {
	interface Window {
		ethereum: any;
	}
}
