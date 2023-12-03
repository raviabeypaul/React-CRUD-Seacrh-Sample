import { Box, BoxProps } from "@mui/system"

type StyledBoxProps = BoxProps & {
    flexDirections : 'column' | 'row'
}
export const StyledBox = (props : StyledBoxProps) => {
    return (<Box style={{display : 'flex', flexDirection : props.flexDirections}}>
        {props.children}
    </Box>)
}