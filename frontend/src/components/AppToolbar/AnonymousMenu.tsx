import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <Button component={NavLink} to={'/register'} color={'inherit'}>Sign Up</Button>
            <Button component={NavLink} to={'/login'} color={'inherit'}>Login Up</Button>
        </>
    );
};

export default AnonymousMenu;