import React, { createContext } from "react";

type ContextProps = {
	Nav_onChange?: React.ChangeEventHandler<HTMLInputElement>;
	Nav_onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	Nav_onMetaMaskClick?: (e: React.MouseEvent<HTMLElement>) => void;
	Nav_walletAddress?: string | undefined;
	Nav_loading?: boolean;
	Stats_collection?:any;
	Stats_contract?: string;
};

export const RarityContext = createContext<ContextProps>({});
