import { useParams, useNavigate, useLocation } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import AccordionComponent from './Accordion'

const Settings = (props) => {
    const location = useLocation();
    const data  = location.state;
    const [userName, userSurname] = data.USER.split(" ")
    const navigate = useNavigate()

    const [role, setRole] = useState(data.ROLE);
    const [name, setName] = useState(userName)
    const [activeUser, setUserActive] = useState(data.STATUS)
    const [superUser, setSuperUser] = useState(role === 'Admin' ? true : false)
    const [lastName, setLastName] = useState(userSurname)
    const [permissions, setPermissions] = useState(data.permissions)

    const handleChange = (event) => {
        setRole(event.target.value);
        event.target.value === 'Admin' ? setSuperUser(true) : setSuperUser(false)
    };

    const handleSwitchChange = () => {
        setUserActive(!activeUser)
    };

    const handleSuperUserChange = (e) => {
        if(e.target.checked){
            setSuperUser(true)
            setRole('Admin')
        }
        else{
            setSuperUser(false)
            setRole('User')
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#44a0d3'
            },   
            secondary: {
                main: '#7e7ef1',
            },
            justWhite:{
                main: '#fff'
            }
        }
      });

    const { id } = useParams()
    const onSaveClick = () =>{
        
        props.updateList((prevState) => {
            return prevState.map((obj) => {
              if (obj.newId === id) 
              {
                return { ...obj, name, role, lastName, status: activeUser, permissions };
              }
              return obj;
            });
          });
          navigate('/')
    }

    return ( 
        <div className="setting">
            <div className="settingCnt">
                <div style={{display:'flex', height:'fit-content', width: '100%', justifyContent: 'space-around'}}>
                    <div className="settingCnt__profile">
                    <AccountCircleIcon style={{fontSize:'180px',color: 'darkgrey'}}/>
                    {role === 'Admin' ? <VpnKeyIcon className='vpnKeyIcon' theme={theme} color='justWhite'/> : ''}
                    <div className={`settingsCnt__photo ${activeUser ? '' : 'inActive'}`} style={{ color:'lightgray', fontSize:'12px', textAlign:'center'}}>UPLOAD A PHOTO</div>
                    <div style={{opacity:`${activeUser ? '1' : '0.5'}`}}>
                        <h1 style={{textAlign:'center', marginTop: '25px'}}>{userName}<br/>{userSurname}</h1>
                        <div style={{ color:'#000', fontSize:'12px', textAlign:'center', marginTop:'15px'}}>Email@sa.com</div>
                    </div>
                    <Button className={`settingsCnt__btn ${activeUser ? '' : 'inActive'}`} theme={theme} style={{marginTop:'30px', padding: '10px', borderRadius:'23px', fontSize: '14px', width: '180px'}} color='secondary' variant="contained">Resend the invite</Button>
                </div>

                <div className="settingCnt__details">
                    <div>
                        <h1 style={{fontSize:'28px'}}>Details</h1>
                        <div style={{display:'flex', alignItems: 'center', marginLeft: '-58px', marginTop: '20px'}}>
                            <Switch checked={activeUser} onChange={(e)=>{handleSwitchChange(e,data.id)}}/>
                            <div>this user is <strong>{activeUser ? 'Active' : 'Inactive'}</strong></div>
                        </div>
                    </div>

                        <div style={{display:'flex', flexDirection: "column", opacity:`${activeUser ? '1' : '0.5'}`, pointerEvents:`${activeUser ? 'auto' : 'none'}`}}>
                            <TextField onChange={(e)=>setName(e.target.value)} value={name} style={{marginBottom:'20px'}} label="* First Name" variant="standard" />
                            <TextField value={lastName} onChange={(e)=>setLastName(e.target.value)} style={{marginBottom:'20px'}} label="* Last Name" variant="standard" />
                            <FormControl style={{margin:0}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={role}
                                label="Role"
                                onChange={(e)=>handleChange(e)}
                                >
                                    <MenuItem value={"User"}>User</MenuItem>
                                    <MenuItem value={"Admin"}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <Button onClick={onSaveClick} className={`settingsCnt__btn ${activeUser ? '' : 'inActive'}`} theme={theme} style={{marginTop:'30px', padding: '10px', borderRadius:'23px', fontSize: '14px', color: '#fff', width: '180px'}} color='primary' variant="contained">Save Changes</Button>

                    </div>
                </div>

                <div className="settingCnt__permissions">
                    <h1 style={{fontSize:'28px'}}>Permissions</h1>
                    <div style={{opacity:`${activeUser ? '1' : '0.5'}`, pointerEvents:`${activeUser ? 'auto' : 'none'}`}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', paddingBottom: '20px', marginTop: '20px'}}>
                            <div style={{fontWeight: 'bold'}}>Super Admin</div>
                            <Switch checked={superUser} onChange={(e)=>handleSuperUserChange(e)}/>
                        </div>
                        <div style={{borderBottom: '1px solid rgb(211, 211, 211)'}}>
                        <AccordionComponent permission={permissions} setPermissions={setPermissions} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
     );
}
 
export default Settings