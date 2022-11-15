import React from 'react'
import './index.css'

const Progressbar = props => {
  const {spentPercentage} = props

  return (
    <div className="parent-div">
      <div className="child-div" style={{width: `${spentPercentage}%`}}>
        .
      </div>
    </div>
  )
}

export default Progressbar
