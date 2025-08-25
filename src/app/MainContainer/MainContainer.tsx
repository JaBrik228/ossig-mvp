import { Layout, } from 'antd'
import { Content, Header, } from 'antd/es/layout/layout'
import { JSX, ReactNode, } from 'react'

import { HeaderUserInfo, } from '@/entities/HeaderUserInfo'
import { SideMenu, } from '@/entities/SideMenu'
import { MenuButton, } from '@/features/MenuButton'


import styles from './MainContainer.module.scss'

interface Props {
  children: ReactNode
}


export const MainContainer = ({ children, }: Props): JSX.Element => {
  return (
    <Layout className={ styles.mainLayout }>
      <Header className={ styles.header }>
        <MenuButton />

        <HeaderUserInfo />
      </Header>

      <Layout hasSider>
        <SideMenu />

        <Layout className={ styles.contentLayout }>
          <Content className={ styles.content }>
            { children }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
