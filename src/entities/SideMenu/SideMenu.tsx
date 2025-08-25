'use client'


import { Drawer, Menu, } from 'antd'
import { JSX, } from 'react'


import { toggleSideMenu, } from './model/sideMenuSlice'
import { useMenuItems } from './lib/hooks/useMenuItems/useMenuItems'
import { useAppDispatch, useAppSelector } from '@shared/lib'






export const SideMenu = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(store => store.sideMenu.isOpen)
  const { menuItems, currentMenuKey, } = useMenuItems()


  return (
    <Drawer
      closeIcon={ null }
      style={ {
        backgroundColor: 'rgba(41, 157, 146, 1)',
        borderRadius: '0 68px 68px 0',
        padding: '8rem 0',
        maxWidth: '22.6875rem',
      } }
      styles={ {
        mask: { backgroundColor: 'transparent', },
        wrapper: { boxShadow: 'none', },
        body: { padding: 0, },
        footer: { padding: 0, },
      } }
      placement={ 'left' }
      open={ isOpen }
      onClose={ () => dispatch(toggleSideMenu()) }
    >
      <Menu
        style={ {
          height: '100%',
          backgroundColor: 'rgba(41, 157, 146, 1)',
        } }
        mode="inline"
        items={ menuItems }
        selectedKeys={ [ currentMenuKey, ] }
      />
    </Drawer>
  )
}
