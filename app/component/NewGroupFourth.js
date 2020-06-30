import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import GoogleMapComponent from "./maps/googleMap";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

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

const Label = styled.label`
  color: #bb4d9a;
  font: Black 24px/34px Lato;
  opacity: 1px;
`;

const MainGroupsWrapper1 = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 22px;

  @media only screen and (max-width: 480px) {
    display: inline;
    text-align: center;
  }
`;
const MainTitleHeading = styled.div`
  @media only screen and (max-width: 480px) {
    text-align: left;
  }
`;

const MainSqureBoxWrapper = styled.div`
  display: flex;
  flex-flow: row;
  margin-left: 129px;

  @media only screen and (max-width: 480px) {
    display: block;
    flex-flow: column;
    margin: 0px 45px 0px 45px;
    padding: 15px 0px 0px 0px;
    /* padding: 60px 0 0 0; */
  }
`;

const SqureBox = styled.div`
  width: 200px;
  height: 200px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ffffff;
  opacity: 1px;
  text-align: center;
  margin: 0 50px 0px 0px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    background-color: #024b99;
    border: 2px solid #024b99;
    .colorh4 {
      color: white;
      border: 2px #ffffff solid;
    }
    .colorh6 {
      color: white;
    }
  }

  @media only screen and (max-width: 480px) {
    margin: 0px 0 30px 0;
    border-radius: 10px;
  }
`;

const DivContent = styled.div`
  margin-top: 25px;
`;

const H4 = styled.h4`
  color: #bb4d9a;
  border: 1px #bb4d9a solid;
  width: 25px;
  height: 25px;
  border-radius: 30px;
  font-weight: bolder;
  border-radius: 30px;
  margin: auto;
`;

const H6 = styled.h6`
  font-size: 16px;
  font-weight: bolder;
  color: #bb4da6;
  padding: 12px;
`;

const P = styled.p`
  line-height: 1.5rem;
  padding: 0 0 30px 0;
`;

const Input = styled.input`
  margin: 0px 0px 0px 0px;
`;
const NameField = styled.input`
  background: #ffffff;
  border-radius: 10px;
  border: none;
  text-align: left;
  font: 16px/16px Lato;
  letter-spacing: 0;
  padding: 15px 10px;
  width: 100%;
  transition: all 200ms ease-out;
`;


const InviteMembersFieldWrapper = styled.div`
  margin-left: 170px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const InviteAdminsFieldWrapper = styled.div`
  margin-left: 184.5px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const WebsiteFieldWrapper = styled.div`
  margin-left: 212px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const LinkedInFieldWrapper = styled.div`
  margin-left: 210px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const TwitterFieldWrapper = styled.div`
  margin-left: 218px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const ProgressBarWrapper = styled.div`
  margin-left: 120px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupDescriptionField = styled.textarea`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  border: none;
  text-align: left;
  font: 16px/20px Lato;
  letter-spacing: 0;
  transition: all 200ms ease-out;

  height: 110px;
  resize: none;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupDescriptionFieldWrapper = styled.div`
  margin-left: 85px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const TagSelectWrapper = styled.div`
  margin-left: 178px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupImageWrapper = styled.div`
  margin-left: 122px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupLocationWrapper = styled.div`
  margin-left: 105px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GoogleMapComponentWrapper = styled.div`
  margin-left: 207px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 700px;
  margin-left: 278px;

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
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const now = 100;
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

            <Rapper>
              <Label>Invite Members</Label>
              <InviteMembersFieldWrapper>
                <NameField
                  type="text"
                  id="title"
                  value=""
                  onChange=""
                  // className="articlefield titleField"
                  placeholder="Up to 80 character"
                />
              </InviteMembersFieldWrapper>
            </Rapper>

            <Rapper>
              <Label>Invite Admins</Label>
              <InviteAdminsFieldWrapper>
                <NameField
                  type="text"
                  id="title"
                  value=""
                  onChange=""
                  // className="articlefield titleField"
                  placeholder="Up to 80 character"
                />
              </InviteAdminsFieldWrapper>
            </Rapper>

        


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
                  SAVE and EXIT
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
