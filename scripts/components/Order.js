import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

import helpers from '../helpers'

/*
  Order
 */

const Order = ({ fishes, order, removeFromOrder }) => {
  let orderIds = Object.keys(order)
  let total = orderIds.reduce((prevTotal, key) => {
    let fish = fishes[key]
    let isAvailable = fish && fish.status === 'available'
    if (fish && isAvailable) {
      let amount = order[key]

      return prevTotal + (amount * parseInt(fish.price, 10) || 0)
    }

    return prevTotal
  }, 0)
  let removeButton = (key) => <button onClick={removeFromOrder.bind(null, key)}>&times;</button>

  return (
    <div className='order-wrap'>
      <h2 className='order-title'>Your Order</h2>
      <CSSTransitionGroup
        className='order'
        transitionName='order'
        component='ul'
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {orderIds.map((key) => {
          let fish = fishes[key]
          let amount = order[key]
          let isAvailable = fish && fish.status === 'available'
          if (!fish || !isAvailable) {
            return <li key={key}>Sorry, fish no loger available! {removeButton(key)}</li>
          }

          return (
            <li key={key}>
              <span>
                <CSSTransitionGroup
                  transitionName='count'
                  component='span'
                  transitionEnterTimeout={250}
                  transitionLeaveTimeout={250}
                >
                  <span key={amount}>{amount}</span>
                </CSSTransitionGroup>
                lbs {fish.name} {removeButton(key)}
              </span>
              <span className='price'>{helpers.formatPrice(fish.price * amount)}</span>
            </li>
          )
        })}

        <li className='total'>
          <strong>Total: </strong>
          {helpers.formatPrice(total)}
        </li>
      </CSSTransitionGroup>
    </div>
  )
}

Order.propTypes = {
  order: React.PropTypes.object.isRequired,
  fishes: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
}

export default Order
