"use client"

import { JSX, useCallback, useState } from "react"

import Logo from "@/assets/icons/logo.svg"
import { Col, Flex, Form, Row } from "antd"

import { StyledButton, StyledInput, StyledText, SuffixLoader } from "@shared/ui"

import useCurrScreen from "../../lib/registration/useCurrScreen"
import StyledRegCard from "../StyledRegCard/StyledRegCard"
import { ValidatedItem } from "../ValidatedItem/ValidatedItem"
import styles from "./RegistrationForm.module.scss"

interface FieldType {
	companyName?: string
	directorFio?: string
	inn?: string
	ogrn?: string
	email?: string
	phone?: string
	password?: string
	confirmPassword?: string
	regMinstroy?: string
	regRosprirodnadzor?: string
}

type RegistryStubResponse = {
	companyName: string
	directorFio: string
	regMinstroy: string
	regRosprirodnadzor: string
} | null

const mockFetchRegistry = async (
	inn?: string,
	ogrn?: string,
): Promise<RegistryStubResponse> => {
	const innOk = !!inn && /^\d{10}(\d{2})?$/.test(inn)
	const ogrnOk = !!ogrn && /^\d{13}$/.test(ogrn)
	if (!innOk && !ogrnOk) return null

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				companyName: "ООО «Экосфера»",
				directorFio: "Иванов Иван Иванович",
				regMinstroy: "7710-МИНР-2025-000123",
				regRosprirodnadzor: "77-РПН-45-2025/00987",
			})
		}, 600)
	})
}

export default function RegistrationForm(): JSX.Element {
	const [form] = Form.useForm<FieldType>()
	const { nextScreen } = useCurrScreen()
	const handleSubmit = useCallback(() => nextScreen(), [nextScreen])
	const [lookupLoading, setLookupLoading] = useState(false)

	const handleRegistryAutofill = useCallback(async () => {
		const inn = form.getFieldValue("inn")
		const ogrn = form.getFieldValue("ogrn")

		const innOk = !!inn && /^\d{10}(\d{2})?$/.test(inn)
		const ogrnOk = !!ogrn && /^\d{13}$/.test(ogrn)
		if (!innOk || !ogrnOk) return

		setLookupLoading(true)
		try {
			const data = await mockFetchRegistry(inn, ogrn)
			if (data) {
				const current = form.getFieldsValue()
				form.setFieldsValue({
					regMinstroy: data.regMinstroy,
					regRosprirodnadzor: data.regRosprirodnadzor,
					companyName: current.companyName || data.companyName,
					directorFio: current.directorFio || data.directorFio,
				})
			}
		} finally {
			setLookupLoading(false)
		}
	}, [form])

	return (
		<StyledRegCard
			size="default"
			style={{
				margin: "0 auto",
				padding: "24px 32px",
			}}
		>
			<StyledText.Wrapper className={styles.headerWrapper}>
				<Logo />
				<StyledText.Regular className={styles.headerText}>
					Регистрация
				</StyledText.Regular>
			</StyledText.Wrapper>

			<StyledText.Regular className={styles.firstStep}>
				Шаг 1. Заполните данные
			</StyledText.Regular>

			<Form
				form={form}
				name="basic"
				labelAlign="left"
				onFinish={handleSubmit}
				onFinishFailed={({ errorFields }) => {
					if (errorFields?.length)
						form.scrollToField(errorFields[0]!.name, { block: "center" })
				}}
				className={styles.registrationForm}
				colon={false}
				autoComplete="off"
				requiredMark={false}
				validateTrigger="onBlur"
				/** на xs — лейбл сверху, инпут на всю ширину */
				labelCol={{ xs: { span: 24 }, md: { span: 8 } }}
				wrapperCol={{ xs: { span: 24 }, md: { span: 16 } }}
			>
				<Row gutter={[24, 24]}>
					{/* Левая/правая колонка формы: на xs каждая = 100% */}
					<Col xs={24} md={12}>
						<ValidatedItem
							className="inlineItem"
							label="Название компании"
							labelCol={{ xs: { span: 24 }, md: { span: 5 } }}
							wrapperCol={{ xs: { span: 24 }, md: { span: 19 } }}
							name="companyName"
							rules={[{ required: true, message: "Укажите название компании" }]}
						>
							<StyledInput />
						</ValidatedItem>

						{/* ИНН / ОГРН: в ряд на md+, столбцами на xs */}
						<Row gutter={[12, 12]}>
							<Col xs={24} md={12}>
								<ValidatedItem
									className="inlineItem"
									label="ИНН"
									labelCol={{ xs: { span: 24 }, md: { span: 6 } }}
									wrapperCol={{ xs: { span: 24 }, md: { span: 18 } }}
									name="inn"
									rules={[
										{ required: true, message: "Укажите ИНН" },
										{ pattern: /^\d{10}(\d{2})?$/, message: "ИНН: 10–12 цифр" },
									]}
								>
									<StyledInput onBlur={handleRegistryAutofill} />
								</ValidatedItem>
							</Col>

							<Col xs={24} md={12}>
								<ValidatedItem
									className="inlineItem"
									label="ОГРН"
									labelCol={{ xs: { span: 24 }, md: { span: 6 } }}
									wrapperCol={{ xs: { span: 24 }, md: { span: 18 } }}
									name="ogrn"
									rules={[
										{ required: true, message: "Укажите ОГРН" },
										{ pattern: /^\d{13}$/, message: "ОГРН: 13 цифр" },
									]}
								>
									<StyledInput onBlur={handleRegistryAutofill} />
								</ValidatedItem>
							</Col>
						</Row>

						<StyledText.Regular
							style={{
								color: "#7B7B7B",
								margin: "31px 0 21px 0",
								fontSize: 18,
							}}
						>
							Проверьте корректность данных из реестров
						</StyledText.Regular>

						<ValidatedItem
							className="inlineItem"
							label="№ реестра Минстрой РФ"
							labelCol={{ xs: { span: 24 }, md: { span: 7 } }}
							wrapperCol={{ xs: { span: 24 }, md: { span: 17 } }}
							name="regMinstroy"
							rules={[
								{
									required: true,
									message: "Укажите номер в реестре Минстроя РФ",
								},
							]}
						>
							<StyledInput suffix={<SuffixLoader loading={lookupLoading} />} />
						</ValidatedItem>

						<ValidatedItem
							className="inlineItem"
							label="№ реестра Росприроднадзор"
							labelCol={{ xs: { span: 24 }, md: { span: 9 } }}
							wrapperCol={{ xs: { span: 24 }, md: { span: 15 } }}
							name="regRosprirodnadzor"
							rules={[
								{
									required: true,
									message: "Укажите номер в реестре Росприроднадзора",
								},
							]}
						>
							<StyledInput suffix={<SuffixLoader loading={lookupLoading} />} />
						</ValidatedItem>
					</Col>

					<Col xs={24} md={12}>
						<ValidatedItem
							className="inlineItem"
							label="Руководитель"
							labelCol={{ xs: { span: 24 }, md: { span: 4 } }}
							wrapperCol={{ xs: { span: 24 }, md: { span: 20 } }}
							name="directorFio"
							rules={[{ required: true, message: "Укажите ФИО руководителя" }]}
						>
							<StyledInput placeholder="ФИО" />
						</ValidatedItem>

						<Row gutter={[12, 12]}>
							<Col xs={24} md={10}>
								<ValidatedItem
									className="inlineItem"
									label="Почта"
									labelCol={{ xs: { span: 24 }, md: { span: 6 } }}
									wrapperCol={{ xs: { span: 24 }, md: { span: 18 } }}
									name="email"
									rules={[
										{ required: true, message: "Укажите почту" },
										{
											type: "email" as const,
											message: "Неверный формат email",
										},
									]}
								>
									<StyledInput type="email" />
								</ValidatedItem>
							</Col>

							<Col xs={24} md={14}>
								<ValidatedItem
									className="inlineItem"
									label="Телефон"
									labelCol={{ xs: { span: 24 }, md: { span: 6 } }}
									wrapperCol={{ xs: { span: 24 }, md: { span: 18 } }}
									name="phone"
									rules={[
										{ required: true, message: "Укажите телефон" },
										{
											pattern: /^\+?\d[\d\s()-]{9,}$/,
											message: "Неверный формат телефона",
										},
									]}
								>
									<StyledInput type="tel" />
								</ValidatedItem>
							</Col>
						</Row>

						<ValidatedItem
							className="inlineItem"
							label="Пароль"
							labelCol={{ xs: { span: 24 }, md: { span: 3 } }}
							wrapperCol={{ xs: { span: 24 }, md: { span: 21 } }}
							name="password"
							rules={[
								{ required: true, message: "Придумайте пароль" },
								{ min: 6, message: "Пароль не короче 6 символов" },
							]}
						>
							<StyledInput.Password
								onBlur={() => {
									if (form.getFieldValue("confirmPassword")) {
										form.validateFields(["confirmPassword"])
									}
								}}
							/>
						</ValidatedItem>

						<ValidatedItem
							className="inlineItem"
							label="Пароль повторно"
							labelCol={{ xs: { span: 24 }, md: { span: 7 } }}
							wrapperCol={{ xs: { span: 24 }, md: { span: 17 } }}
							name="confirmPassword"
							dependencies={["password"]}
							rules={[
								{ required: true, message: "Повторите пароль" },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value)
											return Promise.resolve()
										return Promise.reject(new Error("Пароли должны совпадать"))
									},
								}),
							]}
						>
							<StyledInput.Password />
						</ValidatedItem>
					</Col>
				</Row>

				<Flex justify="flex-end" style={{ marginTop: 8 }}>
					<StyledButton
						className={styles.button}
						type="primary"
						block
						htmlType="submit"
					>
						Далее
					</StyledButton>
				</Flex>
			</Form>
		</StyledRegCard>
	)
}
