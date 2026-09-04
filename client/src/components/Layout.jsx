
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = () => {
    // const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

    // // keep localStorage in sync when mode changes
    // useEffect(() => {
    //     if (!mode) {
    //         localStorage.setItem('theme', 'light');
    //         setMode('light');
    //     } else {
    //         localStorage.setItem('theme', mode);
    //     }
    // }, [mode]);

    // // listen for theme changes from other components (Navbar dispatches 'themechange')
    // useEffect(() => {
    //     const onThemeChange = () => {
    //         const newMode = localStorage.getItem('theme') || 'light';
    //         setMode(newMode);
    //     };
    //     window.addEventListener('themechange', onThemeChange);
    //     // also respect storage events (in case other tabs change theme)
    //     window.addEventListener('storage', onThemeChange);
    //     return () => {
    //         window.removeEventListener('themechange', onThemeChange);
    //         window.removeEventListener('storage', onThemeChange);
    //     };
    // }, []);

    return (
        <>
            <Navbar />

            <main
                style={{
                    minHeight: "80vh",
                    padding: "10px",
                    // backgroundColor: mode === 'light' ? 'white' : 'black',
                    // color: mode === 'light' ? 'black' : 'white',
                }}
            >
                <main
                    style={{
                        minHeight: "calc(100vh - 120px)",
                        padding: "10px",
                    }}
                >
                    <Outlet />
                </main>
            </main>

            {/* <Footer /> */}
        </>
    );
};

export default Layout;