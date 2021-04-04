import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isConnectionLost: false,
    isStatusResponseShowed: false,
    statusResponseShowedText: '',
  },
  reducers: {
    showConnectionLost(state) {
      state.isConnectionLost = true
    },
    hideConnectionLost(state) {
      state.isConnectionLost = false
    },
    showStatusResponse(state) {
      state.isStatusResponseShowed = true
    },
    hideStatusResponse(state) {
      state.isStatusResponseShowed = false
    },
    changeStatusResponseText(state, action) {
      state.statusResponseShowedText = action.payload
    }
  }
})

export const {showConnectionLost, hideConnectionLost, showStatusResponse, hideStatusResponse, changeStatusResponseText} = commonSlice.actions
export default commonSlice.reducer
