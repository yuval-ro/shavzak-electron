import { useContext } from 'react'

import StoreContext from './StoreContext'
import { ACTION_TYPES } from './CONSTS'
import * as backend from './backend'

async function executeAsyncThunk(dispatch, thunk) {
  try {
    dispatch({ type: ACTION_TYPES.togglePendingOn })
    await thunk()
  } catch (err) {
    dispatch({ type: ACTION_TYPES.setError, payload: err }) // Catch Network errors ONLY, rest rethrow
  } finally {
    dispatch({ type: ACTION_TYPES.togglePendingOff })
  }
}
export function useSelector(selector) {
  const { state } = useContext(StoreContext)
  return selector(state)
}
function useMutate(collectionName, operation) {
  const { dispatch } = useContext(StoreContext)
  return (docs) =>
    executeAsyncThunk(dispatch, async () => {
      await backend?.[operation]?.(collectionName, docs)
      const updated = await backend.fetch(collectionName)
      dispatch({
        type: ACTION_TYPES.setCollection,
        payload: { collection: collectionName, docs: updated }
      })
    })
}
export function useCollection(collectionName) {
  return {
    docs: useSelector((state) => state?.collections?.[collectionName]),
    put: useMutate(collectionName, 'put'),
    remove: useMutate(collectionName, 'remove')
  }
}
export function useShifts() {
  const { state, dispatch } = useContext(StoreContext)
  return {
    ...useCollection('shifts'),
    idx: useSelector((state) => state?.shiftIdx),
    next: () =>
      executeAsyncThunk(dispatch, async () => {
        if (state?.data?.shifts?.length < 1) {
          // TODO Create a new one for tomorrow
        }
        dispatch({ type: ACTION_TYPES.incShiftIdx })
      }),
    prev: () =>
      executeAsyncThunk(dispatch, async () => {
        if (state?.data?.shifts?.length < 1) {
          // TODO Fetch from yesterday
          // TODO Array move
        }
        dispatch({ type: ACTION_TYPES.decShiftIdx })
      })
  }
}
