import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import NewGroupCards from "./NewGroupCards";

const MainComponentsBox = styled.div`
  @media only screen and (max-width: 480px) {
    margin: 20px;
  }
`;

const NewGroupTitleBox = styled.div`
  padding: 50px 0 0px 0;
  display: flex;
  flex-flow: row;
  @media only screen and (max-width: 480px) {
    display: block;
    flex-flow: row;
    text-align: left;
  }
`;

const H1 = styled.h1`
  color: #bb4d9a;
  font: Black 40px/34px Lato;
  opacity: 1px;
  font-size: 30px;
  font-weight: bolder;
`;

const ProgressBarWrapper = styled.div`
  margin-left: 135px;
  width: 823px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

//

const ButtonsWrapper = styled.div`
  display: flex;
  width: 860px;
  margin-left: 278px;
  margin-top: -100px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
    display: block;
  }
`;

const Rapper = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 30px;

  @media only screen and (max-width: 480px) {
    display: block;
    flex-flow: column;
  }
`;

class NewGroups extends React.Component {
  render() {
    const now = 75;
    return (
      <React.Fragment>
        <Header />
        <Container>
          <MainComponentsBox>
            <NewGroupTitleBox>
              <H1>New Community</H1>
              <Rapper>
                <ProgressBarWrapper>
                  <ProgressBar animated now={now} label={`${now}%`} />
                </ProgressBarWrapper>
              </Rapper>
            </NewGroupTitleBox>
            <NewGroupCards />
            <Rapper>
              <ButtonsWrapper>
                <button
                  id="cancel"
                  type="button"
                  onClick={() => this.onSave("cancel")}
                  className="articlesaveBtn btn-fill-blue btn-solid-border"
                >
                  Back
                </button>
                <button
                  id="finish"
                  type="button"
                  onClick={() => this.onSave("finish")}
                  className="articlepostBtn btn-fill-blue"
                >
                  CANCEL
                </button>

                <button
                  id="finish"
                  type="button"
                  onClick={() => this.onSave("finish")}
                  className="articlepostBtn btn-fill-blue"
                >
                  NEXT
                </button>
              </ButtonsWrapper>
            </Rapper>
          </MainComponentsBox>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default NewGroups;
