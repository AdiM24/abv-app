import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

const HomePage: FC<any> = (): ReactElement => {

    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            <Typography variant='h1'>Home page</Typography>
        </Box>
    );
};

export default HomePage;