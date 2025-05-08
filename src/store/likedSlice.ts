import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Place} from "@/components/types.ts";

interface LikedState {
  likedPlaces: Place[];
  likedHotels: Place[];
}

const initialState: LikedState = {
  likedPlaces: JSON.parse(localStorage.getItem('likedPlaces') || '[]'),
  likedHotels: JSON.parse(localStorage.getItem('likedHotels') || '[]'),
};

const likedSlice = createSlice({
  name: 'likedData',
  initialState,
  reducers: {
    // 즐겨찾기 추가
    addPlace(state, action: PayloadAction<Place>) {
      if (action.payload.contenttypeid === "12") {
        const exists = state.likedPlaces.some(p => p.contentid === action.payload.contentid);
        if (!exists) {
          state.likedPlaces.push(action.payload);
          localStorage.setItem('likedPlaces', JSON.stringify(state.likedPlaces));
        }
      } else {
        const exists = state.likedHotels.some(p => p.contentid === action.payload.contentid);
        if (!exists) {
          state.likedHotels.push(action.payload);
          localStorage.setItem('likedHotels', JSON.stringify(state.likedHotels));
        }
      }
    },
    // 즐겨찾기 삭제
    removePlace(state, action: PayloadAction<{contentid: string; contenttypeid: string}>){
      if (action.payload.contenttypeid === "12") {
        state.likedPlaces = state.likedPlaces.filter(p => p.contentid !== action.payload.contentid);
        localStorage.setItem('likedPlaces', JSON.stringify(state.likedPlaces));
      } else {
        state.likedHotels = state.likedHotels.filter(p => p.contentid !== action.payload.contentid);
        localStorage.setItem('likedHotels', JSON.stringify(state.likedHotels));
      }
    },
    // 전체 삭제
    removePlaceAll(state) {
      state.likedPlaces = [];
      state.likedHotels = [];
      localStorage.removeItem('likedPlaces');
      localStorage.removeItem('likedHotels');
    }
}
});

export const {addPlace, removePlace, removePlaceAll} = likedSlice.actions;
export default likedSlice.reducer;