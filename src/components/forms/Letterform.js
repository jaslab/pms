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
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId } from '../../utils/Common';
import Fileuploadform from './Fileuploadform';
import PostalResult from '../Resultview/PostalResult';

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



function Letterform() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [viewform, setViewform] = useState(true);
    const [viewuload, setViewuload] = useState(false);
    const [postaldata, setPostaldata] = useState(null);
    const date = new Date();

    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    let letterschema = yup.object().shape({
        past_ref: yup.string(),
        reg_number: yup.string(),
        postoffice: yup.string(),
        letter_title: yup.string(),
        sender_name: yup.string(),
        sender_address: yup.string(),
        receiver_name: yup.string(),
        receiver_address: yup.string()
        //recived_date: yup.date().required,
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: letterschema
    });

    function closeUploadForm() {
        setViewuload(false);
        setViewform(true);
    }

    function onSubmit(data) {
        const apipath = Apidata.api;
        const token = getToken();
        const userId = getId();
        setError(null);
        setLoading(true);
        axios.post(apipath + 'v1/postal', {
            postalType: "POSTAl",
            receivedMode: data.res_mode,
            secret: data.secret,
            receivedDate: data.recived_date,
            regPostNumber: data.reg_number,
            postOfficeName: data.postoffice,
            pastRefNo: data.past_ref,
            letterTitle: data.letter_title,
            senderName: data.sender_name,
            senderAddress: data.sender_address,
            receiverName: data.receiver_name,
            receiverAddress: data.receiver_address,
            postalStatus: "NEW",
            enteredUserId: userId,
            attachment: data.attacments
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                setPostaldata(response.data)
                setLoading(false);
                setViewform(false);
                setViewuload(true);
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
            {/*Form area*/}
            { viewform && <><Typography variant="h6" gutterBottom>
                {LetterFormdata.title}
            </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="res_mode" defaultValue="REG">
                                    <FormControlLabel
                                        default
                                        name="res_mode"
                                        inputRef={register}
                                        value="REG"
                                        control={<Radio color="primary" />}
                                        label={LetterFormdata.registered_post} />
                                    <FormControlLabel
                                        value="NOR"
                                        name="res_mode"
                                        inputRef={register}
                                        control={<Radio color="primary" />}
                                        label={LetterFormdata.normal_post} />
                                    <FormControlLabel
                                        name="res_mode"
                                        inputRef={register}
                                        value="BYH"
                                        control={<Radio color="primary" />}
                                        label={LetterFormdata.byhand_post} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="secret" defaultValue="NO" >
                                    <FormControlLabel
                                        name="secret"
                                        inputRef={register}
                                        value="NO"
                                        control={<Radio color="primary" />}
                                        label={LetterFormdata.not_secret} />
                                    <FormControlLabel
                                        name="secret"
                                        inputRef={register}
                                        value="YES"
                                        control={<Radio color="primary" />}
                                        label={LetterFormdata.secret} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="recived_date"
                                name="recived_date"
                                label={LetterFormdata.recived_date}
                                type="date"
                                inputRef={register}
                                //error={errors.recived_date ? true : false}
                                defaultValue={formatedDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                error={errors.past_ref ? true : false}
                                id="past_ref"
                                name="past_ref"
                                inputRef={register}
                                label={LetterFormdata.past_ref}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                error={errors.reg_number ? true : false}
                                id="reg_number"
                                name="reg_number"
                                inputRef={register}
                                label={LetterFormdata.reg_number}
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                error={errors.postoffice ? true : false}
                                id="postoffice"
                                name="postoffice"
                                inputRef={register}
                                label={LetterFormdata.postoffice}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.letter_title ? true : false}
                                id="letter_title"
                                name="letter_title"
                                inputRef={register}
                                label={LetterFormdata.letter_title}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="sender_name"
                                name="sender_name"
                                inputRef={register}
                                label={LetterFormdata.sender_name}
                                fullWidth
                                error={errors.sender_name ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="sender_address"
                                name="sender_address"
                                inputRef={register}
                                label={LetterFormdata.sender_address}
                                fullWidth
                                error={errors.sender_address ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField

                                id="receiver_name"
                                name="receiver_name"
                                inputRef={register}
                                label={LetterFormdata.receiver_name}
                                fullWidth
                                error={errors.receiver_name ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="receiver_address"
                                name="receiver_address"
                                inputRef={register}
                                label={LetterFormdata.receiver_address}
                                fullWidth
                                error={errors.receiver_address ? true : false}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="attacments" value={true} inputRef={register} />}
                                label={LetterFormdata.attachments}
                            />
                        </Grid>
                        <Grid container justify="flex-end">
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
                </form>
            </>
            }
            {/* end form area */}
            {/* upload area */}
            {viewuload &&
                <>
                    <PostalResult {...postaldata}/>
                    <Fileuploadform {...postaldata}/>
                    
                            <Button mt={5}
                                type="button"
                                onClick={closeUploadForm}
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<CloseIcon />}
                            >
                                {LetterFormdata.finish}
                            </Button>
                        
                    {/* end upload area */}
                </>
            }
        </Paper>
    )
}

export default Letterform
