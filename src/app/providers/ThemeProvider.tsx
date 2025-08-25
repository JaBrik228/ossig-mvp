import { ReactNode } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"

interface IProps {
	children?: ReactNode
}

export default function ThemeProvider ({ children }: IProps) {
	return (
		<AntdRegistry>
			<ConfigProvider
				theme={ {
					components: {
						Layout: {
							headerPadding: '1rem',
							headerBg: '#fff',
							colorBgBase: 'white',
							colorBgContainer: 'white',
							colorBgLayout: 'white',
							siderBg: 'white',
						},


						// Card: {
						// 	borderRadiusLG: 56,
						// },
					},
				} }
			>
				{ children }
			</ConfigProvider>
		</AntdRegistry>
	)
}
