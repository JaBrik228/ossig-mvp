"use client"

import { Card, CardProps } from "antd"
import clsx from "clsx"

import styles from "./StyledRegCard.module.scss"

export default function StyledRegCard({
	children,
	className,
	...props
}: CardProps) {
	return (
		<Card
			size="default"
			// styles={{ body: { minWidth: "1000px" } }}
			className={clsx(styles.card, className)}
			{...props}
		>
			{children}
		</Card>
	)
}
