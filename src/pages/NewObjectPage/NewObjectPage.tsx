import { BubleCard } from "@shared/ui"
import { Flex } from "antd"
import { JSX } from "react"


export const NewObjectPage = (): JSX.Element => {
  return (
    <BubleCard>
      <Flex justify={ 'space-between' }>
        <div>
          fields side
        </div>

        <div>
          map side
        </div>
      </Flex>
    </BubleCard>
  )
}
