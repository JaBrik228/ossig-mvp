"use client"

import { JSX, useCallback } from "react"

import Logo from "@/assets/icons/logo.svg"
import { Checkbox, Flex, Form } from "antd"

import { StyledButton, StyledText } from "@shared/ui"

import useCurrScreen from "../../lib/registration/useCurrScreen"
import StyledRegCard from "../StyledRegCard/StyledRegCard"
import styles from "./RegistrationChooseRole.module.scss"

interface FieldType {
	role: string[]
}

export default function RegistrationChooseRole(): JSX.Element {
	const [form] = Form.useForm<FieldType>()
	const { nextScreen } = useCurrScreen()

	const handleSubmit = useCallback(() => {
		nextScreen()
	}, [nextScreen])

	return (
		<StyledRegCard styles={{ body: { minWidth: "1000px" } }}>
			<Flex justify="center" style={{ flexDirection: "column" }} align="center">
				<Logo />
				<StyledText.Wrapper className={styles.headerWrapper}>
					<StyledText.Regular className={styles.headerText}>
						Выберите роль
					</StyledText.Regular>
				</StyledText.Wrapper>
			</Flex>

			<Form
				form={form}
				name="choose-role"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				labelAlign="left"
				onFinish={handleSubmit}
				className={styles.registrationForm}
				colon={false}
				autoComplete="off"
				scrollToFirstError
			>
				{/* Поле роли с валидацией, но без отображения стандартной ошибки под группой */}
				<Form.Item<FieldType>
					name="role"
					noStyle
					rules={[
						{
							required: true,
							type: "array",
							min: 1,
							message: "Выберите роль",
						},
					]}
				>
					<Checkbox.Group
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "6rem",
							marginTop: "4rem",
						}}
						onChange={(val) => {
							const last = val[val.length - 1]
							form.setFieldsValue({ role: last ? [last] : [] }) // checkbox как radio
						}}
					>
						<Checkbox value="basic">Отходообразаватель</Checkbox>
						<Checkbox value="advanced">Перевозчик</Checkbox>
						<Checkbox value="premium">Утилизатор</Checkbox>
						<Checkbox value="ppp">Переработчик</Checkbox>
					</Checkbox.Group>
				</Form.Item>

				<Form.Item shouldUpdate noStyle>
					{() => {
						const errors = form.getFieldError("role")
						return errors.length ? (
							<div className={styles.submitError} style={{ marginTop: 8 }}>
								<StyledText.Regular
									style={{
										fontSize: "20px",
									}}
									color="error"
								>
									{errors[0]}
								</StyledText.Regular>
							</div>
						) : null
					}}
				</Form.Item>

				<StyledButton
					className={styles.button}
					type="primary"
					block
					htmlType="submit"
				>
					Далее
				</StyledButton>
			</Form>
		</StyledRegCard>
	)
}
