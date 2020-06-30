import React from 'react'
import {Entity} from 'draft-js'

class LinkDecorator extends React.Component {

    render() {
        const {url, newTab} = Entity.get(this.props.entityKey).getData();
        return <a href={url} target={newTab ? '_blank' : ''}>
            {this.props.children}
        </a>
    }

}

export  default LinkDecorator ;