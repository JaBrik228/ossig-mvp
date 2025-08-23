"use client"

import { useMemo } from "react"

import { useAppDispatch, useAppSelector } from "@shared/lib"

import screens from "../../config/screens.config"
import { changeStep } from "../../model/RegistrationSlice"

function useCurrScreen() {
	const currScreenNum = useAppSelector((state) => state.registration.step)
	const dispatch = useAppDispatch()

	const currScreen = useMemo(() => {
		if (!screens[currScreenNum]) {
			throw new Error("Unable to find emotions tracker screen.")
		}

		return screens[currScreenNum]
	}, [currScreenNum])

	function nextScreen() {
		if (currScreenNum + 1 >= screens.length) {
			return
		}

		dispatch(changeStep(currScreenNum + 1))
	}

	function prevScreen() {
		if (currScreenNum <= 0) {
			return
		}

		dispatch(changeStep(currScreenNum - 1))
	}

	return {
		currScreen,
		nextScreen,
		prevScreen,
		currScreenNum,
	}
}

export default useCurrScreen
