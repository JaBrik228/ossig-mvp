"use client"

import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { registration } from "@pages/RegistrationPage"

export function makeStore() {
	const store = configureStore({
		reducer: {
			registration,
		},
		devTools: process.env.NODE_ENV !== "production",
	})
	setupListeners(store.dispatch)
	return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
