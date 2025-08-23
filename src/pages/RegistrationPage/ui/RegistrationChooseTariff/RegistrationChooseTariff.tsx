"use client"

import { JSX, useCallback } from "react"

import Logo from "@/assets/icons/logo.svg"
import { Checkbox, Form, Popover, PopoverProps, Statistic } from "antd"
import { useRouter } from "next/navigation"

import { toPriceFormat } from "@shared/lib"
import { StyledButton, StyledText } from "@shared/ui"

import StyledRegCard from "../StyledRegCard/StyledRegCard"
import styles from "./RegistrationChooseTariff.module.scss"

interface FieldType {
	tariff: string[]
}

const tariffsInfo = {
	basic: {
		price: 500,
		info: (
			<p>
				Доступны сервисы для получения цифрового талона <br /> и доступа к ЛК
				РГИС ОССиГ региона.
			</p>
		),
	},
	advanced: {
		price: 1000,
		info: (
			<p>
				Доступны сервисы для работы в РГИС ОССиГ <br /> и дополнительные сервисы
				(автозаполнение талонов, <br /> аналитика, контроль штрафов — интеграция
				с системами ГИБДД и Ростехнадзора).
			</p>
		),
	},
	premium: {
		price: 2000,
		info: (
			<ul style={{ margin: 0, paddingLeft: "2rem" }}>
				<li>Модуль интеграции к внешнему ЕРП;</li>
				<li>Аналитика;</li>
				<li>Биржа вторсырья;</li>
				<li>Приоритетный вывоз;</li>
				<li>
					Предиктивный прогноз по заявкам (при условии интеграции с внутренними
					данными по ЕРП);
				</li>
			</ul>
		),
	},
}

type TariffKey = keyof typeof tariffsInfo

const popupStyles: PopoverProps["styles"] = {
	body: { maxWidth: "30vw" },
}

export default function RegistrationChooseTariff(): JSX.Element {
	const [form] = Form.useForm<FieldType>()
	const tariffValue = Form.useWatch("tariff", form) as TariffKey[] | undefined

	const router = useRouter()

	const handleSubmit = useCallback(() => {
		router.push("/login")
	}, [router])

	return (
		<StyledRegCard
			size="default"
			style={{
				borderRadius: 50,
				padding: "61px 84px 17px 68px",
			}}
		>
			<StyledText.Wrapper className={styles.headerWrapper}>
				<Logo />
				<StyledText.Regular className={styles.headerText}>
					Регистрация
				</StyledText.Regular>
			</StyledText.Wrapper>

			<StyledText.Regular className={styles.firstStep}>
				Шаг 2. Выберите тариф
			</StyledText.Regular>

			<Form
				form={form}
				name="choose-tariff"
				onFinish={handleSubmit}
				className={styles.registrationForm}
				autoComplete="off"
				colon={false}
				scrollToFirstError
			>
				{/* Тарифы: checkbox как radio + валидация (требуется 1 выбранный) */}
				<Form.Item<FieldType>
					name="tariff"
					noStyle
					rules={[
						{
							required: true,
							type: "array",
							min: 1,
							message: "Выберите тариф",
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
							form.setFieldsValue({ tariff: last ? [last] : [] }) // только один выбранный
						}}
					>
						<Checkbox value="basic">
							<Popover
								placement="bottom"
								content={
									<span className={styles.myPopover}>
										{tariffsInfo.basic.info}
									</span>
								}
							>
								Базовый
							</Popover>
						</Checkbox>

						<Checkbox value="advanced">
							<Popover
								placement="bottom"
								styles={popupStyles}
								content={
									<span className={styles.myPopover}>
										{tariffsInfo.advanced.info}
									</span>
								}
							>
								Расширенный
							</Popover>
						</Checkbox>

						<Checkbox value="premium">
							<Popover
								placement="bottom"
								styles={popupStyles}
								title={
									<span className={styles.myPopover}>
										Дополнительные сервисы
									</span>
								}
								content={
									<span className={styles.myPopover}>
										{tariffsInfo.premium.info}
									</span>
								}
							>
								Премиум
							</Popover>
						</Checkbox>
					</Checkbox.Group>
				</Form.Item>

				<Form.Item style={{ marginBottom: "0.5rem", flex: "auto" }}>
					<Statistic
						value={`${
							tariffValue && tariffValue[0]
								? toPriceFormat(tariffsInfo[tariffValue[0]].price)
								: 0
						} Рублей`}
						valueStyle={{
							color: "black",
							fontSize: "48px",
							fontWeight: 600,
							width: "100%",
						}}
						precision={2}
					/>
				</Form.Item>

				<StyledButton
					className={styles.button}
					type="primary"
					block
					htmlType="submit"
				>
					Подать заявление на регистрацию
				</StyledButton>

				{/* Кастомный вывод ошибки возле кнопки */}
				<Form.Item shouldUpdate noStyle>
					{() => {
						const errors = form.getFieldError("tariff")
						return errors.length ? (
							<div style={{ marginTop: 8 }}>
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

				<StyledText.Regular
					style={{
						marginTop: "40px",
						color: "#7B7B7B",
						fontWeight: "400",
						fontSize: "20px",
					}}
				>
					Проверка документов для регистрации в системе занимает <br />
					24 часа, вам придет уведомление на ваш почтовый адрес
					i.ivanov@gmail.com
				</StyledText.Regular>
			</Form>
		</StyledRegCard>
	)
}
