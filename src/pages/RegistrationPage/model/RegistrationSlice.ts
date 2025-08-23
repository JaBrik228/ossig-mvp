import { createSlice, } from '@reduxjs/toolkit'

interface InitialState {
    step: number;
}

const initialState: InitialState = {
  step: 0,
}

export const RegistrationSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    changeStep: (state, action: { payload: InitialState['step'] }) => {
      state.step = action.payload
    },
  },
})

const { reducer, actions, } = RegistrationSlice
export const { changeStep, } = actions
export default reducer
