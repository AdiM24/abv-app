import { Container } from "@mui/material"

const SidenavPageContainer = ({ props, children }: any) => {
    const drawerWidth = 240;

    return (
        <Container sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
            {children}
        </Container>
    )
}

export default SidenavPageContainer;