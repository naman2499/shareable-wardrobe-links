import axios from 'axios'
import {
  WARDROBE_ADD_ITEM,
  WARDROBE_REMOVE_ITEM,
} from '../constants/wardrobeConstants'

export const addToWardrobe = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: WARDROBE_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price
    },
  })

  localStorage.setItem('wardrobeItems', JSON.stringify(getState().wardrobe.wardrobeItems))
}

export const removeFromWardrobe = (id) => (dispatch, getState) => {
  dispatch({
    type: WARDROBE_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('wardrobeItems', JSON.stringify(getState().wardrobe.wardrobeItems))
}