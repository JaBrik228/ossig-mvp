// "use client"

// import { useSelector } from "react-redux"

// function useAppSelector<T extends (state: RootState) => ReturnType<T>>(
// 	selector: T,
// ) {
// 	return useSelector<RootState, ReturnType<T>>((state) => selector(state))
// }

// export default useAppSelector




import { useSelector, } from 'react-redux'

// eslint-disable-next-line boundaries/element-types
import { RootState, } from '@app/index'

export const useAppSelector = useSelector.withTypes<RootState>()
