import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { getToken } from '../../utils/Common';
import { Apidata } from '../../data/data'
import FormModel from '../models/FormModel';

function Comments(props) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function loadApiData() {
        
        const apipath = Apidata.api;
        const token = getToken();
        // display form data on success
        setError(null);
        setLoading(true);
        axios.get(apipath + 'v1/comment',
            { headers: { "Authorization": `Bearer ${token}` }, params: { postalId: props.postalId } })
            .then(response => {
                const result = response.data;
                //alert(result);
                console.log(result);
                setComments(result);
                setLoading(false);
                //console.log(postals)
            }).catch(error => {
                setLoading(false);
               // if (error.response.status === 401) setError(error.response.data.message);
               // else setError("Something went wrong. Please try again later.");
            });
    }

    useEffect(() => {
        loadApiData();
        return () => {

        }
    }, [])
    

    return (
        <>
            <FormModel id={props.postalId} onChange={loadApiData} />
            {comments && comments.map((comment) => (
                <Paper style={{ background: '#E8F5E9', marginBottom:10 }}>
                    
                    <Grid container >
                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" >{comment.comment}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="body2" style={{color:'#4a148c'}}>{comment.commentedUser.fullName}
                   <span style={{color:'#4a148c',fontSize:10, marginLeft:10}}>{comment.commentedUser.position}</span> </Typography>
                        </Grid>
                    </Grid>
                </Paper>

            ))}



        </>
    )
}

export default Comments
