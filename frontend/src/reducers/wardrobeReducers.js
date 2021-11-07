import {
  WARDROBE_ADD_ITEM,
  WARDROBE_REMOVE_ITEM,
  WARDROBE_CLEAR_ITEMS,
} from '../constants/wardrobeConstants'

export const wardrobeReducer = (
  state = { wardrobeItems: [] },
  action
) => {
  switch (action.type) {
    case WARDROBE_ADD_ITEM:
      const item = action.payload

      const existItem = state.wardrobeItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          wardrobeItems: state.wardrobeItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          wardrobeItems: [...state.wardrobeItems, item],
        }
      }
    case WARDROBE_REMOVE_ITEM:
      return {
        ...state,
        wardrobeItems: state.wardrobeItems.filter((x) => x.product !== action.payload),
      }
    case WARDROBE_CLEAR_ITEMS:
      return {
        ...state,
        wardrobeItems: [],
      }
    default:
      return state
  }
}
