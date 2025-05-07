import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Place} from "@/components/types.ts";

interface LikedState {
  likedPlaces: Place[];
}

const initialState: LikedState = {
  likedPlaces: JSON.parse(localStorage.getItem('likedPlaces') || '[]'),
};

const likedSlice = createSlice({
  name: 'likedData',
  initialState,
  reducers: {
    // 즐겨찾기 추가
    addPlace(state, action: PayloadAction<Place>) {
      const isExist = state.likedPlaces.some((item) => item.contentid === action.payload.contentid);
      if (!isExist) {
        state.likedPlaces.push(action.payload);
        localStorage.setItem('likedPlaces', JSON.stringify(state.likedPlaces));
      }
    },
    // 즐겨찾기 삭제
    removePlace(state, action: PayloadAction<string>){
      state.likedPlaces = state.likedPlaces.filter((item) => item.contentid !== action.payload)
      localStorage.setItem('likedPlaces', JSON.stringify(state.likedPlaces));
    },
    // 전체 삭제
    removePlaceAll(state) {
      state.likedPlaces = [];
      localStorage.removeItem('likedPlaces');
    }
}
});

export const {addPlace, removePlace, removePlaceAll} = likedSlice.actions;
export default likedSlice.reducer;