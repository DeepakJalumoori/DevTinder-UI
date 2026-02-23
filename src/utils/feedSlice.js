import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state,action) => action.payload,
    removeUserFromFeed: (state,action) =>{
      if (!Array.isArray(state)) return state;
      const targetId = String(action.payload);
      const newFeed = state.filter((user) => String(user?._id ?? user?.id) !== targetId);
      return newFeed;
    },
  }
})

export const {addFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;