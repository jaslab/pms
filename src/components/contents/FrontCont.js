import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Letterform from '../forms/Letterform';
import { Tabsdata } from '../../data/data'
import Chequeform from '../forms/Chequeform';
import Emailform from '../forms/Emailform';
import Faxform from '../forms/Faxform';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: "30px"
    },
    root: {
        flexGrow: 1,
        backgroundColor: "#fff",
      },
}));

function FrontCont() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            
                <Tabs 
                value={value} 
                onChange={handleChange} 
                textColor="#fff"
                centered
                >
                    <Tab label={Tabsdata.letter} {...a11yProps(0)} />
                    <Tab label={Tabsdata.cheque} {...a11yProps(1)} />
                    <Tab label={Tabsdata.email} {...a11yProps(2)} />
                    <Tab label={Tabsdata.fax} {...a11yProps(3)} />
                </Tabs>
            
            <TabPanel value={value} index={0}>
                <Letterform/>
      </TabPanel>
            <TabPanel value={value} index={1}>
                <Chequeform/>
      </TabPanel>
            <TabPanel value={value} index={2}>
                <Emailform/>
      </TabPanel>
      <TabPanel value={value} index={3}>
                <Faxform/>
      </TabPanel>
        </div>
    )
}

export default FrontCont
