import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { getToken } from '../../utils/Common';
import { Apidata } from '../../data/data';
import axios from 'axios';
import Moment from 'moment';


function LetterPath(props) {
    const [track, setTrack] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData(props.postalid);
        return () => {

        }
    }, [])



    function loadData(pid) {
        const apipath = Apidata.api;
        const token = getToken();
        alert(pid);
        setError(null);
        setLoading(true);
        axios.get(apipath + 'v1/postal_movement',
            { headers: { "Authorization": `Bearer ${token}` }, params: { postalId: pid } })
            .then(response => {
                const result = response.data;
                console.log(result);
                setTrack(result);
                setLoading(false);
                //console.log(postals)
            }).catch(error => {
               
                setLoading(false);
            });
    }

    return (
        <>
            <Paper style={{ background: '#E8F5E9', marginBottom: 10 }}>

                <Grid container >
                    <Grid item xs={12} sm={12}>
                        <Typography variant="subtitle1" >Letter Path</Typography>
                    </Grid>
                    {
                        track && track.map((t) => (
                            <Grid item xs={12} sm={12}>
                                <Typography variant="subtitle1" >{t.receiver.fullName+ " - "+Moment(t.openedTime).format('YYYY-MM-DD hh-mm')}</Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            </Paper>
        </>
    )
}

export default LetterPath
