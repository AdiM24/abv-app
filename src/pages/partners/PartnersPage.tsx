import { Add } from "@mui/icons-material";
import { Box, Container, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import * as api from "../../api/api-client";

const PartnerPage = () => {
    const [headers, setHeaders] = useState<GridColDef[]>([
        {
            field: "partner_id",
            headerName: "Id",
            width: 100,
            editable: false
        },
        {
            field: "name",
            headerName: "Name",
            width: 100,
            editable: true
        },
        {
            field: "unique_identification_number",
            headerName: "Unique identification number (CUI)",
            width: 100,
            editable: true
        },
        {
            field: "trade_register_registration_number",
            headerName: "Reg. Number",
            width: 100,
            editable: true
        },
        {
            field: "credit",
            headerName: "Credit",
            width: 100,
            editable: true
        },
        {
            field: "remaining_credit",
            headerName: "Remaning Credit",
            width: 100,
            editable: true
        },
        {
            field: "vat_payer",
            headerName: "Vat Payer",
            width: 100,
            editable: true
        },
        {
            field: "vat_split",
            headerName: "Vat Split",
            width: 100,
            editable: true
        },
        {
            field: "vat_collection",
            headerName: "Vat Collection",
            width: 100,
            editable: true
        },
        {
            field: "invoice_deadline_days",
            headerName: "Invoice Deadline Days",
            width: 100,
            editable: true
        },
        {
            field: "credit_exceedance_percentage",
            headerName: "Credit exceedance percentage",
            width: 100,
            editable: true
        },
        {
            field: "created_at_utc",
            headerName: "Created at",
            width: 100,
            editable: true
        },
        {
            field: "modified_at_utc",
            headerName: "Updated last",
            width: 100,
            editable: true
        },

    ]);
    const [partners, setPartners] = useState<any>([]);
    const addPartner = () => {
        console.log('clicked');
    };

    useEffect(() => {
        api.get('/partners').then((res: any) => {
            console.log(res);
            setPartners(res);
        })
    }, []);

    return (
        <Container maxWidth='xl' sx={{ height: '100%', margin: 0, marginTop: 4 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <h2>Partner</h2>
                <IconButton onClick={addPartner}>
                    <Add />
                </IconButton>
            </Box>
            <Box sx={{ width: '100%', height: '250px', maxHeight: '100%' }}>
                <DataGrid rows={partners} columns={headers} getRowId={(row) => row.partner_id} />
            </Box>
        </Container>
    )
};

export default PartnerPage;