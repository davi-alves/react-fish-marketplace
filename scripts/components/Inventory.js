import React from 'react'

import AddFishForm from './AddFishForm'

/*
  Inventory
 */

const Inventory = (props) => (
  <div>
    <h2>Inventory</h2>
    {Object.keys(props.fishes).map((key) => {
      return (
        <div className='fish-edit' key={key}>
          <input type='text'
            value={props.fishes[key].name}
            onChange={props.handlePropChanged('fishes', key, 'name')} />
          <input type='text'
            value={props.fishes[key].price}
            onChange={props.handlePropChanged('fishes', key, 'price')} />
          <select value={props.fishes[key].status} onChange={props.handlePropChanged('fishes', key, 'status')}>
            <option value='available'>Fresh!</option>
            <option value='unavailable'>Sold Out!</option>
          </select>
          <textarea
            value={props.fishes[key].desc}
            onChange={props.handlePropChanged('fishes', key, 'desc')}></textarea>
          <input type='text'
            value={props.fishes[key].image}
            onChange={props.handlePropChanged('fishes', key, 'image')} />
          <button onClick={props.removeFish.bind(null, key)}>Remove Fish</button>
        </div>
      )
    })}
    <AddFishForm {...props} />
    <button onClick={props.loadSamples.bind(null)}>Load Sample Fishes</button>
  </div>
)

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  handlePropChanged: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func
}

export default Inventory
