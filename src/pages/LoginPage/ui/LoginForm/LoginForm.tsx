"use client"

import { JSX } from "react"

import TapIcon from "@/assets/icons/tap-icon.svg"
import logo from "@/assets/icons/text-logo.png"
import { Card, Flex, Form } from "antd"
import { useRouter } from "next/navigation"

import { saveToken } from "@shared/lib"
import { StyledButton, StyledInput, StyledText } from "@shared/ui"

import styles from "./LoginForm.module.scss"

interface FieldType {
	email?: string
	username?: string
	password?: string
}

export default function LoginForm(): JSX.Element {
	const [form] = Form.useForm<FieldType>()

	const router = useRouter()

	const onSignIn = () => {
		const jwt = "fdsjkfjkjk543654^545"

		saveToken(jwt)

		router.replace("/")
	}

	const redirectToRegistrationPage = () => {
		router.push("/registration")
	}

	return (
		<div className={styles.cardWrapper}>
			<Card className={styles.cardBody}>
				<div className={styles.imgWrapper}>
					<img src={logo.src} className={styles.img} />
				</div>

				<Form<FieldType>
					form={form}
					className={styles.loginForm}
					onFinish={onSignIn}
				>
					<Form.Item<FieldType> name="email">
						<StyledInput placeholder="E-mail" type="email" />
					</Form.Item>
					<Form.Item<FieldType> name="password">
						<StyledInput.Password placeholder="Пароль" />
					</Form.Item>

					<Form.Item style={{ marginTop: "64px" }}>
						<Flex className={styles.buttonsWrapper} gap={"34px"}>
							<StyledButton
								type="primary"
								block
								htmlType="submit"
								style={{ boxShadow: "none" }}
							>
								Войти
							</StyledButton>
							<StyledButton
								type="default"
								block
								onClick={redirectToRegistrationPage}
							>
								Зарегистрироваться
							</StyledButton>
						</Flex>
					</Form.Item>
				</Form>
				<Flex style={{ marginTop: "90px" }} align="center" gap={"15px"}>
					<Flex justify="center" align="center" className={styles.iconWrapper}>
						<TapIcon />
					</Flex>
					<StyledText.Regular
						style={{
							fontSize: "19px",
						}}
						color="light"
					>
						Демо-режим
					</StyledText.Regular>
				</Flex>
			</Card>
		</div>
	)
}
