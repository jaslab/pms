import React from 'react'
import { appbardata } from '../../data/data'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Logout from '../../pages/Logout';
import LogedUser from '../../components/LogedUser';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#4a148c',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    links: {
        color: "#fff",

    }
}));


function AppbarFrontSearch() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MailOutlineIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {appbardata.sitename}
                    </Typography>
                    <Button className={classes.links} component={Link} to="/front_dashboard" variant="" color="#fff">
                        {appbardata.dashboard}
                    </Button>
                    <Logout/>
                    <LogedUser/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default AppbarFrontSearch
