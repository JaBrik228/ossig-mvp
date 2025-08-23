"use client"

import { JSX } from "react"

import bg from "@/assets/img/register-bg.jpg"

import useCurrScreen from "../../lib/registration/useCurrScreen"
import styles from "./RegistrationPage.module.scss"

export default function RegistrationPage(): JSX.Element {
	const { currScreen } = useCurrScreen()

	return (
		<div
			style={{
				background: `url("${bg.src}") center center/100% 100% no-repeat`,
			}}
			className={styles.registrationWrapper}
		>
			{currScreen}
		</div>
	)
}
