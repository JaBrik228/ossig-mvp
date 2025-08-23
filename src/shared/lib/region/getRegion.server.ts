"use server"

import { cookies } from "next/headers"

export default async function getRegion() {
	const cook = await cookies()
	return cook.get("region")?.value ?? null
}
