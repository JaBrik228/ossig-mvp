import { useDispatch, } from 'react-redux'

// eslint-disable-next-line boundaries/element-types
import { AppDispatch, } from '@app/index'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
