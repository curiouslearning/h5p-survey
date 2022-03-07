import React from 'react'
import styles from './Spinner.css'

const Spinner = ( props: any ) => {
  console.log(styles.loader)
  const header = props.text ? <h4>{props.text}</h4> : null
  return (
    <div >
      {header}
      <div className={styles.loader} style={{ height: props.size, width: props.size }} />
    </div>
  )
}

export default Spinner;
