import { PaletteOptions, createTheme } from "@mui/material";
import { purple, red } from "@mui/material/colors";
// https://www.youtube.com/watch?v=k8m_nLBH4UY

export const palette: PaletteOptions = {
    primary: {
        main: red[400]
    },
    secondary: {
        main: red[700]
    },
    success: {
        main: purple[500]
    },
    background: {
        default: '#fffff',
        paper: '#ffffff'
    }
};
const theme = createTheme({
    palette: palette,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    margin: "8px"
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: palette.background?.default,
                    padding: 10
                }
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: 20,
                    minWidth: 200,
                },

            },
            variants: []
        },
        MuiTypography: {
            styleOverrides: {
                h6: {
                    margin: 20
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {

                    minWidth: 200,
                    margin: 20
                }
            }
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: red[500],
                },
                
            }
        }
    },

})
export default theme