import styles from "./Button.module.css";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "small" | "medium" | "large";



interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    active?: boolean;
    children: ReactNode;
}

function Button({
    className = "",
    variant = "primary",
    size = "medium",
    fullWidth = false,
    active = false,
    children,
    ...props
}: ButtonProps) {
    const classNames=  [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        active ? styles.active : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <button className={classNames} {...props} >

            {children}
        </button>
    )

}

export default Button;