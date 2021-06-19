import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { searchdata, Apidata, LetterFormdata } from '../../data/data'
import Edit from '@material-ui/icons/Edit';
import Pageview from '@material-ui/icons/Pageview';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId } from '../../utils/Common';
import Moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    paper: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 900,
    },
    preview: {
        width: 700,
        height: 700,
        margin: "auto",
        display: "block",
        marginBottom: 16,
        objectFit: "contain"
    },
});


export default function CgDetailContent() {
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
            <Grid container style={{ padding: 20 }}>
                <Grid item xs={12} sm={7} style={{ marginLeft: 40 }}>
                    <Paper className={classes.paper} elevation={5} style={{ padding: 20 }}>

                        <Grid container>

                            <Grid item xs={12} sm={12}>
                                <Typography variant='h6' align='left'>
                                    {LetterFormdata.postaldetails}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.letter_reg_number}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.letter_cheque_title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.postal_type}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.res_mode}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.past_ref}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.recived_date}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.sender_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.sender_address}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.receiver_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.receiver_address}
                                </Typography>
                            </Grid>



                        </Grid>

                    </Paper>
                    <Paper className={classes.paper} elevation={5} style={{ padding: 20 }}>

                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='h6' align='left'>
                                    {LetterFormdata.postalimage}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            <img
                                //onLoad={() => URL.revokeObjectURL(preview)}
                                className={classes.preview}
                                src={ "https://via.placeholder.com/250"}
                            />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} style={{ marginLeft: 10 }}>

                    <Paper className={classes.paper} elevation={5} style={{ padding: 20 }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} style={{ marginBottom: 30 }}>
                                <Typography variant='h6' align='left'>
                                    {LetterFormdata.assign}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    error={errors.past_ref ? true : false}
                                    id="past_ref"
                                    name="past_ref"
                                    inputRef={register}
                                    label={LetterFormdata.comment}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    error={errors.past_ref ? true : false}
                                    id="past_ref"
                                    name="past_ref"
                                    inputRef={register}
                                    label={LetterFormdata.comment}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} style={{ marginTop: 30 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                    {LetterFormdata.save}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper className={classes.paper} elevation={5} style={{ padding: 20 }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} style={{ marginBottom: 30 }}>
                                <Typography variant='h6' align='left'>
                                    {LetterFormdata.comments}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Paper>

                </Grid>

            </Grid>
        </>
    )
}
