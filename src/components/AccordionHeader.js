import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

const AccordionHeader = ({title, permission, setPermissions, group}) => {

    let permissionGroup = group
    const [changePermission, setChangePermission] = useState(permission)
    
    const permissionSwitchChange = () => {
        setChangePermission(!changePermission)
        setPermissions(prevState=>{
            return {...prevState, [permissionGroup]: !changePermission}
        })
    };

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
          {...props}
        />
      ))(({ theme }) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
          marginLeft: theme.spacing(1),
        },
      }));

    return ( 
        <AccordionSummary style={{transiton: '1s'}} aria-controls="panel1d-content" id="panel1d-header">
          <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              <Typography>{title}</Typography>
              <Switch checked={changePermission} onClick={(e)=>e.stopPropagation()} onChange={(e)=>permissionSwitchChange(e)}/>
          </div>
      </AccordionSummary>
     );
}
 
export default AccordionHeader;