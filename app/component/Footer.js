import React from 'react';
import '../../style/component/Footer.css';
import styled from 'styled-components';
import GlobalStyle from '../component/GlobalStyle'
import PropTypes from 'prop-types';

const FooterContainer = styled.div`
    padding: 50px;
    background: transparent linear-gradient(180deg, #BED1E600 0%, #BED1E6BF 100%) 0% 0% no-repeat padding-box;
    align-items: center;
    
    @media screen and (max-width: 480px) {
    padding: 50px 35px;
    flex-flow: column;
    }
`;

const Img = styled.img`
    width: 137px;
    height: 134px;
`;

const FooterAbt = styled.div`
    min-height: 0px;
    margin: 0px 20px;
    @media screen and (max-width: 480px) {
    margin: 20px 0;
    }
`;

const FooterBoxTitle = styled.label`
    font: bold 14px/17px Lato;
    letter-spacing: 0;
    color: #024B99;
    margin-bottom: 10px;
    display: block;
    @media screen and (max-width: 480px) {
    text-align: center;
    }
`;

const FooterSocial = styled.div`
    min-height: 70px;
    /* margin: 0px 20px; */
    @media screen and (max-width: 480px) {
    margin: 20px 0;
    }
`;

const FooterBoxSubTitle = styled.label`
    font: bold 14px/17px Lato;
    letter-spacing: 0;
    color: #024B99;
    margin-bottom: 10px;
    display: block;
    @media screen and (max-width: 480px) {
    text-align: center;
    }
`;

const FooterSocialBtn = styled.div`
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 480px) {
    margin-left: 46px;
    }
`;

const FooterSocialIcon = styled.span`
    margin-right: 10px;
    cursor: pointer;
    font: 25px/0px Lato;
    margin-right: 50px;
    margin-top: 15px;
    @media screen and (max-width: 480px) {
    margin-right: 42px;
    }
`;

const FaFaLinkedin = styled.i`
:hover{
    color:#0077b5
}
`;
const FaFaFacebook = styled.i`
:hover{
    color:#4267b2
}
`;
const FaFainstagram = styled.i`
:hover{
    color:#9d1d96
}
`;
const FaFaTwitter = styled.i`
:hover{
    color:#5da9dd
}
`;

class Footer extends React.Component {

    static defaultProps = {
        ournetOnlineLink: 'http://www.ournet.online',
        linkedinLink:'https://www.linkedin.com/company/ournet-ltd/',
        facebookLink: 'https://www.facebook.com/OurNetWorld',
        twitterLink: 'https://twitter.com/ournet_news',
        footerLogo: '../../../img/images/footerlogoB.png',
        linkedinIcon: 'fa fa-linkedin',
        facebookIcon: 'fa fa-facebook',
        instagramIcon: 'fa fa-instagram',
        twitterIcon: 'fa fa-twitter'   
    }
    
    static propTypes = {
        ournetOnlineLink: PropTypes.string.isRequired,
        linkedinLink: PropTypes.string.isRequired,
        facebookLink: PropTypes.string.isRequired,
        twitterLink: PropTypes.string.isRequired,
        footerLogo: PropTypes.string.isRequired,
        linkedinIcon: PropTypes.string.isRequired,
        facebookIcon: PropTypes.string.isRequired,
        instagramIcon: PropTypes.string.isRequired,
        twitterIcon: PropTypes.string.isRequired
    }

    render() {

        const { 
            ournetOnlineLink, 
            linkedinLink, 
            facebookLink, 
            twitterLink, 
            footerLogo, 
            linkedinIcon, 
            facebookIcon, 
            instagramIcon, 
            twitterIcon  
             } = this.props;
             
        return (
            <FooterContainer className="footer-container flexRow evenSpace">
                <a href={ournetOnlineLink}>
                    <Img src={footerLogo} alt="onlogo" name="footerlogo" className="footerlogo" />
                </a>
                <FooterAbt className="footerAbt">
                    <FooterBoxTitle className="footerBoxTitle">The Place For Conversations</FooterBoxTitle>
                </FooterAbt>
                <FooterSocial className="footerSocial">
                    <FooterBoxSubTitle className="footerBoxSubTitle">FOLLOW US</FooterBoxSubTitle>
                    <FooterSocialBtn className="flexRow footerSocialBtn">
                        <FooterSocialIcon className="footerSocialIcon"><a href={linkedinLink} target="_blank"><FaFaLinkedin className={linkedinIcon}></FaFaLinkedin></a></FooterSocialIcon>
                        <FooterSocialIcon className="footerSocialIcon"><a href={facebookLink} target="_blank"><FaFaFacebook className={facebookIcon}></FaFaFacebook></a></FooterSocialIcon>
                        <FooterSocialIcon className="footerSocialIcon"><a href="#"           target="_blank"><FaFainstagram className={instagramIcon} ></FaFainstagram></a></FooterSocialIcon>
                        <FooterSocialIcon className="footerSocialIcon"><a href={twitterLink} target="_blank"><FaFaTwitter className={twitterIcon}></FaFaTwitter></a></FooterSocialIcon>
                    </FooterSocialBtn>
                </FooterSocial>
                <GlobalStyle/>
            </FooterContainer>
            
        )
    }
}

export default Footer;