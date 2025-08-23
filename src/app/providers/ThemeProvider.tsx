import { ReactNode } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"

interface IProps {
	children?: ReactNode
}

export default function ThemeProvider({ children }: IProps) {
	return (
		<AntdRegistry>
			<ConfigProvider
				theme={{
					components: {
						Card: {
							borderRadiusLG: 56,
						},
					},
				}}
			>
				{children}
			</ConfigProvider>
		</AntdRegistry>
	)
}
