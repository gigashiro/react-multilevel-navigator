import * as React from 'react'
import classnames from 'classnames'
import styles from './Wrapper.module.scss'

interface IWrapper {
  className?: string
}
const Wrapper: React.FunctionComponent<IWrapper> = ({ children, className }) => {
  return <div className={classnames(styles.wrapper, className)}>{children}</div>
}

export default Wrapper
