import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Container } from 'react-bootstrap';
import '../../style/component/AroundMe.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

const AroundDetails = styled.div`
margin-bottom: 20px;
/* position: relative; */
  display: flex;
  flex-flow: row;
  /* overflow: hidden; */
display:flex;
    flex-flow:row;
justify-content:space-between;
  `;

const Stamp = styled.label`
  font: Bold 10px/18px Lato;
  letter-spacing: 0;
  color: #AAAAAA;
  text-transform: uppercase;
  display: block;
  `;
const Detail = styled.span`
  text-align: left;
  font: 14px/14px Lato;
  letter-spacing: 0;
  color: #024B99;
  display: block;
  margin-top: 5px;
  `;

const AroundBlock = styled.div`
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid-column;
  display: table;
  margin: 0px 20px 40px 20px;
  border-radius: 10px;
  overflow: hidden;
`;
const FlexRow = styled.div`
/* position: relative; */
display: flex;
flex-flow: row;
/* overflow: hidden; */
`;

const AroundMeImg = styled.img`
width: 50%;
`;

const AroundRight = styled.div`
padding: 20px;
background: #fff;
display:flex;
    flex-flow:column;
    justify-content: space-between;
    `;

const AroundTitle = styled.p`
text-align: left;
font: Bold 20px/24px Lato;
letter-spacing: 0;
color: #000000;
margin-top: 0px;
`;

const AroundContent = styled.label`

text-align: left;
    font: 16px/18px Lato;
    letter-spacing: 0;
    color: #000000;

`;

const UpBtn = styled.button`
background: #F9A61B;
height: 40px;
width: 40px;
line-height: 40px;
border-radius: 50%;
border: none;
color: #fff;
cursor: pointer;
font-size: 1.5rem;
margin-top: 75px;
outline: none;
`;

const SecHeader = styled.div`
padding: 50px 0px 0px 0px;
  align-items: flex-end;
  * position: relative; */
  display: flex;
  flex-flow: row;
  /* overflow: hidden; */
  justify-content:space-between;
  `;
const SecName = styled.label`
  text-align: left;
  font: Bold 40px/34px Lato;
  letter-spacing: 0;
  color: #024b99;
  `;
const SecDesc = styled.label`
  text-align: left;
  font: 26px/30px Lato;
  letter-spacing: 0;
  color: #024b99;
  opacity: 1;
  display: block;
  margin-top: 10px;
  `;
class AroundMe extends React.Component {

    scrollup() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <React.Fragment>
                <Header currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="section">

                        <SecHeader>
                            <div className="secTitle">
                                <SecName>Around Me </SecName>
                                <SecDesc>Special communities for support </SecDesc>

                            </div>
                        </SecHeader>
                        <div className="aroundmeSec row">
                            <div className="col-12 col-md-6">
                                <AroundBlock>
                                    <FlexRow>
                                        <AroundMeImg src="img/images/elders.jpg" alt="aroundme image" name="aroundmeimg"></AroundMeImg>
                                        <AroundRight>
                                            <div className="aroundDesc">
                                                <AroundTitle> Police Department in Aveiro Region</AroundTitle>
                                                <AroundContent>Phones, emergency procedures and informations</AroundContent>
                                            </div>
                                            <AroundDetails>
                                                <div>
                                                    <Stamp>Distance</Stamp>

                                                    <Detail> 2 Miles</Detail>
                                                </div>
                                                <div>
                                                    <Stamp>Members</Stamp>

                                                    <Detail> 66</Detail>
                                                </div>
                                            </AroundDetails>


                                        </AroundRight>
                                    </FlexRow>
                                </AroundBlock>
                            </div>




                            <div className="col-12 col-md-6">
                                <AroundBlock>
                                    <FlexRow>
                                        <AroundMeImg src="img/images/elders.jpg" alt="aroundme image" name="aroundmeimg"></AroundMeImg>
                                        <AroundRight>
                                            <div className="aroundDesc">
                                                <AroundTitle> Fire Department in Aveiro Region</AroundTitle>
                                                <AroundContent> Everything you need to know in a fire situation</AroundContent>
                                            </div>
                                            <AroundDetails>
                                                <div>
                                                    <Stamp>Distance</Stamp>

                                                    <Detail> 2 Miles</Detail>
                                                </div>
                                                <div>
                                                    <Stamp>Members</Stamp>

                                                    <Detail> 66</Detail>
                                                </div>
                                            </AroundDetails>


                                        </AroundRight>
                                    </FlexRow>
                                </AroundBlock>
                            </div>






                            <div className="col-12 col-md-6">
                                <AroundBlock>
                                    <FlexRow>
                                        <AroundMeImg src="img/images/elders.jpg" alt="aroundme image" name="aroundmeimg"></AroundMeImg>
                                        <AroundRight>
                                            <div className="aroundDesc">
                                                <AroundTitle> Health Service in Aveiro Region</AroundTitle>
                                                <AroundContent> Everything you need to know in a emergency situation</AroundContent>
                                            </div>
                                            <AroundDetails>
                                                <div>
                                                    <Stamp>Distance</Stamp>

                                                    <Detail> 2 Miles</Detail>
                                                </div>
                                                <div>
                                                    <Stamp>Members</Stamp>

                                                    <Detail> 66</Detail>
                                                </div>
                                            </AroundDetails>


                                        </AroundRight>
                                    </FlexRow>
                                </AroundBlock>
                            </div>

                        </div>
                    </div>



                    <div className="haCenter">
                        <UpBtn type="button" onClick={(e) => this.scrollup(e)}><i className="fa fa-angle-up" aria-hidden=""></i></UpBtn>
                    </div>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {

    let currentUrl = ownProps.location ? ownProps.location.pathname : "";

    return {
        currentUrl
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AroundMe);