"use client"

import { Card, CardProps } from "antd"
import clsx from "clsx"

import styles from "./StyledRegCard.module.scss"
import { BubleCard } from "@shared/ui"

export default function StyledRegCard ({
	children,
	className,
	...props
}: CardProps) {
	return (
		<BubleCard
			size="default"
			styles={ { body: { minWidth: "1000px" } } }
			className={ clsx(styles.card, className) }
			{ ...props }
		>
			{ children }
		</BubleCard>
	)
}
