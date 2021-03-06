// LIBRARY
import React from 'react'

// ELEMENTS
import { Grid, Button } from '../elements'

// MATERIAL-UI
import MyLocationIcon from '@material-ui/icons/MyLocation';

const MyLocation = ({ clickEvent, ...props }) => {
    return (
        < Grid
            style={{ position: 'fixed', top: '8%', left: '8%', zIndex: 99 }
            }
            width="auto"
            height="auto"
            overflow="visible"
        >
            <Button
                shadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
                padding="12px"
                margin="0 0 10px"
                radius="100%"
                {...clickEvent}
            >
                <MyLocationIcon />
            </Button>
        </Grid >

    )
}

MyLocation.defaultProps = {
    clickEvent: () => {}
};

export default MyLocation
