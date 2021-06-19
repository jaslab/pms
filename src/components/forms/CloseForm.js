import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Apidata, LetterFormdata } from '../../data/data'
import Done from '@material-ui/icons/Done'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { getToken, getId, getUsers } from '../../utils/Common';
import * as yup from 'yup';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
});

function CloseForm(props) {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
   
    let assignschema = yup.object().shape({
        ref_comment: yup.string(),
    });

    const { register, handleSubmit, control, setValue, errors } = useForm({
        validationSchema: assignschema
    });

    function onSubmitAssign(data) {
        const apipath = Apidata.api;
        const token = getToken();
        const userId = getId();
            setError(null);
            setLoading(true);
            axios.post(apipath + 'v1/postal_movement', {
                moveType: props.movetype,
                postalId: props.postalid,
                receiverId: userId,
            }, { headers: { "Authorization": `Bearer ${token}` } })
                .then(response => {
                    setLoading(false);
                    alert("Saved");
                    props.onChange();
                }).catch(error => {
                    setError(true);
                    setLoading(false);
                    alert(error);
                });
                
        
        
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmitAssign)}>
            <Paper className={classes.paper} elevation={5} style={{ padding: 20 }}>
                <Grid container>
                    <Grid item xs={12} sm={12} style={{ marginBottom: 5 }}>
                        <Typography variant='h6' align='left'>
                            {LetterFormdata.colse_postal}
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={12}>
                        <TextField style={{ marginTop: 20 }}
                            error={errors.ref_comment ? true : false}
                            id="ref_comment"
                            name="ref_comment"
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
                            startIcon={<Done />}
                        >
                            {LetterFormdata.close}
                        </Button>
                        {
                            loading &&
                            <CircularProgress />

                        }
                    </Grid>
                </Grid>
            </Paper>
        </form>
    )
}

export default CloseForm
