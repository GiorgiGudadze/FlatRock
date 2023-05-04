import React,{ useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar'
import CreateUserForm from "./CreateUserForm";
import { Link, useLocation } from 'react-router-dom';
const Header = (props) =>{

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation();
    const pathBoolean = location.pathname === '/' ? true : false
    const renderAddButton = () =>{
        return(
            <Link style={{color:'#fff', display: 'contents'}} to={`${pathBoolean ? '' : '/'}`}>
                <Box onClick={()=>pathBoolean ? handleOpen() : "" } sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab style={{color:"#fff"}} color={pathBoolean ? 'primary' : '#fff'} aria-label="add">
                        {pathBoolean ? <AddIcon /> : <SettingsIcon />}
                    </Fab>
                </Box>
            </Link>
        )
    }

    return(
        <header>
            {renderAddButton()}
            <h1>{props.title}</h1>
            {location.pathname === '/' ? <SearchBar setWord={props.setWord} list={props.list}/> : ''}
            {location.pathname === '/' ? <CreateUserForm createUser={props.createUser} open={open} onClose={handleClose}/> : ''}
        </header>
    )
}

export default Header