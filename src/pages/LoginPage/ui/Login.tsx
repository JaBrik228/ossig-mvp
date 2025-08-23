"use client"

import { JSX } from "react"

import authBg from "@/assets/img/auth-bg.jpg"

import LoginForm from "./LoginForm/LoginForm"

export default function Login(): JSX.Element {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				background: `url("${authBg.src}") left center / 50% 100% no-repeat`,
			}}
		>
			<LoginForm />
		</div>
	)
}
