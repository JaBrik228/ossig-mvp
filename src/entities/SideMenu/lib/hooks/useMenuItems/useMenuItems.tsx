import { useAppDispatch } from "@shared/lib"
import { ItemType, MenuItemType } from "antd/es/menu/interface"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"
import { IconBriefcase, } from '@tabler/icons-react'
import { toggleSideMenu } from "@entities/SideMenu/model/sideMenuSlice"
import DashboardIcon from '@assets/icons/side-menu/dashboard.svg'



interface MenuRoute {
  route: string
  label: string
  icon: ReactNode
  onClick?: () => void
}



const menuRouteList: MenuRoute[] = [ {
  route: `/`,
  label: 'Личный кабинет',
  icon: <IconBriefcase />,
}, {
  route: `/dashboard/`,
  label: 'Интерактивный дашборд',
  icon: <DashboardIcon />,
}, ]




export const useMenuItems = () => {
  const pathname = usePathname()



  const router = useRouter()

  const dispatch = useAppDispatch()






  const menuItems: ItemType<MenuItemType>[] = menuRouteList.map(({ route, label, icon, onClick, }) => ({
    key: route,
    label,
    icon,
    onClick: () => {
      if (onClick) {
        onClick()
      } else {
        router.push(route)
      }

      dispatch(toggleSideMenu())
    },
  }))


  const currentMenuKey = pathname || ''


  return {
    menuItems,
    currentMenuKey,
  }
}
