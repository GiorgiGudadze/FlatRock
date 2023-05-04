import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

const SubAccordion = ({title, permission, setPermissions, group}) => {

    let permissionGroup = group
    const [changePermission, setChangePermission] = useState(permission)
    
    const permissionSwitchChange = () => {
        setChangePermission(!changePermission)
        setPermissions(prevState=>{
            return {...prevState, [permissionGroup]: !changePermission}
        })
    }
    return ( 
        <div className={`dot ${changePermission ? 'active' : ''}`} style={{display:'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <Typography>{title}</Typography>
            <Switch checked={changePermission} onClick={(e)=>e.stopPropagation()} onChange={(e)=>permissionSwitchChange(e)}/>
        </div>
     );
}
 
export default SubAccordion;