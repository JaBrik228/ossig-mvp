import { Card } from "antd"
import { JSX, ReactNode } from "react"
import type { GetProps } from 'antd';



interface Props extends GetProps<typeof Card> {
  children: ReactNode
}


export const BubleCard = ({
  children,
  ...props
}: Props): JSX.Element => {
  return (
    <Card
      { ...props }
      style={ {
        ...props.style,
        borderRadius: 56,
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
      } }
      variant={ 'borderless' }
    >
      { children }
    </Card>
  )
}
