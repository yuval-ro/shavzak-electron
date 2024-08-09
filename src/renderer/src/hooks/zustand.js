/**
 * @file /src/hooks/zustand.js
 */
import { create } from 'zustand'

const SHIFT_TYPE = Object.freeze({
  6: 'morning',
  14: 'noon',
  22: 'night'
})

function createShift(hour) {
  const start = new Date()
  start.setDate(start.getDate() + 1)
  start.setHours(hour, 0, 0, 0)
  const end = new Date(start)
  end.setHours(start.getHours() + 8, 0, 0, 0)
  return {
    type: SHIFT_TYPE[hour],
    start,
    end,
    available: [],
    assigned: {}
  }
}

export const useShiftStore = create((set, get) => ({
  shifts: [],
  idx: 0,
  shift: null,
  initialize: async () => {
    let shifts = await window.api.db({ action: 'read', collection: 'shifts' })
    if (shifts?.length < 1) {
      shifts = await window.api.db({ action: 'post', collection: 'shifts', docs: [createShift(6)] })
      shifts = await window.api.db({ action: 'read', collection: 'shifts' }) // Confirm insertion
    }
    set({
      shifts,
      shift: shifts[0],
      idx: 0
    })
  },
  prev: () => {
    const { shifts, idx } = get()
    if (idx - 1 >= 0) {
      set((state) => ({ ...state, idx: idx - 1, shift: shifts[idx - 1] }))
    }
  },
  next: () => {
    const { shifts, idx } = get()
    if (idx + 1 < shifts?.length) {
      set((state) => ({ ...state, idx: idx + 1, shift: shifts[idx + 1] }))
    }
  }
}))
