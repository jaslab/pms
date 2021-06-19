import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { searchdata, Apidata } from '../../data/data'
import Edit from '@material-ui/icons/Edit';
import Pageview from '@material-ui/icons/Pageview';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId } from '../../utils/Common';
import Moment from 'moment';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    paper: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 900,
    }
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



const rows = [
    
];

function FrontSearchContent() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postalList, setPostalList] = useState([]);

    useEffect(() => {
        loadApiData();
        return () => {
            
        }
    }, [])

    function loadApiData() {
        const apipath = Apidata.api;
        const token = getToken();
        
        // display form data on success
        setError(null);
        setLoading(true);
        axios.get(apipath +'v1/postal/new', { headers: { "Authorization": `Bearer ${token}`} })
        .then(response => {
            const result = response.data;
            console.log(result);
            setPostalList(result);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <Paper className={classes.paper} elevation={5}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell >{searchdata.res_title}</TableCell>
                            <TableCell align="right">{searchdata.res_sender}</TableCell>
                            <TableCell align="right">{searchdata.res_type}</TableCell>
                            <TableCell align="right">{searchdata.res_id}</TableCell>
                            <TableCell align="right">{searchdata.res_date}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {postalList.map((postal) => (
                            <TableRow key={postal.id}>
                                <TableCell component="th" scope="row">
                                    {postal.letterTitle}
                                </TableCell>
                                <TableCell align="right">{postal.senderName}</TableCell>
                                <TableCell align="right">{postal.postalType}</TableCell>
                                <TableCell align="right">{postal.id}</TableCell>
                                <TableCell align="right">{Moment(postal.receivedDate).format('YYYY-MM-DD')}</TableCell>
                                <TableCell><Edit/></TableCell>
                                 <TableCell><Pageview/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default FrontSearchContent
