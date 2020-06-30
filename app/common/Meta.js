import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = (props) => {
    const { title } = props
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="shortcut icon" type="image/png" href="../img/images/logoS.png" data-react-helmet="true"/>
            <meta name="description" content="Articles" data-react-helmet="true"/>
            <meta name="description" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" data-react-helmet="true"/>
            <link rel="canonical" href="https://ournet.news" />
            <meta property="og:locale" content="en_US" data-react-helmet="true"/>
            <meta property="og:type" content="website" data-react-helmet="true"/>
            <meta property="og:title" content="OurNet - A Place for conversation" data-react-helmet="true"/>
            <meta property="og:description" content="Articles" data-react-helmet="true" />
            <meta property="og:url" content="https://ournet.news" data-react-helmet="true"/>
            <meta property="og:site_name" content="OurNet" data-react-helmet="true"/>
            <meta property="og:image" content="yourimage.jpg" />
            <meta property="og:image:secure_url" content="yourimage.jpg" />
            <meta property="og:image:width" content="1280" />
            <meta property="og:image:height" content="720" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content="Articles" />
            <meta name="twitter:title" content="My app | Config" />
            <meta name="twitter:image" content="yourimage.png" />
        </Helmet>
    );
}

export default Meta;