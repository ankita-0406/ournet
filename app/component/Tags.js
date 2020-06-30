import React from 'react';
import { render } from 'react-dom';
import Header from "./Header";
import Footer from "./Footer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserTagAction from '../actions/tagsActions';
import AutoComplete from '../controls/Autocomplete';
import Select from 'react-select';
import { Container } from 'react-bootstrap';

class Tags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            aTags: [],
            tag: "",
            aTag: "",
            userTags: [],
            items: [],
            suggestions: [],
            antisuggestions: []
        }
    }

    componentDidMount() {
        this.props.userTagAction.getUserTags(this.props.loggedUserId).then((resp) => {
            this.setState({
                userTags: resp,
            });

            let tagname = this.state.userTags.filter(x => x.tagType == true).map(x => x.tagName);
            this.setState({
                tags: tagname,
            });

            let atagname = this.state.userTags.filter(x => x.tagType == false).map(x => x.tagName);
            this.setState({
                aTags: atagname
            });

        })
        this.props.userTagAction.getAllTags().then((resp) => {
            let names = resp.map(x => x.name);
            this.setState({
                items: names,
            });
        })
    }

    addTags = (listName, entry) => {
        let NewTagList = this.state[listName];
        let entryName = this.state[entry];

        for (var i = 0; i < entryName.length; i++) {
            if (NewTagList.indexOf(entryName[i]) == -1) {
                NewTagList = this.state[listName].concat(entryName[i]);
            }
        }

        this.setState({
            [listName]: NewTagList,
            [entry]: "",
            suggestions: []
        })
    }

    removeTags = (e, type) => {

        let eventName = e.target.parentNode.innerText;
        eventName = eventName.slice(0, -1).trim();
        const newList = this.state[type].slice();
        let index = newList.indexOf(eventName);;
        newList.splice(index, 1);
        this.setState({
            [type]: newList
        })
    }

    onChangeTags = (e) => {
        let value = e.target.value;
        let sname = "suggestions"
        let values = [];
        if (e.target.id == "tag") {
            sname = "suggestions"
        }
        else {
            sname = "antisuggestions"
        }

        if (value.length > 0) {
            const regex = new RegExp(value, 'i');
            values = this.state.items.sort().filter(x => regex.test(x));
        }

        this.setState({
            [e.target.id]: value,
            [sname]: values
        })

    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if (suggestions.length == 0) {
            return null;
        }
        return (
            <ul className="autocompleteTags">
                {
                    this.state.suggestions.map((item, i) => {
                        return (
                            <li key={i} onClick={() => { this.suggestionSelected(item) }}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    renderAntiSuggestions = () => {
        const { antisuggestions } = this.state;
        if (antisuggestions.length == 0) {
            return null;
        }
        return (
            <ul className="autocompleteTags">
                {
                    this.state.antisuggestions.map((item, i) => {
                        return (
                            <li key={i} onClick={() => { this.antisuggestionselected(item) }}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    suggestionSelected = (value) => {
        this.setState({
            tag: value,
            suggestions: []
        })
    }

    antisuggestionselected = (value) => {
        this.setState({
            aTag: value,
            antisuggestions: []
        })
    }

    updateTags(Tags, Atags) {
        this.props.userTagAction.UpdateTags(Tags, Atags).then(() => {
            swal({
                title: 'Updated!',
                text: 'Tags Preference Updated',
                icon: 'success',
                timer: 800
            })
            this.props.history.goBack();
        })
        
    }

    afterChangeTag = (v) => {
        this.setState({
            tag: v
        })
    }

    changeTags = (e) => {
        this.setState({
            tag: e
        })
    }

    changeAntiTags = (e) => {
        this.setState({
            aTag: e
        })
    }

    scrollup() {
        document.body.scrollTo({top: 0, behavior: 'smooth'})
        document.documentElement.scrollTo({top: 0, behavior: 'smooth'})
    }

    render() {
        return (
            <React.Fragment>
                <Header currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="section">
                        <div className="secHeader flexRow evenSpace">
                            <div className="secTitle">
                                <label className="secName">Tags</label><br />
                                <label className="secDesc">Click on the interested categories you want to filter.</label>
                            </div>
                        </div>
                        <div className="tagSec">
                            <div className="tagBlock">
                                <div className="tagDesc">
                                    <label className="tabCategory">PREFERRED TAGS</label>
                                    <label className="tabInfo">Type only the tags you want to see.</label>
                                </div>
                                <div className="autocomplete">
                                    <div className="selectionBox flexRow">
                                        <Select
                                            id="tag"
                                            className="tagSelectField"
                                            isMulti
                                            addLabelText="{`Would you like to add this tag '{label}'?`}"
                                            value={this.state.tag}
                                            onChange={this.changeTags}
                                            getOptionLabel={(option) => option}
                                            getOptionValue={(option) => option}
                                            options={this.state.items}
                                        />
                                        <button type="button" className="addTagBtn btn-fill-blue" onClick={() => this.addTags("tags", "tag")}>ADD</button>
                                    </div>
                                </div>
                                {this.renderSuggestions()}

                                <div className="flexRow">
                                    <div className="tagContainer">
                                        {this.state.tags.map((tag, i) => {
                                            return (
                                                <label key={i} className="selectedTag pTag"> {tag} <span id="ta" className="tabRemove" onClick={(e) => { this.removeTags(e, "tags") }}
                                                >X</span></label>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="tagBlock">
                                <div className="tagDesc">
                                    <label className="tabCategory">ANTI-TAGS</label>
                                    <label className="tabInfo">Type the tags you don’t want to see.</label>
                                </div>
                                <div className="autocomplete">
                                    <div className="selectionBox flexRow">
                                        <Select
                                            id="aTag"
                                            className="tagSelectField"
                                            isMulti
                                            addLabelText="{`Would you like to add this tag '{label}'?`}"
                                            value={this.state.aTag}
                                            onChange={this.changeAntiTags}
                                            getOptionLabel={(option) => option}
                                            getOptionValue={(option) => option}
                                            options={this.state.items}
                                        />
                                        <button type="button" className="addTagBtn btn-fill-blue" onClick={() => this.addTags("aTags", "aTag")}>ADD</button>
                                    </div>
                                    {this.renderAntiSuggestions()}
                                </div>

                                <div className="flexRow">
                                    <div className="tagContainer">
                                        {this.state.aTags.map((tag, i) => {
                                            return (
                                                <label key={i} className="selectedTag aTag"> {tag} <span className="tabRemove" onClick={(e) => { this.removeTags(e, "aTags") }}>X</span></label>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="haCenter">
                        <button type="button" className="locsaveBtn btn-fill-blue" onClick={() => this.updateTags(this.state.tags, this.state.aTags)}>Save</button>
                    </div>
                    <div className="haCenter">
                        <button type="button" className="upBtn" onClick={(e) => this.scrollup(e)}><i className="fa fa-angle-up" aria-hidden=""></i></button>
                    </div>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }

}


function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let loggedUserId = state.Authentication.loggedUserId;
    let alltags = state.UserTags.alltags;
    return {
        currentUrl,
        loggedUserId,
        alltags
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userTagAction: bindActionCreators(UserTagAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
