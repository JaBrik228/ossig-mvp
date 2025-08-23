"use client"

import { useDispatch } from "react-redux"

function useAppDispatch() {
	return useDispatch<AppDispatch>()
}

export default useAppDispatch
