import {addPlace, removePlace} from "@/store/likedSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {Place} from "@/components/types.ts";
import {useNavigate} from "react-router-dom";

export const useToggleLike = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { likedPlaces, likedHotels } = useSelector((state: RootState) => state.liked);

  const isLiked = (contentid: string, contenttypeid: string) => {
    return contenttypeid === "12"
      ? likedPlaces.some((place) => place.contentid === contentid)
      : likedHotels.some((place) => place.contentid === contentid);
  };

  const toggleLike = (
    {
      data,
      showToast,
      fallbackAlert = true
    }: {
      data: Place,
      showToast: (msg: string) => void,
      fallbackAlert?: boolean,
    }) => {
    const isLike = isLiked(data.contentid, data.contenttypeid);

    if (isLike) {
      dispatch(removePlace({contentid: data.contentid, contenttypeid: data.contenttypeid}));
      showToast('🗑️ 즐겨찾기에서 삭제되었습니다.');
    } else {
      const isHotel = data.contenttypeid !== "12";
      const likedHotelCount = likedHotels.length;

      if (isHotel && likedHotelCount >= 1) {
        if (fallbackAlert) {
          const message = confirm("숙박지는 최대 1개까지만 설정 가능합니다. \n저장된 숙박지로 이동하시겠습니까?");
          const {contentid, contenttypeid} = likedHotels[0];
          if (message) {
           navigate(`/detail/${contentid}/${contenttypeid}`);
          }
        }
        return;
      }

      dispatch(addPlace(data));
      showToast(`${isHotel ? "💛": "💙"} 즐겨찾기에 추가되었습니다. \n 메인에서 확인해보세요!`);
    }
  };

  return { toggleLike, isLiked };
}