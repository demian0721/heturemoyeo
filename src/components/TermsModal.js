// LIBRARY
import React from 'react';
import styled from "styled-components";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Autorenew } from '@material-ui/icons';

//Elements
import { Grid, Button, CheckBox } from "../elements/index";

//HISTORY
import { history } from "../redux/configStore";

// PAGES
import { Terms } from '../pages/index';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
    const top = 50;
    const left = 50; 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'fixed',
    left: "50%",
    top: "50%",
    
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 300,
    height: 450,
    backgroundColor: theme.palette.background.paper,
    border: 0,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
}));

export default function SimpleModal() {
  
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
//   const authorization =  () => {
//     Promise.resolve()
//       .then(() => {
//         return (window.location.href = 'http://13.125.79.33/api/social/kakao'); 
//       })
//       .then(() => {
//         return history.replace('/auth');
//       });
//     };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Wrapper>
      <Terms handleClose={handleClose}/>
      </Wrapper>
    </div>
  );

  const [check, setCheck] = React.useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <div>
        <Grid padding="5px 0px 27px">
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              bg="#FFFFFF"
              hoverColor="#ccc"
              color="inherit"
              onClick={handleOpen}
            >
              <CheckBox onChange={onChange} checked={check}>
                약관에 동의합니다.
              </CheckBox>
            </Button>
          </Grid>
      
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

const Wrapper = styled.div`
    /* text-align: center;
    overflow: hidden; */
    
`;

