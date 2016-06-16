import React from 'react'

import helpers from '../helpers'

const Fish = ({ index, fish, addToOrder }) => {
  let isAvailable = fish.status === 'available'
  let buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'

  return (
    <li className='menu-fish'>
      <img src={fish.image} alt={fish.name}/>
      <h3 className='fish-name'>
        {fish.name}
        <span className='price'>{helpers.formatPrice(fish.price)}</span>
      </h3>
      <p>{fish.desc}</p>
      <button
        disabled={!isAvailable}
        onClick={() => addToOrder(index)}>{buttonText}</button>
    </li>
  )
}

Fish.propTypes = {
  index: React.PropTypes.string.isRequired,
  fish: React.PropTypes.object.isRequired,
  addToOrder: React.PropTypes.func.isRequired
}

export default Fish
