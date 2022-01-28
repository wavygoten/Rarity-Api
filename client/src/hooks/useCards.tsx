import { useState, useEffect } from "react";

export function useCards(ref: any) {
	const [width, setWidth] = useState<any>(ref?.current?.offsetWidth);
	useEffect(() => {
		const updateWindowDimensions = () => {
			setWidth(ref?.current?.offsetWidth);
		};
		window.addEventListener("resize", updateWindowDimensions);
		window.addEventListener("load", updateWindowDimensions);
		window.addEventListener("click", updateWindowDimensions);
		return () => {
			window.removeEventListener("resize", updateWindowDimensions);
			window.removeEventListener("load", updateWindowDimensions);
			window.removeEventListener("click", updateWindowDimensions);
		};
	}, [ref]);

	return width;
}

// --breakpoint-xs: 0;
// --breakpoint-sm: 576px;
// --breakpoint-md: 768px;
// --breakpoint-lg: 992px;
// --breakpoint-xl: 1200px;
