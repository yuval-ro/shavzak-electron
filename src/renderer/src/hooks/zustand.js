/**
 * @file /src/hooks/zustand.js
 */
import { create } from 'zustand'
import moment from 'moment'

const SHIFT_TYPE = Object.freeze({
  6: 'בוקר',
  14: 'צהריים',
  22: 'לילה'
})

function createShift(prevShift) {
  const start = prevShift ? moment(prevShift?.end) : moment().add(1, 'd').startOf('d').add(6, 'h')
  const end = moment(start).add(8, 'h')
  return {
    type: SHIFT_TYPE[start.hours()],
    start: start.toDate(), // IMPORTANT
    end: end.toDate(),
    unavailable: [],
    assigned: {}
  }
}

export const useShiftStore = create((set, get) => ({
  shifts: [],
  idx: 0,
  pending: false,
  initialize: async () => {
    set((state) => ({ ...state, pending: true }))
    let shifts = await window.api.db({ action: 'read', collection: 'shifts' })
    if (shifts?.length < 1) {
      // create a new one
      await window.api.db({ action: 'post', collection: 'shifts', docs: [createShift()] })
      // refetch
      shifts = await window.api.db({ action: 'read', collection: 'shifts' })
    }
    set({
      shifts,
      idx: 0,
      pending: false
    })
  },
  prev: () => {
    const { idx } = get()
    set((state) => ({ ...state, idx: Math.max(idx - 1, 0) }))
  },
  next: async () => {
    let { shifts, idx } = get()
    if (idx + 1 >= shifts?.length) {
      const newShift = createShift(shifts[idx]) // Base off last shift
      await window.api.db({ action: 'post', collection: 'shifts', docs: [newShift] })
      shifts = await window.api.db({ action: 'read', collection: 'shifts' })
      shifts = shifts.sort((a, b) => (moment(a.start) < moment(b.start) ? -1 : 1))
    }
    set((state) => ({ ...state, shifts, idx: idx + 1, pending: false }))
  }
}))
useShiftStore.getState().initialize()
