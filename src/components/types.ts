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

export interface FullPlaceInfo {
    contentid: string;
    contenttypeid: string;
    title: string;
    addr1: string;
    addr2: string;
    areacode: string;
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
    sigungucode: string;
    tel: string;
    zipcode: string;
}

export type Place = Pick<FullPlaceInfo, 'title' | 'addr1' | 'firstimage' | 'contentid' | 'contenttypeid'>

export interface MockData {
    id?: number;
    contentType?: number;
    title: string;
    imageUrl: string;
}