import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


import { useDispatch } from 'react-redux';

//DB
import { userActions } from '../redux/modules/user';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function SimpleModal(props) {
  const [statusMessage, setStatus] = React.useState(props.status);

  const dispatch = useDispatch();

  const changeStatus = (n) => {
    setStatus(n.target.value);
    console.log(n)
  };

  const editStatusMsg = () => {
    dispatch(userActions.editStatusMsg({"statusMessage":statusMessage}));
  }

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <input style={{width:"100%"}} type="textarea" rows='4' id="status" label="status" value={statusMessage}
      onChange={changeStatus}></input>
      <button style={{backgroundColor:"skyblue", border:"1px solid navy", padding:"3px", marginTop:"5px", borderRadius:"5px"}} onClick={editStatusMsg}>수정 완료</button>
    </div>
  );

  return (
    <div>
      <text onClick={handleOpen}>
      <span style={{color:"blue", fontSize:"small"}}>(상태메세지 수정)</span>
      <p>{props.status}</p>
      </text>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}