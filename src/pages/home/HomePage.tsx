import React, { ReactElement, FC, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as api from '../../api/api-client';

const HomePage: FC<any> = (): ReactElement => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 150,
            editable: true
        },
        {
            field: 'first_name',
            headerName: 'First Name',
            width: 150,
            editable: true
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
            width: 150,
            editable: true
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 300,
            editable: true
        },
        {
            field: 'created_at_utc',
            headerName: 'Created at',
            width: 300,
            editable: true
        },
        {
            field: 'updated_at_utc',
            headerName: 'Updated at',
            width: 150,
            editable: true
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 300,
            editable: true
        }

    ]

    useEffect(() => {
        setIsLoading(true);

        api.get('/users').then((res) => {
            setData(res);
        }).catch((err) => {
            console.warn(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    return (
        <>
            {isLoading && <Box sx={{
                flexGrow: 1,
                backgroundColor: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>Loading...</Box>
            }

            {!isLoading &&
                <Box sx={{
                    mt: '3rem',
                    width: '100%',
                    height: '80%'
                }}>
                    <DataGrid
                        rows={data}
                        columns={columns}

                    />
                  
                </Box>
            }
        </>
    );
};

export default HomePage;