import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";

const Spinner = () => {
    return (

        <Box style={{textAlign: "center"}}>
            <CircularProgress color="inherit" />
        </Box>
    );
};

export default Spinner;