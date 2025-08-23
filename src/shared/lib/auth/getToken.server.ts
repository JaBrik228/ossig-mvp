"use server"

import { cookies } from "next/headers"

export default async function getToken() {
	const cook = await cookies()
	return cook.get("jwt")?.value ?? null
}
