export interface ButtonProps {
    id?: string;
    type: "button" | "submit" | "reset",
    shape?: string | string[];
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}