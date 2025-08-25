"use client"

import { toggleSideMenu } from "@/entities/SideMenu/model/sideMenuSlice"
import { MenuOutlined } from "@ant-design/icons"
import { useAppDispatch } from "@shared/lib"
import { Button } from "antd"


export const MenuButton = () => {
  const dispatch = useAppDispatch()
  const toggleMenu = () => {
    dispatch(toggleSideMenu())
  }


  return <Button
    type='default'
    icon={ <MenuOutlined /> }
    onClick={ toggleMenu }
  />
}
