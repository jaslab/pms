import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { LetterFormdata, Apidata } from '../../data/data'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId } from '../../utils/Common';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "30px"

    },
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function Faxform() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const date = new Date();
    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    let faxschema = yup.object().shape({
        past_ref: yup.string(),
        sender_fax: yup.string(),
        letter_title: yup.string(),
        sender_name: yup.string(),
        sender_address: yup.string(),
        receiver_name: yup.string(),
        receiver_address: yup.string()
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: faxschema
    });

    function onSubmit(data) {
        const apipath = Apidata.api;
        const token = getToken();
        const userId = getId();
        setError(null);
        setLoading(true);
        axios.post(apipath + 'v1/postal', {
            postalType: "FAX",
            receivedDate: data.recived_date,
            letterTitle: data.letter_title,
            fax: data.sender_fax,
            senderName: data.sender_name,
            senderAddress: data.sender_address,
            receiverName: data.receiver_name,
            receiverAddress: data.receiver_address,
            postalStatus: "NEW",
            enteredUserId: userId,
            attachment: data.attacments
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                setLoading(false);
                alert("Saved");
            }).catch(error => {
                setLoading(false);
                alert(error);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("Something went wrong. Please try again later.");
            });
    }
    return (
        <Paper className={classes.paper} elevation={5}>

            <Typography variant="h6" gutterBottom>
                {LetterFormdata.title}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="recived_date"
                            name="recived_date"
                            inputRef={register}
                            label={LetterFormdata.recived_date}
                            type="date"
                            defaultValue={formatedDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="past_ref"
                            name="past_ref"
                            inputRef={register}
                            label={LetterFormdata.past_ref}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            required
                            id="sender_fax"
                            name="sender_fax"
                            inputRef={register}
                            label={LetterFormdata.sender_fax}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="letter_title"
                            name="letter_title"
                            inputRef={register}
                            label={LetterFormdata.letter_title}
                            fullWidth
                            autoComplete="shipping address-level2"
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField

                            id="sender_name"
                            name="sender_name"
                            inputRef={register}
                            label={LetterFormdata.sender_name}
                            fullWidth
                            autoComplete="shipping postal-code"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField

                            id="sender_address"
                            name="sender_address"
                            inputRef={register}
                            label={LetterFormdata.sender_address}
                            fullWidth
                            autoComplete="shipping country"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField

                            id="receiver_name"
                            name="receiver_name"
                            inputRef={register}
                            label={LetterFormdata.receiver_name}
                            fullWidth
                            autoComplete="shipping postal-code"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField

                            id="receiver_address"
                            name="receiver_address"
                            inputRef={register}
                            label={LetterFormdata.receiver_address}
                            fullWidth
                            autoComplete="shipping country"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                            label={LetterFormdata.attachments}
                        />
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            type="submit"
                        >
                            {LetterFormdata.save}
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper>
    )
}

export default Faxform
