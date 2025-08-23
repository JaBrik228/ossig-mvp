import { ReactNode } from "react"

import "@ant-design/v5-patch-for-react-19"

import { StoreProvider, ThemeProvider } from "./providers"

interface IProps {
	children?: ReactNode
}

export default function App({ children }: IProps) {
	return (
		<StoreProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</StoreProvider>
	)
}
