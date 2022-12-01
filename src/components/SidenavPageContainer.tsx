import { Container } from "@mui/material"

const SidenavPageContainer = ({ props, children }: any) => {
    const drawerWidth = 500;

    return (
        <Container sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }} >
            {children}
        </Container>
    )
}

export default SidenavPageContainer;