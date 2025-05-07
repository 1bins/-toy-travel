export interface ButtonProps {
    id?: string;
    type: "button" | "submit" | "reset",
    shape?: string | string[];
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

export interface Location {
    areaCode: number;
    areaName: string;
}

export interface LocationSigungu {
    rnum: number;
    code: string;
    name: string;
}

interface PlaceBase {
    contentid: string;
    contenttypeid: string;
    title: string;
    addr1: string;
    addr2: string;
    booktour: string;
    cat1: string;
    cat2: string;
    cat3: string;
    createdtime: string;
    firstimage: string;
    firstimage2: string;
    cpyrhtDivCd: string;
    mapx: string;
    mapy: string;
    mlevel: string;
    modifiedtime: string;
    tel: string;
    zipcode: string;
}

export interface PlaceResultInfo extends PlaceBase {
    areacode: string;
    sigungucode: string;
}

export interface PlaceDetailInfo extends PlaceBase {
    cpyrhtDivCd: string;
    homepage: string;
    overview: string;
}

export type Place = Pick<PlaceResultInfo, 'title' | 'addr1' | 'firstimage' | 'contentid' | 'contenttypeid'>;

export type LikedPlace = Pick<PlaceDetailInfo, 'title' | 'addr1' | 'firstimage' | 'contentid' | 'contenttypeid'>;

export type PlaceDetail = LikedPlace & Pick<PlaceDetailInfo, 'overview'>;