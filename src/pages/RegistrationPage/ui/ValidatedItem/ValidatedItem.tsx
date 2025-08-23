import type { FormItemProps } from "antd"
import type { NamePath } from "antd/es/form/interface"

import { Form } from "antd"

type VIProps = FormItemProps & { name: NamePath }

export const ValidatedItem: React.FC<VIProps> = ({
	name,
	children,
	...props
}) => {
	return (
		<Form.Item shouldUpdate noStyle>
			{(form) => {
				const errors = form.getFieldError(name)
				const hasError = errors.length > 0

				return (
					<Form.Item
						name={name}
						validateStatus={hasError ? "error" : undefined}
						help={hasError ? errors[0] : " "}
						validateTrigger={"onBlur"}
						{...props}
					>
						{children}
					</Form.Item>
				)
			}}
		</Form.Item>
	)
}
