import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  latitude: 0,
  longitude: 0,
  status: 'pending',
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationPermisstion(state, action: PayloadAction<string>) {
      state.status = action.payload
    },
    setCurrentLocation(state, action: PayloadAction<[number, number]>) {
      state.latitude = action.payload[1]
      state.longitude = action.payload[0]
    },
  },
})

export const {setLocationPermisstion, setCurrentLocation} =
  locationSlice.actions
export default locationSlice.reducer
