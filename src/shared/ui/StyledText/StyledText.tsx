"use client"

import { DetailedHTMLProps, HtmlHTMLAttributes, JSX } from "react"

import { Space } from "antd"
import { SpaceProps } from "antd/lib"
import { clsx } from "clsx"

import styles from "./StyledText.module.scss"

export const Text = () => {
	return null
}

interface WrapperProps
	extends DetailedHTMLProps<
		HtmlHTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	variant?: "start" | "center" | "end"
}

function Wrapper({
	children,
	variant = "start",
	className,
	...props
}: WrapperProps): JSX.Element {
	return (
		<div
			className={clsx(styles.wrapper, styles[`variant-${variant}`], className)}
			{...props}
		>
			{children}
		</div>
	)
}

interface TextProps
	extends DetailedHTMLProps<
		HtmlHTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	color?: "primary" | "secondary" | "light" | "error"
}

function Bold({ children, color = "primary", ...props }: TextProps) {
	return (
		<p
			className={clsx(styles.p, styles.bold, styles[`${color}-color`])}
			{...props}
		>
			{children}
		</p>
	)
}

function Regular({ children, color = "primary", ...props }: TextProps) {
	return (
		<p
			className={clsx(styles.p, styles.regular, styles[`${color}-color`])}
			{...props}
		>
			{children}
		</p>
	)
}

function Light({ children, color = "primary", ...props }: TextProps) {
	return (
		<p
			className={clsx(styles.p, styles.light, styles[`${color}-color`])}
			{...props}
		>
			{children}
		</p>
	)
}

const StyledText = Object.assign(Regular, { Bold, Light, Regular, Wrapper })

function ContentBlock({
	title,
	description,
	direction,
}: {
	title: string
	description: string
	direction?: SpaceProps["direction"]
}) {
	return (
		<Space direction={direction}>
			<StyledText.Bold>{title}</StyledText.Bold>
			<StyledText.Regular>{description}</StyledText.Regular>
		</Space>
	)
}

export { ContentBlock }
export default StyledText
