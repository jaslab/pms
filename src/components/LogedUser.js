import React from 'react'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { getFullname } from '../utils/Common'

function LogedUser() {
    const userName = getFullname();
    return (
        <>
            <AccountCircle />
            <Typography variant="body1" style={{ color: "#E1BEE7", marginLeft: 10 }}>
                {userName}
            </Typography>
        </>
    )
}

export default LogedUser
