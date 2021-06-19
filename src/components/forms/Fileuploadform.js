import React from 'react'
import clsx from 'clsx';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import { useDropzone } from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import { LinearProgress, TextareaAutosize } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { LetterFormdata,Apidata } from '../../data/data'
import axios from 'axios';
import { getToken, getId } from '../../utils/Common';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    dropzone: {
        height: 300,
        background: "#efefef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "dashed",
        borderColor: "#aaa"
    },
    preview: {
        width: 250,
        height: 250,
        margin: "auto",
        display: "block",
        marginBottom: 16,
        objectFit: "contain"
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function Fileuploadform(props) {

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [file, setFile] = React.useState();
    const [preview, setPreview] = React.useState();
    const [presentage, setPresentage] = React.useState(0);

    const timer = React.useRef();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    const uploadFile = async() => {
        const api = Apidata.api;
        const token = getToken();
        //const token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmcm9udCIsImlhdCI6MTYwODM1NjgyOCwiZXhwIjoxNjA4NDQzMjI4fQ.lCJJn08EXGwV-0YLirG6q6HcaYRI6gbkaNT4ZBFfGMGkoL58pgz-QF3SK1UyAJ3sEs_dGAoP5IYr6r9kJZ-EYg"
        const userId = getId();
        setLoading(true);
        try{
            const formData=new FormData();
            formData.append("file",file);
            formData.append("postal_id",props.id);
            const APIURL=api+"v1/upload";
            const response = await axios.post(
                APIURL,
                formData,
                { headers: { "Authorization": `Bearer ${token}` } },
                {
                onUploadProgress:(progressEvent)=>{
                    const presentCompleted = Math.round(progressEvent.loaded * 100)/progressEvent.total
                    setPresentage(presentCompleted)
                }
            })
            setLoading(false);
            setSuccess(true);
        }catch(err){
            setLoading(false);
            alert(err.message)
        }

    }

    const onDrop = React.useCallback((acceptedFiles) => {
        console.log(acceptedFiles)
        setFile(acceptedFiles[0]);
        const previewUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreview(previewUrl);

    }
    );
    const { getRootProps, getInputProps } = useDropzone(
        {
            multiple: false,
            onDrop,
        });

    const { ref, ...rootProps } = getRootProps()



    return (
        <>
            <Container maxWidth="md">
                <Paper elevation={0}>
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography align="center" style={{ padding: 5 }}>
                                {LetterFormdata.upload_file}
                        </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 16 }}>
                            <RootRef rootRef={ref}>
                                <Paper {...rootProps} className={classes.dropzone}>
                                    <input {...getInputProps()} />
                                    {LetterFormdata.drop_item_here}
                                </Paper>
                            </RootRef>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 16 }}>
                            <Typography align="center" variant="subtitle1">
                            {LetterFormdata.preview}
                            </Typography>
                            <img
                                onLoad={() => URL.revokeObjectURL(preview)}
                                className={classes.preview}
                                src={preview || "https://via.placeholder.com/250"}
                            />
                            <Divider />
                            {/* */}
                            {file && <><Grid container style={{ marginTop: 16 }} alignItems="center" >
                                <div className={classes.wrapper}>
                                    <Fab
                                        aria-label="save"
                                        color="primary"
                                        className={buttonClassname}
                                        onClick={uploadFile}
                                    >
                                        {success ? <CheckIcon /> : <SaveIcon />}
                                    </Fab>
                                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                                </div>
                            </Grid>
                            <Grid item={10}>
                                {file && <Typography variant="body">{file.name} </Typography>}
                                <div>
                                    <LinearProgress variant="determinate" value={presentage} />
                                </div>
                                <div align="center" justifyContent="center">
                                    <Typography variant="body">{presentage}%</Typography>
                                </div>
                            </Grid></>}
                          {/* */}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

        </>
    )
}

export default Fileuploadform

