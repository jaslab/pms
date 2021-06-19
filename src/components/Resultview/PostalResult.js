import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { LetterFormdata } from '../../data/data'

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F3E5F5',
        padding: "5px",
        color: '#000',
        width: 900,
        height: 70,
        margin: 5
    },

}));

function PostalResult(props) {
    const classes = useStyles();
    return (
        <>
            <Paper className={classes.paper} elevation={5}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography align="left" style={{ padding: 2 }}>
                            {LetterFormdata.letter_reg_number+": "}{props.id}
                        </Typography>
                        <Grid item xs={12}>
                        <Typography align="left" style={{ padding: 2 }}>
                            {LetterFormdata.letter_title+": "}{props.letterTitle}
                        </Typography>
                    </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default PostalResult
