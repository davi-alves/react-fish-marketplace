import React from 'react'

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

export default AddFishForm
