import React from 'react'
import { browserHistory } from 'react-router'

import helpers from '../helpers'

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

export default StorePicker
