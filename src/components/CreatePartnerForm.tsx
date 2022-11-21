import { DataArray } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, ReactElement, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreatePartnerDto } from "../types/CreatePartnerType";
import Button from "./Button";

interface Props {
    onPartnerInput: (partner: any) => void;
}

interface ApiFetchedDataType {
    name: string,
    trrn: string,
    vat_payer: boolean,
    vat_collection: boolean,
    county: string,
    address: string,
}

const CreatePartnerForm: FC<Props> = (props): ReactElement => {
    const [tin, setTin] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm();

    const onPartnerInput = (data: any) => {
        const objToSend: CreatePartnerDto = {
            address: {
                address: data.address,
                county: data.county,
                city: data.city,
                country: data.country,
            },
            contact: {
                car_registration_number: data.car_registration_number,
                contact_email: data.email,
                department: data.department,
                first_name: data.first_name,
                last_name: data.last_name,
                personal_identification_number: data.personal_identification_number,
                phone: data.phone
            },
            bank_account: {
                iban: data.iban,
                bank_name: data.bank_name,
                currency: data.currency
            },
            credit: Number(data.credit),
            credit_exceedance_percentage: Number(data.credit_exceedance_percentage),
            invoice_deadline_days: Number(data.invoice_deadline_days),
            name: data.name,
            remaining_credit: data.remaining_credit,
            trade_register_registration_number: data.trade_register_registration_number,
            unique_identification_number: data.unique_identification_number,
            vat_collection: data.vat_collection,
            vat_payer: data.vat_payer,
            vat_split: data.vat_split ?? false

        }
        props.onPartnerInput(objToSend);
    }

    const getPartnerInformationByTin = async () => {
        if (tin) {
            try {
                const response = await (await fetch(`https://api.openapi.ro/api/companies/${tin}`, {
                    headers: {
                        "x-api-key": "VzAEBCXbsz_qzkw1xny3Ny9WjvQCzxbXzJrjvA3qf75hDRsWfg"
                    }
                }))?.json();

                let vatCollection = false;

                if (response.tva_la_incasare.length) {
                    vatCollection = !response.tva_la_incasare.some((element: any) => element.tip === 'D')
                };

                setValue("name", response.denumire);
                setValue("trade_register_registration_number", response.numar_reg_com);
                setValue("vat_payer", !!response.tva);
                setValue("vat_collection", vatCollection);
                setValue("county", response.judet);
                setValue("address", response.adresa);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const onTinChange = (ev: any) => {
        setTin(ev.target.value);
    }

    return (
        <form onSubmit={handleSubmit(onPartnerInput)}>
            <Box sx={{ display: 'flex', alignIetms: 'center', width: '100%', justifyContent: 'center' }}>
                <TextField
                    fullWidth
                    sx={{ my: '1rem' }}
                    label='TIN'
                    helperText={errors.tin ? 'Tax identification number is required' : ''}
                    error={!!errors.tin}
                    inputProps={{ ...register('unique_identification_number', { required: true }) }}
                    onChange={onTinChange}
                />

                <Button sx={{ ml: '1rem', my: '16px' }} disabled={!tin} title="Search TIN" onClick={getPartnerInformationByTin} />
            </Box>

            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: '100%', my: '1rem' }}
                        label='Name'
                        helperText={errors.name ? 'Name is required' : ''}
                        error={!!errors.name}
                    />
                )}
            />

            <Controller
                name='trade_register_registration_number'
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: '100%', my: '1rem' }}
                        label='Trade register registration number'
                        helperText={errors.trade_register_registration_number ? 'Trade register registration number number is required' : ''}
                        error={!!errors.trade_register_registration_number} />
                )}
            />

            <Controller
                name="credit"
                defaultValue=""
                control={control}
                rules={{ pattern: /[0-9]/ }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: '100%', my: '1rem' }}
                        label='Credit'
                        helperText={errors.credit ? 'Credit must be a number' : ''}
                        error={!!errors.credit}
                    />
                )}
            />

            <Controller
                name="credit_exceedance_percentage"
                defaultValue=""
                control={control}
                rules={{ pattern: /\b([0-9]|[1-9][0-9]|100)\b/ }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: '100%', my: '1rem' }}
                        label='Credit exceedance percentage'
                        helperText={errors.credit_exceedance_percentage ? 'Value must be a number and cannot be greater than 100' : ''}
                        error={!!errors.credit_exceedance_percentage}
                    />
                )}
            />

            <FormControl fullWidth>
                <FormControlLabel label="Vat payer" control={
                    <Controller
                        name="vat_payer"
                        control={control}
                        render={({ field }) => (
                            <Checkbox {...field}
                                checked={!!field.value || false} />
                        )}
                    />
                } />
            </FormControl>

            <FormControl fullWidth>
                <FormControlLabel label="Vat Split" control={
                    <Controller
                        name="vat_split"
                        control={control}
                        render={({ field }) => (
                            <Checkbox {...field}
                                checked={!!field.value || false} />
                        )}
                    />
                } />
            </FormControl>

            <FormControl fullWidth>
                <FormControlLabel label="Vat Collection" control={
                    <Controller
                        name="vat_collection"
                        control={control}
                        render={({ field }) => (
                            <Checkbox {...field}
                                checked={!!field.value || false} />
                        )}
                    />
                } />

            </FormControl>

            <Controller
                name="invoice_deadline_days"
                defaultValue=""
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: '100%', my: '1rem' }}
                        label='Invoice deadline (days)'
                        helperText={errors.invoice_deadline_days ? 'Invoice deadline days must be a number' : ''}
                        error={!!errors.invoice_deadline_days}
                    />
                )}
            />

            <Accordion
                sx={{ my: 2 }}
            >
                <AccordionSummary>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Address</Typography>
                    <Typography color='text.secondary'>Add an address for this partner</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Controller
                        name="county"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='County'
                            />
                        )}
                    />
                    <TextField
                        sx={{ width: '100%', my: '1rem' }}
                        label='Country'
                        inputProps={{ ...register('country') }}
                    />
                    <TextField
                        sx={{ width: '100%', my: '1rem' }}
                        label='City'
                        inputProps={{ ...register('city') }}
                    />
                    <Controller
                        name="address"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Address'
                            />
                        )}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ my: 2 }}>
                <AccordionSummary>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Bank Account</Typography>
                    <Typography color='text.secondary'>Add a bank account for this partner</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Controller
                        name="iban"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='IBAN'
                            />
                        )}
                    />
                    <Controller
                        name="bank_name"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Bank'
                            />
                        )}
                    />
                    <Controller
                        name="currency"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Currency'
                            />
                        )}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ my: 2 }}>
                <AccordionSummary>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Contact person</Typography>
                    <Typography color='text.secondary'>Add a contact person for this partner</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Controller
                        name="first_name"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='First name'
                            />
                        )}
                    />
                    <Controller
                        name="last_name"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Last name'
                            />
                        )}
                    />
                    <Controller
                        name="personal_identification_number"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Personal identification number'
                            />
                        )}
                    />
                    <Controller
                        name="car_registration_number"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Car Registration Number'
                            />
                        )}
                    />
                    <Controller
                        name="department"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Department'
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Phone'
                            />
                        )}
                    />
                    <Controller
                        name="contact_email"
                        defaultValue=""
                        control={control}
                        rules={{ pattern: /^\S+@\S+$/i }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '100%', my: '1rem' }}
                                label='Email'
                                helperText={errors.contact_email ? 'Invalid e-mail address' : ''}
                                error={!!errors.contact_email}
                            />
                        )}
                    />

                </AccordionDetails>
            </Accordion>

            <Button color='primary' sx={{ width: '100%', mt: '1rem' }} type='submit' title='Submit' />

        </form >
    )
}

export default CreatePartnerForm;