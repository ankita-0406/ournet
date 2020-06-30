import React from 'react'
import {Image} from 'react-bootstrap'
import {Entity} from 'draft-js'

export default (props) => {
    const {url} = Entity.get(props.entityKey).getData();
    return (
        <Image src={url} style={{width:'100%'}}/>
    );
};