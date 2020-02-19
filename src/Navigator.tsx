import * as React from 'react'
import Wrapper from './Wrapper'
import { NavItem, NavSelection } from './NavItem'
import moduleStyles from './Navigator.module.scss'

export interface INavigator {
  data: NavItem[]
  clickHandler?: NavigatorHandler
  level?: number
  selected?: NavSelection[]
  styles?: any // @TODO: tipar
}

export type NavigatorHandler = (
  selectedList: NavSelection[],
  event: any,
  id: string|number,
  action?: any,
) => void

export const Navigator: React.FunctionComponent<INavigator> = ({
  data,
  clickHandler,
  level=0,
  selected=[],
  styles={},
}) => {
  const [selectedItems, selectItem] = React.useState(selected)
  const hasSelection = selectedItems.find(item => item.level === level)

  const handleGroup = (
    level: number,
    clickHandler?: NavigatorHandler
  ) =>
    (event: any, id: string|number, action: any) => {
      let selectList
      const currentLevel = selectedItems.find(preSelected => preSelected.level === level)

      if (currentLevel) {
        selectList = selectedItems.filter(preSelected => preSelected.level < level)
      } else {
        selectList = [
          ...selectedItems,
          ...[{ level, value: id }]
        ]
      }
      selectItem(selectList)

      if (clickHandler) clickHandler(selectList, event, id, action)
    }

  return <Wrapper className={hasSelection ? moduleStyles.selectedWrapper : ''}>
    {data.map(
      ({action, id, label, subitems}: NavItem) =>
        <NavItem
          action={action}
          clickHandler={clickHandler}
          id={id}
          itemHandler={handleGroup(
            level,
            clickHandler,
          )}
          key={`${id}`}
          label={label}
          level={level}
          selected={selectedItems}
          styles={styles}
          subitems={subitems}
        />
    )}
    </Wrapper>
}
