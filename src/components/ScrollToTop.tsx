import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to the top of the page whenever the pathname changes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
