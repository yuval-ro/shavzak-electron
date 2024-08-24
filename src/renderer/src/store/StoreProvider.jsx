import { useEffect, useReducer } from 'react'

import * as backend from './backend'
import { createShift } from './shift'
import StoreContext from './StoreContext'
import { ACTION_TYPES } from './CONSTS'

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(
    (oldState, action) => {
      const { type, payload } = action
      const newState = { ...oldState }
      switch (type) {
        case ACTION_TYPES.togglePendingOn: {
          newState.pending = true
          break
        }
        case ACTION_TYPES.togglePendingOff: {
          newState.pending = false
          break
        }
        case ACTION_TYPES.setError: {
          newState.error = payload
          break
        }
        case ACTION_TYPES.setCollection: {
          const { collection, docs } = payload
          if (!oldState?.collections?.[collection]) {
            throw new Error('Invalid collection: ' + JSON.stringify(collection))
          }
          newState.collections[collection] = docs
          break
        }
        case ACTION_TYPES.decShiftIdx: {
          newState.shiftIdx = oldState.shiftIdx - 1
          break
        }
        case ACTION_TYPES.incShiftIdx: {
          newState.shiftIdx = oldState.shiftIdx + 1
          break
        }
        default: {
          throw new Error('Unexpected action type: ' + JSON.stringify(action?.type))
        }
      }
      return newState
    },
    {
      pending: false,
      backendError: null,
      shiftIdx: 0,
      collections: {
        people: [],
        vehicles: [],
        shifts: []
      }
    }
  )

  useEffect(() => {
    async function initialize() {
      // Fetch collections
      for await (const collection of Object.keys(state?.collections)) {
        const docs = await backend.fetch(collection)
        dispatch({ type: ACTION_TYPES.setCollection, payload: { collection, docs } })
      }
      // Create a new shift if needed
      // if (state?.collections?.shifts?.length < 1) {
      //   const shift = createShift()
      //   await backend.put('shifts', shift)
      //   const updated = await backend.fetch('shifts')
      //   dispatch({
      //     type: ACTION_TYPES.setCollection,
      //     payload: { collection: 'shifts', docs: updated }
      //   })
      // }
    }
    initialize()
  }, [])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>{props?.children}</StoreContext.Provider>
  )
}
