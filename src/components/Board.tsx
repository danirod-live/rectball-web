import React, { FunctionComponent } from 'react'

import MarbleComponent from './Marble'
import { Marble, Board } from '../state/models'

interface BoardProps {
  board: Board
}

const BoardRowComponent: FunctionComponent<{ row: Marble[] }> = ({ row }) => (
  <div>
    { row.map(cell => <MarbleComponent marble={cell} key={[cell.x, cell.y, cell.color].join('-')} />) }
  </div>
)

const BoardComponent: FunctionComponent<BoardProps> = ({ board }) => (
  <div>
    { board.map(row => <BoardRowComponent row={row} />) }
  </div>
)

export default BoardComponent
