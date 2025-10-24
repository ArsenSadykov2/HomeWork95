import {Container, CssBaseline, Typography } from '@mui/material';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppToolbar from './components/AppToolbar/AppToolbar';
import {Route, Routes } from 'react-router-dom';
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Cocktails from "./features/cocktails/Cocktails.tsx";
import NewCocktail from "./features/cocktails/NewCocktail.tsx";
import MyCocktail from "./features/cocktails/MyCocktail.tsx";
import FullCocktail from "./features/cocktails/FullCocktail.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <ToastContainer
        />
        <header>
            <AppToolbar/>
        </header>
        <main>
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Cocktails/>}/>
                    <Route path="/cocktails/:id" element={<FullCocktail/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/newCocktail" element={<NewCocktail/>} />
                    <Route path="/myCocktails" element={<MyCocktail/>} />
                    <Route path="*" element={<Typography variant="h4">Not Found Page</Typography>}/>
                </Routes>
            </Container>
        </main>
    </>
);

export default App;