import "./Button.css";

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export function Button({ onClick, disabled, children }: ButtonProps) {
    return (
        <button className="button" onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
