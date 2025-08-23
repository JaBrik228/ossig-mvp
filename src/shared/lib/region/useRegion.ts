import { useEffect, useState } from "react"

import setCookie from "../cookies/setCookie.client"

export default function useRegion() {
	const [region, setRegion] = useState<string | null>(null)

	useEffect(() => {
		const val = localStorage.getItem("region")
		if (val) {
			setRegion(val)
		}
	}, [])

	const saveRegion = (val: string) => {
		localStorage.setItem("region", val)
		setCookie("region", val)
		setRegion(val)
	}

	return { region, saveRegion }
}
