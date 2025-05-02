export interface ButtonProps {
    id?: string;
    type: "button" | "submit" | "reset",
    shape?: string | string[];
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

export interface MockData {
    id?: number;
    contentType?: number;
    title: string;
    imageUrl: string;
}