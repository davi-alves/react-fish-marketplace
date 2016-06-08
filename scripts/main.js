import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import helpers from './helpers.js'

/*
  App
 */

const App = () => (
  <div className='catch-of-the-day'>
    <div className='menu'>
      <Header tagline='Fresh Seafood Market'/>
    </div>
    <Order/>
    <Inventory/>
  </div>
)

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

const Order = () => (
  <p>Order</p>
)

/*
  Inventory
 */

const Inventory = () => (
  <p>Inventory</p>
)

/*
  StorePicker
 */

class StorePicker extends React.Component {
  render () {
    return (
      <form className='store-selector' onSubmit={this.gotToStore.bind(this)}>
        <h2>Please Enter a Atore</h2>
        <input type='text' ref='storeId' defaultValue={helpers.getFunName()} required/>
        <input type='submit'/>
      </form>
    )
  }

  gotToStore (e) {
    e.preventDefault()
    browserHistory.push(`/store/${this.refs.storeId.value}`)
  }
}

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
