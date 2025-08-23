"use client"

import { useSelector } from "react-redux"

function useAppSelector<T extends (state: RootState) => ReturnType<T>>(
	selector: T,
) {
	return useSelector<RootState, ReturnType<T>>((state) => selector(state))
}

export default useAppSelector
