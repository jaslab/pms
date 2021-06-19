import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Apidata, LetterFormdata } from '../../data/data'
import axios from 'axios';
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getToken, getId, getUsers } from '../../utils/Common';
import Moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import SaveIcon from '@material-ui/icons/Save';
import { PostalContext } from '../../context/PostalContext';
import Comments from '../contents/Comments';
import Select from 'react-select'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Save from '@material-ui/icons/Save'

import CommentFileuploadform from '../forms/CommentForm';
import AssignForm from '../forms/AssignForm';
import FormModel from '../models/FormModel';
import CloseForm from '../forms/CloseForm';
import ImageComponent from '../../img/ImageComponent';



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


export default function AoDetailContent() {
    let data = useLocation();
    const { postals } = useContext(PostalContext);
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postalList, setPostalList] = useState([]);
    const [advanceSearch, setAdvanceSearch] = useState(false);
    const [simpleSearch, setSimpleSearch] = useState(true);
    const [result, setResult] = useState(true);
    const [postal, setPostal] = useState(data.state);
    const [opt, setOpt] = useState();
    
    function hanndleAssigned() {
        history.push("/ao_dashboard");
    }

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
        const users = getUsers();

        const options = [];
        JSON.parse(users).map((u) => (
            options.push(
                { value: u.id, label: u.fullName + ' (' + u.position + ' )' }
            )
        )
        );
        setOpt(options);


        return () => {
        }
    }, [])

    let searchschema = yup.object().shape({
        key1: yup.string().required(),
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: searchschema
    });


    function onSubmitAssign(data) {
        alert(data);
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
                                    {LetterFormdata.letter_reg_number + " : "}<span style={{ color: '#6d1b7b' }}> {postal.id}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.letter_cheque_title}<span style={{ color: '#6d1b7b' }}> {postal.letterTitle}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.postal_type}<span style={{ color: '#6d1b7b' }}> {postal.postalType}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.res_mode}<span style={{ color: '#6d1b7b' }}> {postal.receivedMode}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.past_ref}<span style={{ color: '#6d1b7b' }}> {postal.pastRefNo}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.recived_date}<span style={{ color: '#6d1b7b' }}> {Moment(postal.receivedDate).format('YYYY-MM-DD')}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.sender_name}<span style={{ color: '#6d1b7b' }}> {postal.senderName}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.sender_address}<span style={{ color: '#6d1b7b' }}> {postal.senderAddress}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.receiver_name}<span style={{ color: '#6d1b7b' }}> {postal.receiverName}</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='body1' align='left'>
                                    {LetterFormdata.receiver_address}<span style={{ color: '#6d1b7b' }}> {postal.receiverAddress}</span>
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
                                {
                               // <img
                               //     src={process.env.PUBLIC_URL + '/docs/jass.jpg'}
                               //     className={classes.preview}
                               // />
                                }
                                {postal.fileName &&  <ImageComponent fileName={postal.fileName}/>}
                               
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
                <Grid item xs={12} sm={4} style={{ marginLeft: 10 }}>

                    <AssignForm
                        opt={opt}
                        movetype="NEW"
                        postalid={postal.id}
                        onChange={hanndleAssigned} />

                    <CloseForm
                        movetype="CLOSE"
                        postalid={postal.id}
                        onChange={hanndleAssigned} />

                    <Paper className={classes.paper} elevation={5} style={{ padding: 20 }}>

                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <Typography variant='h6' align='left'>
                                    {LetterFormdata.comments}
                                </Typography>
                               
                            </Grid>
                            <Grid item xs={12} sm={12}  style={{ marginTop: 10 }}>
                                <Comments postalId={postal.id}/>
                            </Grid>

                        </Grid>
                        
                    </Paper>

                </Grid>



            </Grid>
        </>
    )
}
