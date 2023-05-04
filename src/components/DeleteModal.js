import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FaceIcon from '@mui/icons-material/Face';
import Button from '@mui/material/Button';
import deleteUser from '../events/deleteUser';
import CloseIcon from '@mui/icons-material/Close';

const DeleteModal = (props) => {
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
    return ( 
        <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <Box sx={style}>
                <CloseIcon className='closeMuiIcon1' onClick={props.onClose} />
                <h1 style={{padding:'30px 40px',marginBottom:'10px',fontSize:"28px"}}>Delete User</h1>
                <Box sx={{ display: 'flex'}} >
                    <FaceIcon style={{marginRight:'20px', marginTop: '-2px'}} />
                    <div className='modalCntField'>
                        <div>{props.userName}</div>
                        <div>{props.status ? <div style={{color:'#03A9F4'}}>Active User</div> : <div style={{color:'red'}}>Not Active User</div>}</div>
                    </div>
                </Box>
                <Button onClick={()=>deleteUser(props.list,props.id, props.setList,props.onClose)} style={{marginLeft:'40px', background:'#ff2f2f'}} variant="contained">Delete User</Button>
            </Box>
        </Modal>
     );
}
 
export default DeleteModal;