import React, { useState, useEffect } from 'react';
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
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import * as yup from 'yup';
import { useForm } from "react-hook-form";

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


export default function CgSearchContent() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postalList, setPostalList] = useState([]);
    const [advanceSearch, setAdvanceSearch] = useState(false);
    const [simpleSearch, setSimpleSearch] = useState(true);
    const [result, setResult] = useState(true);

    const [state, setState] = React.useState({
        checkedA: false,
    });
    const handleChange = (event) => {
        if (event.target.name == 'checkedA') {
            setAdvanceSearch(!advanceSearch)
        }

        setState({
            ...state, [event.target.name]: event.target.checked
        });
    };

    useEffect(() => {
        //loadApiData();
        return () => {

        }
    }, [])

    let searchschema = yup.object().shape({
        key1: yup.string().required(),
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: searchschema
    });


    function onSubmit(data) {
        const apipath = Apidata.api;
        const token = getToken();
        setError(null);
        setLoading(true);
        axios.get(apipath + 'v1/postal/search',
            { headers: { "Authorization": `Bearer ${token}` }, params: { key1: data.key1 } })
            .then(response => {
                setResult(true);
                const result = response.data;
                console.log(result);
                setPostalList(result);
                setLoading(false);
            }).catch(error => {
                setResult(false);
                setPostalList();
                setLoading(false);
                //alert(error);
                // if (error.response.status === 401) setError(error.response.data.message);
                // else setError("Something went wrong. Please try again later.");
            });
    }
    return (
        <>

            {
                simpleSearch &&
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Paper className={classes.paper} elevation={5}>

                        <Grid container>
                            <Grid item xs={12} sm={9} style={{ paddingLeft: 30, paddingTop: 30 }} >
                                <Typography variant='h6' align='left'>
                                    {searchdata.search}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3} style={{ paddingLeft: 30, paddingTop: 30 }} >

                                {searchdata.advanced_search}

                                <Switch
                                    checked={state.checkedA}
                                    onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />

                            </Grid>
                            <Grid item xs={12} sm={9} style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 20 }} >
                                <TextField
                                    //error={errors.letter_title ? true : false}
                                    id="key1"
                                    name="key1"
                                    inputRef={register}
                                    //inputRef={register}
                                    label={searchdata.search}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3} sm={3} style={{ paddingTop: 15, paddingBottom: 20 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SearchIcon />}
                                >
                                    {searchdata.search}
                                </Button>
                            </Grid>
                        </Grid>

                    </Paper>
                </form>
            }
            {/* Advanced search*/}
            {
                advanceSearch &&
                <Paper className={classes.paper} elevation={5}>
                    <form>
                        <Grid container style={{ paddingRight: 30 }}>
                            <Grid item xs={12} sm={12} style={{ paddingLeft: 30, paddingTop: 30 }} >
                                <Typography variant='h6' align='left'>
                                    {searchdata.advanced_search}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 20 }} >
                                <TextField
                                    //error={errors.letter_title ? true : false}
                                    id="letter_title"
                                    name="letter_title"
                                    //inputRef={register}
                                    label={searchdata.search}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 20 }} >
                                <TextField
                                    //error={errors.letter_title ? true : false}
                                    id="letter_title"
                                    name="letter_title"
                                    //inputRef={register}
                                    label={searchdata.search}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 20 }} >
                                <TextField
                                    //error={errors.letter_title ? true : false}
                                    id="letter_title"
                                    name="letter_title"
                                    //inputRef={register}
                                    label={searchdata.search}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 20 }} >
                                <TextField
                                    //error={errors.letter_title ? true : false}
                                    id="letter_title"
                                    name="letter_title"
                                    //inputRef={register}
                                    label={searchdata.search}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={9} style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 20 }} >

                            </Grid>
                            <Grid item xs={3} sm={3} style={{ paddingTop: 15, paddingBottom: 20 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SearchIcon />}
                                >
                                    {searchdata.search}
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Paper>

            }
            {/* End Advanced search*/}
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
                        
                            < TableBody >
                                {
                                    postalList.map((postal) => (
                                        <TableRow key={postal.id}>
                                            <TableCell component="th" scope="row">
                                                {postal.letterTitle}
                                            </TableCell>
                                            <TableCell align="right">{postal.senderName}</TableCell>
                                            <TableCell align="right">{postal.postalType}</TableCell>
                                            <TableCell align="right">{postal.id}</TableCell>
                                            <TableCell align="right">{Moment(postal.receivedDate).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell><Edit /></TableCell>
                                            <TableCell><Pageview /></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        
                        
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}
