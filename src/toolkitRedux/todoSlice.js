import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    entities: [],
  },
  reducers: {
    setEntities(state, action) {
      state.entities = action.payload;
    },
    createEntity(state, action) {
      state.entities.push(action.payload);
    },
    updateEntity(state, action) {
      state.entities = state.entities.map(entity => action.payload._id === entity._id ? action.payload : entity);
    },
    deleteEntity(state, action) {
      state.entities = state.entities.filter(entity => action.payload !== entity._id);
    }
  }
})

export const { setEntities, createEntity, updateEntity, deleteEntity, deleteAll } = todoSlice.actions
export default todoSlice.reducer
