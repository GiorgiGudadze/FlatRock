import * as React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import Switch from '@mui/material/Switch';
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="grey"
      className={className}
      count={pageCount}
      shape="rounded"
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

Pagination.propTypes = {
  className: PropTypes.string,
  /**
   * @param {React.MouseEvent<HTMLButtonElement> | null} event 
   * @param {number} page 
   */
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  shape: PropTypes.oneOf(['round', 'rounded'])
};

function CustomPagination(props) {
    
  return <GridPagination ActionsComponent={Pagination} shape="rounded" {...props} />;
}

export default function UsersList(props) {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState('') 
    const handleClose = () => setOpen(false);

    const handleOpen = (row) => {
      setOpen(true)
      setSelectedRow(row)
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
          },
          paginateBox:{
            main: '#c6c6c6'
          }
      }
    });

    const handleSwitchChange = (event,id) => {

        props.updateList(prevState=>{
          let index = prevState.findIndex(item=>item.newId === id)
          const updatedList = [...prevState]; 
          updatedList[index] = { ...updatedList[index], status: event.target.checked }; 
          return updatedList;
        })

    };

    const arePropsEqual = (prevProps, nextProps) => {
      return prevProps.open === nextProps.open && prevProps.id === nextProps.id && prevProps.status === nextProps.status;
    }

    const MemoizedDeleteModal = React.memo(DeleteModal, arePropsEqual);
    const renderUser = props.list.map(m=>{
      
        return {
          id: m.newId,
          USER: `${m.name} ${m.lastName}`,
          ROLE: m.role,
          STATUS: m.status,
          ACTIONS: '#03a9f4',
          email: m.email,
          permissions: m.permissions
        }
      })

    const myData = {
        columns: [
            { field: 'USER', headerName: 'USER', width: 500, renderCell: (params) => (
                <div style={{display:'flex', alignItems:'center', opacity:`${!params.row.STATUS ? '0.5' : '1'}`}}>
                    <AccountCircleIcon style={{fontSize:'40px',color: '#bdbdbd'}}/>
                    <div>
                      <div><strong>{params.row.USER}</strong></div>
                      <div style={{color:'grey'}}>{params.row.email}</div>
                    </div>
                </div>
              ) },

            { field: 'ROLE', headerName: 'ROLE', width: 166, renderCell: (params) => (
                <div style={{display:'flex', alignItems:'center', opacity:`${!params.row.STATUS ? '0.5' : '1'}`}}>
                    {params.row.ROLE === 'Admin' ? <VpnKeyIcon theme={theme} color='justWhite' /> : ''}
                    <div><strong>{params.row.ROLE}</strong></div>
                </div>
              ) },

            { field: 'STATUS', headerName: 'STATUS', width: 166, renderCell: (params) => (
                <div>
                    <Switch checked={params.row.STATUS} onChange={(e)=>{handleSwitchChange(e,params.row.id)}} />
                </div>
              ) },
            { field: 'ACTIONS', headerName: 'ACTIONS', width: 166, renderCell: (params) => (
                <div style={{display:'flex', alignItems:'center'}}>
                  <Link style={{display:'flex', opacity:`${!params.row.STATUS ? '0' : '1'}`, zIndex:`${!params.row.STATUS ? '-1' : '0'}`}} to={params.row.id} state={params.row}>
                    <SettingsIcon style={{color:'#a3a3a3', cursor:'pointer'}} />
                  </Link>
                  <DeleteIcon onClick={()=>{
                  handleOpen(params.row);
                  }
                  } style={{color:'#a3a3a3', marginLeft: '5px', cursor:'pointer'}}/>
                  <MemoizedDeleteModal status={selectedRow.STATUS} open={open} onClose={handleClose} userName={selectedRow.USER} rowData={selectedRow} list={props.list} id={selectedRow.id} setList={props.updateList} />
                </div>
              ) },
            
          ],
          rows: renderUser
    }

  return (
    <div className="tableCnt">
      <div className="tableCnt__wrap">
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            disableClickEventBubbling={true}
            pagination
            getRowClassName={(params) =>{
                if(props.term.trim().length > 0){

                  let name = params.row.USER.split(" ")[0].toLowerCase()
                  let lastName = params.row.USER.split(" ")[1].toLowerCase()
                  let word = props.term.toLowerCase().split(" ").filter(Boolean);

                  for (let i = 0; i < word.length; i++) {
                    if (name.includes(word[i]) || lastName.includes(word[i])) {
                      return 'show';
                    }
                  }
                  return 'hide';
                }
              }
            }
            slots={{
              pagination: CustomPagination,
            }}
            {...myData}
            initialState={{
              ...myData.initialState,
              pagination: { paginationModel: { pageSize: 25 } },
            }}
          />
        </Box>
      </div>
    </div>
  );
}