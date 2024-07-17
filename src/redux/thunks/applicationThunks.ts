// import {createAsyncThunk} from '@reduxjs/toolkit'
// import {getAppliesRealtime} from '../../firebase/applications.api'
// import {setApplications} from '../slices/applicationSlice'
// import {IPostApplication} from '../../types/applications.type'

// export const loadApplications = createAsyncThunk(
//   'applications/myApplies',
//   async (user_id: string, {dispatch}) => {
//     return new Promise<IPostApplication[]>(resolve => {
//       getAppliesRealtime(user_id, data => {
//         dispatch(setApplications(data))
//         resolve(data)
//       })
//     })
//   },
// )
