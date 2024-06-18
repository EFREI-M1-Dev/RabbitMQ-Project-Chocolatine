import styles from "./_Header.module.scss";
import {useEffect, useState} from "react";
import Button from "../Button/Button.tsx";

const Header = () => {
    const [widthScrollBar, setWidthScrollBar] = useState(0);

    const handleScroll = () => {
        const scrollBar = document.querySelector(`.${styles.scrollBar}`);
        if (scrollBar) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const width = window.scrollY / scrollHeight * 100;
            setWidthScrollBar(width);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.section}>
            </div>
                <div className={styles.section}>
                    <Button route={"/"} style={"header"}>Home</Button>
                    <Button route={"login"} style={"header"}>Login</Button>
                    <Button route={"register"} style={"header"}>Register</Button>
                </div>
                <div className={styles.section}>

                </div>
            <div className={styles.scrollBar} style={{width: `${widthScrollBar}%`}}></div>
        </div>
    );
}
export default Header;