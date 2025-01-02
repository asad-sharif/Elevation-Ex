import { createTheme } from "@mui/material"


export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0, // Covers the range below sm
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        }
    },
    palette: {
        primary: {
            main: '#b91c1c'
        },
        customRed: {
            main: '#b91c1c',
        },
    },
});
