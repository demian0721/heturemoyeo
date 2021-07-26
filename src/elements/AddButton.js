import React from 'react';

// ELEMENTS
import { Button, Grid } from '../elements/index';

// HISTORY
import { history } from '../redux/configStore';

// ICON
import AddIcon from '@material-ui/icons/Add';

const AddButton = (props) => {
    return (
        <Grid
            style={{ position: 'fixed', bottom: '30px', right: '3%', zIndex: 99 }}
            width="60px"
            height="130px"
            overflow="visible"
        >
            <Button
                shadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
                margin="0 0 10px"
                radius="50%"
                clickEvent={() => {
                    history.push('/write');
                }}
            >
                <AddIcon />
            </Button>
        </Grid>
    );
};

AddButton.defaultProps = {};

export default AddButton;
