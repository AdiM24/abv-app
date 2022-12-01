import { Box, Container } from "@mui/material"
import CreatePartnerForm from "../../components/CreatePartnerForm";
import * as api from "../../api/api-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePartnerPage = () => {
    const navigate = useNavigate();

    const onPartnerSubmit = (data: any) => {
        console.log(data);
        api.post('/partners', data).then((res) => {
            toast.success('Partner successfully added');
            navigate('/partners');
        }).catch((err) => {
            toast.error('Something went wrong!');
        })
    }

    return (
        <Container sx={{ maxWidth: '100vw !important', height: '100%', m: 0, mt: 4 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <h2>Create partner</h2>
            </Box>
            <Box>
                <CreatePartnerForm onPartnerInput={onPartnerSubmit} />
            </Box>
        </Container>
    )
}

export default CreatePartnerPage