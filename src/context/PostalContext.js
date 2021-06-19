import React, { useReducer, createContext } from 'react';
import {PostalReducer} from '../reducers/PostalReducers'

export const PostalContext = createContext();

export const PostalProvider = (props) => {
    const [postals, dispatch] = useReducer(PostalReducer, []);

    return (
        <PostalContext.Provider value={{postals, dispatch}}>
            {props.children}
        </PostalContext.Provider>
    );
}