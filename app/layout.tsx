import "@app/styles/global.scss"

import type { Metadata } from "next"
import type { ReactNode } from "react"

import { MainContainer } from "@app/MainContainer"
import App from "@app/App"

export const metadata: Metadata = {
	title: "Let's Develop!",
	description: "FSD Template with Next.js by yunglocokid",
}

export default function RootLayout ({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<App>
					<MainContainer>
						{ children }
					</MainContainer>
				</App>
			</body>
		</html>
	)
}
