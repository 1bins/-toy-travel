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

export interface MockData {
    id?: number;
    contentType?: number;
    title: string;
    imageUrl: string;
}