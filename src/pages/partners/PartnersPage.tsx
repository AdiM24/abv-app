import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import * as api from "../../api/api-client";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";

type KeyValuePair = {
    key: string;
    value: any;
}

const PartnerPage = () => {
    const [headers, setHeaders] = useState<any>([
        {
            id: "partner_id",
            label: "Id",
            width: 100,
            editable: false
        },
        {
            id: "name",
            label: "Name",
            width: 100,
            editable: true
        },
        {
            id: "address",
            label: "Address",
            width: 250,
        },
        {
            id: "unique_identification_number",
            label: "TIN",
            width: 100,
            editable: true
        },
        {
            id: "trade_register_registration_number",
            label: "Reg. Number",
            width: 100,
            editable: true
        },
        {
            id: "credit",
            label: "Credit",
            width: 100,
            editable: true
        },
        {
            id: "remaining_credit",
            label: "Remaning Credit",
            width: 100,
            editable: true
        },
        {
            id: "created_at_utc",
            label: "Created at",
            width: 100,
            editable: true,
            type: "date"
        },
        {
            id: "modified_at_utc",
            label: "Updated last",
            width: 100,
            editable: true,
            type: "date"
        },

    ]);
    const [partners, setPartners] = useState<any[]>([]);
    const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);

    const [tempFilters, setTempFilters] = useState<KeyValuePair>({} as KeyValuePair);
    const [filters, setFilters] = useState<KeyValuePair>({} as KeyValuePair);
    const [queryParams, setQueryParams] = useState<string>();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filterable = [
        {
            key: 'name',
            display: 'Name',
            type: 'text',
        },
        {
            key: 'created_at_from',
            display: 'Date created from',
            type: 'date'
        },
        {
            key: 'created_at_to',
            display: 'Date created to',
            type: 'date'
        },
        {
            key: 'unique_identification_number',
            display: 'TIN',
            type: 'text'
        }
    ]

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        api.get(`/partners?${queryParams}`).then((res: any) => {
            setPartners(res);
        })
    }, [queryParams]);

    useEffect(() => {
        setQueryParams(new URLSearchParams(filters).toString());
        navigate(`?${new URLSearchParams(filters).toString()}`);

    }, [filters])


    const openFiltersDialog = () => {
        setIsFiltersDialogOpen(true);
    }

    const closeFiltersDialog = () => {
        setIsFiltersDialogOpen(false);
    }

    const setFilterValue = (event: any) => {

        const { name, value } = event.target;

        setTempFilters((prevState: any) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const setDateFilterValue = (event: any, name: string) => {
        if (!event) {
            setTempFilters((prevState: any) => {
                const copy = { ...prevState };

                delete copy[name];

                return copy;
            });
        } else {
            setTempFilters((prevState: any) => {
                return {
                    ...prevState,
                    [name]: event
                }
            });
        }
    }

    const onFilterSubmit = () => {
        if (Object.values(tempFilters).every((filter) => filter === '')) {
            setFilters({} as KeyValuePair);
        }
        else {
            setFilters(tempFilters);
        }
    }

    const handleTableRowClick = (row: any) => {
        navigate(`/partners/${row.partner_id}`)
    }

    return (
        <>
            <Container sx={{ height: '100%', margin: 0, marginTop: '3rem', maxWidth: '100vw !important' }}>
                <Toolbar sx={{ paddingLeft: '0px !important', paddingRight: '0px !important', marginTop: '2rem' }}>
                    <Card sx={{ width: '100%' }}>
                        <Accordion>
                            <AccordionSummary>
                                <Typography>Filters</Typography>
                                {Object.values(filters)?.length > 0 && <Typography sx={{ ml: 5 }} color='primary'>Filters applied</Typography>}
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {filterable.map((filterSettings) => (
                                    <>
                                        {
                                            filterSettings.type === 'date' &&
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <Box>
                                                    <DatePicker
                                                        label={`${filterSettings.display}`}
                                                        openTo="day"
                                                        views={['year', 'month', 'day']}
                                                        value={tempFilters[filterSettings.key as keyof KeyValuePair] || null}
                                                        onChange={(newValue) => { setDateFilterValue(newValue, `${filterSettings.key}`) }}
                                                        renderInput={(params) => <TextField size='small' name={filterSettings.key} onChange={(ev) => console.log(ev)} sx={{ margin: '1rem' }} {...params} />}
                                                    />
                                                </Box>
                                            </LocalizationProvider>
                                        }
                                        {
                                            filterSettings.type === 'text' &&

                                            <TextField sx={{ margin: '1rem' }}
                                                size='small'
                                                key={`${filterSettings.key}`}
                                                label={filterSettings.display}
                                                name={filterSettings.key}
                                                value={tempFilters[filterSettings.key as keyof KeyValuePair]}
                                                type={filterSettings.type}
                                                onInput={setFilterValue}
                                            />
                                        }

                                    </>
                                ))}
                                <Button onClick={onFilterSubmit}>Submit</Button>
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                </Toolbar>

                <Box sx={{ width: '100%', height: '100%', maxHeight: '100%', marginTop: '2rem' }}>

                    <Paper sx={{ width: '100%', overflow: 'auto' }}>
                        <TableContainer sx={{ height: '70vh', width: '100%' }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {headers.map((header: any) => (
                                            <TableCell
                                                key={header.id}
                                                align={header.align}
                                                style={{ minWidth: header.width }}
                                            >
                                                {header.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {partners
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow onClick={() => handleTableRowClick(row)} hover tabIndex={-1} key={row.id}>

                                                    {headers.map((header: any) => {
                                                        const value = row[header.id];
                                                        return (
                                                            <>
                                                                {!value && typeof value !== 'boolean' &&
                                                                    <TableCell key={header.id} align={header.align}>
                                                                        -
                                                                    </TableCell>
                                                                }
                                                                {header && typeof value === 'boolean' &&
                                                                    <TableCell key={header.id} align={header.align}>
                                                                        {value ? 'Yes' : 'No'}
                                                                    </TableCell>
                                                                }
                                                                {
                                                                    header && typeof value === 'string' && header.type !== 'date' &&
                                                                    <TableCell key={header.id} align={header.align}>
                                                                        {value}
                                                                    </TableCell>
                                                                }
                                                                {
                                                                    header && typeof value === 'number' &&
                                                                    <TableCell key={header.id} align={header.align}>
                                                                        {value.toFixed(2)}
                                                                    </TableCell>
                                                                }
                                                                {
                                                                    header && header.type === 'date' &&
                                                                    <TableCell key={header.id} align={header.align}>
                                                                        {new Date(value).toLocaleDateString()}
                                                                    </TableCell>
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
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={partners.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    {/* <DataGrid rows={partners} columns={headers} getRowId={(row) => row.partner_id} /> */}
                </Box>

                <Dialog
                    fullScreen={fullScreen}
                    open={isFiltersDialogOpen}
                    onClose={() => alert('NOPE')}
                    aria-labelledby="responsive-dialog-title"
                    fullWidth
                    maxWidth="lg"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Filters
                    </DialogTitle>
                    <DialogContent sx={{ height: '100%' }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {filterable.map((filterSettings) => (
                                <>
                                    {
                                        filterSettings.type === 'date' &&
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                            <Box>
                                                <DatePicker

                                                    disableFuture
                                                    label={`${filterSettings.display} from`}
                                                    openTo="day"
                                                    views={['year', 'month', 'day']}
                                                    value={filters[filterSettings.key as keyof KeyValuePair]}
                                                    onChange={(newValue) => { setDateFilterValue(newValue, `${filterSettings.key}_to`) }}
                                                    renderInput={(params) => <TextField name={filterSettings.key} onChange={(ev) => console.log(ev)} sx={{ margin: '1rem' }} {...params} />}
                                                />
                                                <DatePicker
                                                    disableFuture
                                                    label={`${filterSettings.display} to`}
                                                    openTo="day"
                                                    views={['year', 'month', 'day']}
                                                    value={filters[filterSettings.key as keyof KeyValuePair]}
                                                    onChange={(newValue) => { setDateFilterValue(newValue, `${filterSettings.key}_from`) }}
                                                    renderInput={(params) => <TextField name={filterSettings.key} sx={{ margin: '1rem' }} {...params} />}
                                                />
                                            </Box>
                                        </LocalizationProvider>
                                    }
                                    {
                                        filterSettings.type === 'text' &&

                                        <TextField sx={{ margin: '1rem' }}
                                            key={`${filterSettings.key}`}
                                            label={filterSettings.display}
                                            name={filterSettings.key}
                                            value={filters[filterSettings.key as keyof KeyValuePair]}
                                            type={filterSettings.type}
                                        />
                                    }

                                </>
                            ))}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={closeFiltersDialog}>
                            Disagree
                        </Button>
                        <Button onClick={closeFiltersDialog} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>




        </>
    )
};

export default PartnerPage;