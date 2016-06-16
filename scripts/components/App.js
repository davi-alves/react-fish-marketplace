import React from 'react'
import Rebase from 're-base'

import Header from './Header'
import FishList from './FishList'
import Order from './Order'
import Inventory from './Inventory'
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

  removeFish (key) {
    if (!window.confirm('Are you sure?')) {
      return
    }

    this.state.fishes[key] = null
    this.setState({ fishes: this.state.fishes })
  }

  loadSamples () {
    this.setState({
      fishes: require('../sample-fishes')
    })
  }

  addToOrder (index) {
    this.state.order[index] = this.state.order[index] + 1 || 1
    this.setState({ order: this.state.order })
  }

  removeFromOrder (key) {
    delete this.state.order[key]
    this.setState({ order: this.state.order })
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
          <FishList
            fishes={this.state.fishes}
            addToOrder={this.addToOrder.bind(this)}
          />
        </div>
        <Order
          order={this.state.order}
          fishes={this.state.fishes}
          removeFromOrder={this.removeFromOrder.bind(this)}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish.bind(this)}
          removeFish={this.removeFish.bind(this)}
          handlePropChanged={this.handlePropChanged.bind(this)}
          loadSamples={this.loadSamples.bind(this)}
        />
      </div>
    )
  }
}

export default App
