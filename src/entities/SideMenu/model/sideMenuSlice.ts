
import { createSlice, } from '@reduxjs/toolkit'


interface State {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    toggleSideMenu: state => {
      state.isOpen = !state.isOpen
    },
  },
})


export const { toggleSideMenu, } = sideMenuSlice.actions
