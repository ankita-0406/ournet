import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Drawer, ButtonToolbar, Button } from 'rsuite';
import { Link } from 'react-router-dom';



class SideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  close() {
    this.setState({
      show: false
    });
  }
  toggleDrawer() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div>
        <ButtonToolbar style={{ marginLeft: '350px'}}>
          <Button onClick={this.toggleDrawer} className="forumHeaderBtn btn-fill-blue">Private Groups <i class="fa fa-users" aria-hidden="true"></i></Button>
        </ButtonToolbar>
        <Drawer
          show={this.state.show}
          onHide={this.close}
        >
          <Drawer.Header>
            <Drawer.Title>Private Community</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>

            {this.props.groups.map(group => {
              return (
                <div className="groupBlock" key={group.id}>
                  <div className="flexColumn">
                    <div className="groupImgHolder">
                      <img src={group.image} alt="group image" name="groupImg" className="groupImg" />
                      <div className="groupName">{group.name}</div>
                    </div>
                    <div className="groupFoot">
                      <div className="groupDetails flexRow evenSpace">
                        <div>
                          <label className="stamp">DISTANCE</label>
                          <span className="detail">{parseInt(group.distance)} miles</span>
                        </div>
                        <div>
                          <label className="stamp">Members</label>
                          <span className="detail">{group.numMembers}</span>
                        </div>
                        {/* <div>
                                                            <label className="stamp">ARTICLES</label>
                                                            <span className="detail">66</span>
                                                        </div> */}
                      </div>
                      <div className="haCenter">
                        <Link to={`/aboutgroups/${group.id}`} className="grpDetailBtn btn-fill-blue">News</Link>
                        <Link to={`/groupforum/${group.id}`} className="grpDetailBtn btn-fill-blue">Chat</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )

            })}
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={this.close} appearance="primary">Close</Button>
         
          </Drawer.Footer>
        </Drawer>
      </div>
    );
  }

}
export default SideDrawer;
