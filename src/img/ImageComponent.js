import React, {useEffect, useState, makeStyles} from 'react'


function ImageComponent(props) {

    const [component, setComponent] = useState();

    useEffect(() => {
        //const images = require.context('../img', true);
        //import('./01.jpg').then(image => setComponent());
        import('./'+props.fileName).then(image => setComponent(image.default));
    }, [])

   
    return (
        <>
            <img src={component} style={{width:600,height:600}} >
            </img>    
        </>
    )
}

export default ImageComponent
