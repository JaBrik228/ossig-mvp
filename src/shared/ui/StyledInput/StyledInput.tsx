import { Input, InputProps } from "antd"
import clsx from "clsx"

import styles from "./StyledInput.module.scss"

const Base = ({ className, ...props }: InputProps) => {
	return <Input className={clsx(styles.input, className)} {...props} />
}
const Password = ({ className, ...props }: InputProps) => {
	return <Input.Password className={clsx(styles.input, className)} {...props} />
}

const StyledInput = Object.assign(Base, { Password })

export default StyledInput
