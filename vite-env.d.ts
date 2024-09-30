/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_DATABASE_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
