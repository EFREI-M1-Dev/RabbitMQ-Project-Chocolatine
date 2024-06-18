import React from "react";
import styles from "./_Button.module.scss";
import {Link} from "react-router-dom";
import classNames from "classnames";

const Button = (
    props:
        {
            route?: string;
            children: React.ReactNode,
            style: "primary" | "header" | "activated";
            className?: string;
            onClick?: React.MouseEventHandler<HTMLButtonElement>
            reloadDocument?: boolean;
        }) => {
    const isCurrentPath = props.style === "header" && (window.location.pathname.split("/").pop() === props.route);

    const buttonClassName = classNames(
        styles.button,
        props.style && styles[props.style],
        props.className,
        isCurrentPath && "glow"
    );

    const button = (
        <button
            className={buttonClassName}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )

    if (props.route) {
        return (
            <Link to={props.route} className={styles.link} reloadDocument={props.reloadDocument}>
                {button}
            </Link>
        )
    }
    return (button)
}
export default Button;