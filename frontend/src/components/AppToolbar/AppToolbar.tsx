import {AppBar, Box, styled, Toolbar, Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {selectUser} from "../../features/users/usersSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";



const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});



const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    <Link to="/">Cocktails</Link>
                </Typography>
                <Box>
                    {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
                </Box>
            </Toolbar>
        </AppBar>
    );
};



export default AppToolbar;