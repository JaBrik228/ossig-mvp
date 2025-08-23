declare global {
	// fsd required
	declare type RootState = import("@app/config/redux/store").RootState
	declare type AppDispatch = import("@app/config/redux/store").AppDispatch
}

export {}
