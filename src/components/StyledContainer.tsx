import { Container, ContainerProps } from "@mui/system"

export const StyledContainer = (props : ContainerProps) => {
    return (<Container maxWidth='xl'>
        {props.children}
    </Container>)
}