"use client"

import { Button } from "antd"
import { ButtonProps } from "antd/lib"
import clsx from "clsx"

import styles from "./StyledButton.module.scss"

export default function StyledButton({ className, ...props }: ButtonProps) {
	return <Button className={clsx(styles.styledButton, className)} {...props} />
}
