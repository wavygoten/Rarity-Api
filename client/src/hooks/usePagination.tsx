import { useEffect, useState } from "react";

export function usePagination(data: any, itemsPerPage: number) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const maxPage = Math.ceil(data.length / itemsPerPage);
	function next() {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
	}
	function prev() {
		setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
	}

	function jump(page: any) {
		const pageNumber = Math.max(1, page);
		setCurrentPage(Math.min(pageNumber, maxPage));
	}
	function currentData() {
		const begin = (currentPage - 1) * 15;
		const end = begin + 15;
		return data.slice(begin, end);
	}

	return { next, prev, jump, currentData, currentPage, maxPage };
}
