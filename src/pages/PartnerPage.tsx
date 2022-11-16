import { Add, PlusOne } from "@mui/icons-material";
import { Box, Container, IconButton } from "@mui/material";

const PartnerPage = () => {
    const addPartner = () => {
        console.log('clicked');
    };

    return (
        <Container maxWidth='xl' sx={{ height: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <h2>Partner</h2>
                <IconButton  onClick={addPartner}>
                    <Add />
                </IconButton>
            </Box>
        </Container>
    )
};

export default PartnerPage;