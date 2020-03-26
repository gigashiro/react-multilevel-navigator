import * as React from 'react'
import classnames from 'classnames'
import { Navigator, NavigatorHandler } from './Navigator'
import moduleStyles from './NavItem.module.scss'

export type NavItem = {
  action?: any
  clickHandler?: NavigatorHandler
  className?: string
  close?: string | React.ReactElement
  expand?: string | React.ReactElement
  itemHandler?: ItemHandler
  id: string | number
  label: string | React.ReactElement
  level?: number
  selected?: NavSelection[]
  styles?: any // @TODO: tipar
  subitems?: NavItem[]
}

export interface NavSelection {
  level: number
  value: (string|number)
}

export type ItemHandler = (
  event: any,
  id: string|number,
  action: any,
) => void

const selectItem = (
  id: (string|number),
  action?: any,
  itemHandler?: ItemHandler
) =>
  (event: any) => {
    event.preventDefault()
    if (itemHandler) itemHandler(event, id, action)
  }

export const NavItem: React.FunctionComponent<NavItem> = ({
  action,
  clickHandler,
  className,
  close='-',
  expand='+',
  itemHandler,
  id,
  label,
  level=0,
  selected=[],
  styles={},
  subitems,
}) => {
  const hasSelection = selected.find(item => item.level === level)
  let isSelected

  if (hasSelection) {
    isSelected = hasSelection.value === id
  }

  const selectedItemClass = classnames(moduleStyles.selectedItem, (styles.selectedItem ? styles.selectedItem : ''))
  const hiddenItemClass = classnames(moduleStyles.hiddenItem, (styles.hiddenItem ? styles.hiddenItem : ''))
  const additionalClass = hasSelection ? (isSelected ? selectedItemClass : hiddenItemClass) : ''

  return (
    <>
      <div
        className={classnames(
          moduleStyles.navitem,
          styles[`level-${level}`] ? styles[`level-${level}`] : `level-${level}`,
          additionalClass,
          className,
          (styles.navitem ? styles.navitem : ''),
        )}
        onClick={selectItem(id, action, itemHandler)}
      >
        {label}
        <span className={classnames(
          moduleStyles.expandIcon,
          (styles.expandIcon || ''),
        )} >{isSelected ? close : expand}</span>
      </div>
      {
        isSelected && subitems &&
        <Navigator
          clickHandler={clickHandler}
          close={close}
          expand={expand}
          data={subitems}
          level={level+1}
          selected={selected}
          styles={styles}
        />
      }
    </>
  )
}
