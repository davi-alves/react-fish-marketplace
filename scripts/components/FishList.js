import React from 'react'

import Fish from './Fish'

/*
  FishList
 */

const FishList = ({ fishes, addToOrder }) => (
  <ul className='list-of-fishes'>
    {Object.keys(fishes).map((id) => {
      return <Fish index={id} fish={fishes[id]} key={id} addToOrder={addToOrder} />
    })}
  </ul>
)

FishList.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addToOrder: React.PropTypes.func.isRequired
}

export default FishList
