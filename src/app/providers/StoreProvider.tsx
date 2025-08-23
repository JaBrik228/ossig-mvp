"use client"

import { ReactNode } from "react"
import { Provider } from "react-redux"

import { makeStore } from "@app/config"

const store = makeStore()

interface IProps {
	children: ReactNode
}

function StoreProvider({ children }: IProps) {
	return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
