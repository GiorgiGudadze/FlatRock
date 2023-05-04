import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FaceIcon from '@mui/icons-material/Face';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';

const CreateUserForm = (props) =>{

    const [role, setRole] = useState('');
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState({})
     
    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

    const validate = (e) =>{
        e.preventDefault()
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let k = 0;

        if(name.trim().length === 0){
            k=1;
            setError((prevState)=>{
                return {...prevState, name: 'Name is empty'}
            })
        }

        if(lastName.trim().length === 0){
            k=1;
            setError((prevState)=>{
                return {...prevState, lastName: 'Last Name is empty'}
            })
        }

        if(email.trim().length === 0){
            k=1;
            setError((prevState)=>{
                return {...prevState, email: 'Email is empty'}
            })
        }
        else if(!emailRegex.test(email)){
            k=1;
            setError((prevState)=>{
                return {...prevState, email: 'Invalid Email'}
            })
        }

        if(role.trim().length === 0){
            k=1;
            setError((prevState)=>{
                return {...prevState, role: 'Select Role'}
            })
        }

        if(Object.keys(error).length === 0 && k === 0){

            const newId = uuidv4();

            props.createUser((prevState)=>{
                return [...prevState, {
                    newId,
                    role,
                    name,
                    lastName,
                    email,
                    status: true,
                    permissions:{
                        group1: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? true : false,
                        group2: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? true : false,
                        group11: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? true : false,
                        group12: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? true : false,
                        group13: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? true : false,
                        group14: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? true : false,
                        group15: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? true : false
                    }
                }]
            })

            setRole('')
            setName('')
            setLastName('')
            setEmail('')

            props.onClose()
        }

    }

    useEffect(()=>{
        if(name.trim().length > 0){
            setError((prevState)=>{
                const { name, ...rest } = prevState;
                return rest;
            })
        }

        if(lastName.trim().length > 0){
            setError((prevState)=>{
                const { lastName, ...rest } = prevState;
                return rest;
            })
        }
 
        if(email.trim().length > 0){
            setError((prevState)=>{
                const { email, ...rest } = prevState;
                return rest;
            })
        }

        if(role.trim().length > 0){
            setError((prevState)=>{
                const { role, ...rest } = prevState;
                return rest;
            })
        }

        if(name.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || role.trim().length === 0){
            setError(prevState=>{
                return {...prevState, disableButton: true}
            })
        }
        else{
            setError(prevState=>{
                const { disableButton, ...rest } = prevState;
                return rest;
            })
        }

    },[name,lastName,email,role])

    return(
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <form onSubmit={(e)=>validate(e)}>
                <Box sx={style}>
                    <CloseIcon className='closeMuiIcon1' onClick={props.onClose} />
                    <h1 style={{padding:'30px',marginBottom:'10px',fontSize:"28px"}}>Invite New User</h1>

                    <Box sx={{ display: 'flex' }}>
                        <FaceIcon sx={{ mr: 1, my: 0.5 }} style={{marginTop:"20px"}} />

                        <div style={{display:'flex', flexDirection:'column'}}>
                            <TextField onChange={(e)=>setName(e.target.value)}
                            value={name} style={{marginRight:'5px'}} id="input-with-sx" label="* First Name" variant="standard" />
                            {!!error.name ? <div style={{fontSize:'13px',color:'red',marginTop:'5px'}}>{error.name}</div> : ''}
                        </div>

                        <div style={{display:'flex', flexDirection:'column'}}>
                        <TextField value={lastName} onChange={(e)=>setLastName(e.target.value)} id="input-with-sx" label="* Last Name" variant="standard" />
                        {!!error.lastName ? <div style={{fontSize:'13px',color:'red',marginTop:'5px'}}>{error.lastName}</div> : ''}
                        </div>
                    </Box>
                    
                    <Box sx={{ display: 'flex'}}>
                        <AlternateEmailIcon sx={{ mr: 1, my: 0.5 }} style={{marginTop:"20px"}} />
                        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                        <TextField value={email} onChange={(e)=>setEmail(e.target.value)} type="text" style={{width:'100%'}} id="input-with-sx" label="* Email" variant="standard" />
                        {!!error.email ? <div style={{fontSize:'13px',color:'red',marginTop:'5px'}}>{error.email}</div> : ''}
                        </div>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VpnKeyIcon style={{marginTop:'15px'}}/>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: '45%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={role}
                            onChange={handleChange}
                            label="Role"                      
                            >
                                <MenuItem value={"User"}>User</MenuItem>
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                            </Select>
                            {!!error.role ? <div style={{fontSize:'13px', color:'red', marginTop:'5px'}}>{error.role}</div> : ''}
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }} style={{marginTop:'35px'}}>
                        <Button disabled={!!error.disableButton ? true : false} type="submit" style={{marginLeft:'30px'}} variant="contained">Send Invitation</Button>
                        <div style={{ color: error.disableButton ? 'red' : '#7cff7c' }}>{!!error.disableButton ? 'Fill in all the fields' : 'Good to go'}</div>
                    </Box>

                </Box>
                </form>
            </Modal>
    )
}

export default CreateUserForm