import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Rebase from 're-base'

import helpers from './helpers.js'
const base = Rebase.createClass('https://fk-react4beginners.firebaseio.com/')

/*
  App
 */

class App extends React.Component {
  constructor () {
    super()
    this.state = { fishes: {}, order: {} }
  }

  componentDidMount () {
    let props = this.props
    let order = window.localStorage.getItem(`order-${props.params.storeId}`)
    base.syncState(`/${props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
      then: () => {
        if (order) {
          this.setState({
            order: JSON.parse(order)
          })
        }
      }
    })
  }

  componentWillUpdate (nextProps, nextState) {
    let props = this.props
    window.localStorage.setItem(`order-${props.params.storeId}`, JSON.stringify(nextState.order))
  }

  addFish (fish) {
    let fishes = this.state.fishes
    fishes[(new Date()).getTime()] = fish
    this.setState({ fishes })
  }

  loadSamples () {
    this.setState({
      fishes: require('./sample-fishes')
    })
  }

  addToOrder (index) {
    let order = this.state.order
    order[index] = order[index] + 1 || 1
    this.setState({ order })
  }

  handlePropChanged (prop, id, key) {
    return (event) => {
      let obj = { [prop]: { [id]: { [key]: event.target.value } } }
      this.setState(obj)
    }
  }

  render () {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
          <FishList fishes={this.state.fishes} addToOrder={this.addToOrder.bind(this)} />
        </div>
        <Order order={this.state.order} fishes={this.state.fishes} />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish.bind(this)}
          handlePropChanged={this.handlePropChanged.bind(this)}
          loadSamples={this.loadSamples.bind(this)}
        />
      </div>
    )
  }
}

/*
  Fish
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

/*
 Add fish form
 */

const AddFishForm = ({ addFish }) => (
  <form className='fish-edit' onSubmit={(e) => {
    e.preventDefault()

    let form = e.target
    let newFish = {
      name: form.name.value,
      price: form.price.value,
      status: form.status.value,
      desc: form.desc.value,
      image: form.image.value
    }

    addFish(newFish)
    form.reset()
  }}>
    <input type='text' name='name' placeholder='Fish Name'/>
    <input type='text' name='price' placeholder='Fish Price'/>
    <select name='status'>
      <option value='available'>Fresh!</option>
      <option value='unavailable'>Sold Out!</option>
    </select>
    <textarea name='desc' placeholder='Desc'></textarea>
    <input type='text' name='image' placeholder='URL to Image'/>
    <button type='submit'>+ Add Fish</button>
  </form>
)

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

/*
  Header
 */

const Header = ({ tagline }) => (
  <header className='top'>
    <h1>
      Catch
      <span className='ofThe'>
        <span className='of'>of</span>
        <span className='the'>the</span>
      </span>
      Day
    </h1>
    <h3 className='tagline'><span>{tagline}</span></h3>
  </header>
)

/*
  Order
 */

const Order = ({ fishes, order }) => {
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

  return (
    <div className='order-wrap'>
      <h2 className='order-title'>Your Order</h2>
      <ul className='order'>
        {orderIds.map((key) => {
          let fish = fishes[key]
          let amount = order[key]
          let isAvailable = fish && fish.status === 'available'
          if (!fish || !isAvailable) {
            return <li key={key}>Sorry, fish no loger available!</li>
          }

          return (
            <li key={key}>
              {amount} lbs {fish.name}
              <span className='price'>{helpers.formatPrice(fish.price * amount)}</span>
            </li>
          )
        })}

        <li className='total'>
          <strong>Total: </strong>
          {helpers.formatPrice(total)}
        </li>
      </ul>
    </div>
  )
}

Order.propTypes = {
  order: React.PropTypes.object.isRequired,
  fishes: React.PropTypes.object.isRequired
}

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
        </div>
      )
    })}
    <AddFishForm {...props} />
    <button onClick={() => props.loadSamples()}>Load Sample Fishes</button>
  </div>
)

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  handlePropChanged: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func
}

/*
  StorePicker
 */

const StorePicker = () => (
  <form className='store-selector' onSubmit={(e) => {
    e.preventDefault()
    browserHistory.push(`/store/${e.target.storeId.value}`)
  }}>
    <h2>Please Enter a Atore</h2>
    <input type='text' name='storeId' defaultValue={helpers.getFunName()} required/>
    <input type='submit'/>
  </form>
)

/*
  Not found component
 */
const NotFound = () => <h1>Not Found!</h1>

/*
  Routes
 */

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={StorePicker}/>
    <Route path='/store/:storeId' component={App} />
    <Route path='*' component={NotFound} />
  </Router>
)

render(routes, document.getElementById('main'))
