import React, { FunctionComponent } from 'react'

import './Marble.css'
import { Marble, MarbleColor } from '../state/models'

const colors = {
  [MarbleColor.None]: 'ball',
  [MarbleColor.Red]: 'ball-red',
  [MarbleColor.Green]: 'ball-green',
  [MarbleColor.Blue]: 'ball-blue',
  [MarbleColor.Yellow]: 'ball-yellow'
}

const classNameFor = (marble: Marble) => marble.showColor ? colors[marble.color] : 'ball'

interface MarbleProps {
  marble: Marble;
}

const MarbleComponent: FunctionComponent<MarbleProps> = ({ marble }) => (
  <svg viewBox="0 0 48 48" width="48" height="48">
    <circle cx="24" cy="24" r="20" className={classNameFor(marble)} />
    <circle cx="16" cy="16" r="6" className="ball-glow" />
  </svg>
)

export default MarbleComponent
