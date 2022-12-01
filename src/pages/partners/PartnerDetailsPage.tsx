import { Box, Button, Card, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import * as api from '../../api/api-client';
import { CreatePartnerDto } from "../../types/CreatePartnerType";

const PartnerDetailsPage = () => {
    const [partner, setPartner] = useState<any>({});
    const [partnerAddresses, setPartnerAddresses] = useState<any>([]);
    const [partnerContacts, setPartnerContacts] = useState<any>([]);
    const [partnerBankAccounts, setPartnerBankAccounts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const addressHeaders = [
        {
            id: 'address',
            width: 100,
            label: 'Address',
        },
        {
            id: 'county',
            width: 100,
            label: 'County',
        },
        {
            id: 'country',
            width: 100,
            label: 'Country'
        },
        {
            id: 'city',
            width: 100,
            label: 'City'
        },
    ];

    const bankAccountHeaders = [
        {
            id: 'iban',
            width: 100,
            label: 'IBAN'
        },
        {
            id: 'bank_name',
            width: 100,
            label: 'Bank'
        },
        {
            id: 'currency',
            width: 100,
            label: 'Currency'
        }
    ];

    const contactDetailsHeaders = [
        {
            id: 'contact_email',
            width: 300,
            label: 'E-mail'
        },
        {
            id: 'phone',
            width: 100,
            label: 'Phone'
        },
        {
            id: 'first_name',
            width: 100,
            label: 'First name'
        },
        {
            id: 'last_name',
            width: 100,
            label: 'Last name'
        },
        {
            id: 'personal_identification_number',
            width: 100,
            label: 'PIN'
        },
        {
            id: 'car_registration_number',
            width: 100,
            label: 'Car reg. no.'
        },
        {
            id: 'department',
            width: 100,
            label: 'Department'
        }
    ];

    let { id } = useParams();

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            api.get(`/partners/${id}`).then((res) => {
                setPartner(res);

                setPartnerAddresses(res.Addresses);
                setPartnerBankAccounts(res.BankAccounts);
                setPartnerContacts(res.Contacts);
            }).catch((err) => {
                toast(err, { position: 'bottom-right', type: 'error' })
            }).finally(() => {
                setLoading(false);
            })
        }, 1500)


    }, [])

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    const getCellInformation = (header: any, value: any, index: number) => {
        switch (value) {
            case !value && typeof value !== 'boolean': {
                return <TableCell key={`${header.id}-cell-${index}`}>
                    -
                </TableCell>
            }
            case typeof value === 'boolean':
                return <TableCell key={`${header.id}-cell-${index}`}>
                    {value ? 'Yes' : 'No'}
                </TableCell>
            case typeof value === 'string' && header.type !== 'date':
                return <TableCell key={`${header.id}-cell-${index}`}>
                    {value}
                </TableCell>
            case typeof value === 'number':
                return <TableCell key={`${header.id}-cell-${index}`}>
                    {value.toFixed(2)}
                </TableCell>

            case header.type === 'date':
                return <TableCell key={`${header.id}-cell-${index}`}>
                    {new Date(value).toLocaleDateString()}
                </TableCell>
            default: {
                return <TableCell key={`${header.id}-cell-${index}`}>
                    {value}
                </TableCell>
            }
        }
    }


    return (
        <Container sx={{ height: '100%', margin: 0, marginTop: '3rem', maxWidth: '100vw !important' }}>
            <Toolbar sx={{ width: '100%', paddingLeft: '0px !important', paddingRight: '0px !important' }}>
                <Card sx={{ width: '100%' }}>
                    <Button onClick={toggleEdit}>Toggle edit</Button>
                </Card>
            </Toolbar>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {partner && !loading &&
                    <>
                        <Card>

                            <Typography sx={{ margin: '1rem' }} variant='h6'>Basic information</Typography>

                            {Object.keys(partner).sort().map((key: string) => {
                                return <>
                                    {typeof partner[key as keyof CreatePartnerDto] !== 'object' &&
                                        <TextField
                                            variant='standard'
                                            sx={{ margin: '2rem' }}
                                            label={key}
                                            name={key}
                                            value={partner[key as keyof CreatePartnerDto]}
                                            disabled={!editMode}
                                        />
                                    }
                                </>
                            })}
                        </Card>
                        <Card sx={{ marginTop: '2rem', width: '100%' }}>
                            <Typography sx={{ margin: '1rem' }} variant='h6'>Addresses</Typography>

                            <Paper sx={{ width: '100%', overflow: 'auto' }}>
                                <TableContainer sx={{ width: '100%' }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {addressHeaders.map((header) => (
                                                    <TableCell
                                                        key={header.id}
                                                        style={{ minWidth: header.width }}
                                                    >
                                                        {header.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {partnerAddresses
                                                .map((row: any) => {
                                                    return (
                                                        <TableRow>
                                                            {addressHeaders.map((header: any, index: number) => {
                                                                const value = row[header.id];
                                                                return (
                                                                    <>
                                                                        {
                                                                            getCellInformation(header, value, index)
                                                                        }
                                                                    </>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                        </Card>

                        <Card sx={{ marginTop: '2rem', width: '100%' }}>
                            <Typography sx={{ margin: '1rem' }} variant='h6'>Bank information</Typography>

                            <Paper sx={{ width: '100%', overflow: 'auto' }}>
                                <TableContainer sx={{ width: '100%' }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {bankAccountHeaders.map((header) => (
                                                    <TableCell
                                                        key={header.id}
                                                        style={{ minWidth: header.width }}
                                                    >
                                                        {header.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {partnerBankAccounts
                                                .map((row: any) => {
                                                    return (
                                                        <TableRow>
                                                            {bankAccountHeaders.map((header: any, index: number) => {
                                                                const value = row[header.id];
                                                                return (
                                                                    <>
                                                                        {
                                                                            getCellInformation(header, value, index)
                                                                        }
                                                                    </>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                        </Card>

                        <Card sx={{ marginTop: '2rem', width: '100%' }}>
                            <Typography sx={{ margin: '1rem' }} variant='h6'>Contact information</Typography>

                            <Paper sx={{ width: '100%', overflow: 'auto' }}>
                                <TableContainer sx={{ width: '100%' }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {contactDetailsHeaders.map((header) => (
                                                    <TableCell
                                                        key={header.id}
                                                        style={{ minWidth: header.width }}
                                                    >
                                                        {header.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {partnerContacts
                                                .map((row: any) => {
                                                    return (
                                                        <TableRow>
                                                            {contactDetailsHeaders.map((header: any, index: number) => {
                                                                const value = row[header.id];
                                                                return (
                                                                    <>
                                                                        {
                                                                            getCellInformation(header, value, index)
                                                                        }
                                                                    </>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                        </Card>
                    </>
                }
            </Box>

            {
                loading && <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography>Loading...</Typography></Box>
            }
        </Container >
    )
}

export default PartnerDetailsPage;
