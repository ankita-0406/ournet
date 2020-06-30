import React from 'react';


export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            value:this.props.value,
            suggestions:[]
        };
    }

    onChangeValue = (e)=>{

        let value = e.target.value;
        let values = [];        

        if (value.length > 0) {
            const regex = new RegExp(value, 'i');
            values = this.props.items.sort().filter(x => regex.test(x));
        }

        this.setState({
            value : value,
            suggestions: values
        },this.props.afterChange(value))        
      
    }

    suggestionSelected = (value) => {
        this.setState({
            value: value,
            suggestions: []
        },this.props.afterChange(value))
    }

    renderSuggestions = ()=>{

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

    render() {
        
        return (
            <React.Fragment>
                <div className="autocomplete">
                    <div className="selectionBox flexRow">
                        <input type="text" id="autoID" className="tagSelectField" value={this.props.value} onChange={this.onChangeValue} placeholder="Type tags here, separated by commas" />
                        <button type="button" className="addTagBtn" onClick={() => this.addTags("tags", "tag")}>ADD</button>
                    </div>
                </div>
                {this.renderSuggestions()}
            </React.Fragment>
        )
    }
}