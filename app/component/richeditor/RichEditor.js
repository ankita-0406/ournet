import React from "react";
import ReactQuill from "react-quill";
import MediaInput from "../MediaInput";
import FontAwesome from "react-fontawesome";

const CustomToolbar = () => (
    <div id="toolbar">
        <select className="ql-header">
            <option value="1"/>
            <option value="2"/>
            <option value="3"/>
            <option value="4"/>
            <option value="5"/>
            <option value="6"/>
            <option value="DEFAULT"/>
        </select>
        <span className="ql-format-group">
            <button className="ql-bold"/>
            <button className="ql-italic"/>
            <button className="ql-underline"/>
            <button className="ql-strike"/>
        </span>
        <select className="ql-align">
            <option value="center"/>
            <option value="right"/>
            <option value="justify"/>
            <option value="DEFAULT" />
        </select>
        <button className="ql-list" value="ordered"/>
        <button className="ql-list" value="bullet"/>
        <button className="ql-indent" value="-1"/>
        <button className="ql-indent" value="+1"/>
        <button className="ql-blockquote"/>
        <button className="ql-code-block"/>
        <button className="ql-link"/>
        <button className="ql-insertImage">
            <FontAwesome name="image"/>
        </button>
        <button className="ql-video"/>
        <button className="ql-clean"/>
    </div>
);


class RichEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.content || '',
            showURLInput: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.content != nextProps.content) {
            this.setState({content: nextProps.content});
        }
    }

    _onBlurContent =  () => {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };

    _onChangeContent = (content) => {
        this.setState({content});
        if (this.props.onChange) {
            this.props.onChange(content);
        }
    };


    getModules = {
        toolbar: {
            comp: this,
            container: "#toolbar",
            'image-tooltip': true,
            'link-tooltip': true,
            handlers: {
                "insertImage": function () {
                    this.options.comp._promptForLink(this.quill);
                }
            }
        }
    };

    _promptForLink = (quill) => {
        this.setState({
            showURLInput: true,
            quill
        });
    };

    _renderMediaInput() {
        return <MediaInput show={this.state.showURLInput} onHide={this.onHideMediaModal}
                           onSelect={this.onSelectMediaFile}
                           cropWidth={640}
                           cropHeight={400}
                           aspectRatio={16 / 9}/>
    }

    onSelectMediaFile = (image) => {
        this.onHideMediaModal();
        let quill = this.state.quill;
        const cursorPosition = quill.selection.savedRange.index;
        quill.insertEmbed(cursorPosition, 'image', image)
    };

    onHideMediaModal = () => {
        this.setState({showURLInput: false});
    };

    render() {
        const styles = {};
        return <div className="RichEditor-root" onBlur ={this._onBlurContent}>
            <CustomToolbar/>
            <ReactQuill theme="bubble"
                        value={this.state.content}
                        modules={this.getModules}
                        placeholder={this.props.placeholder}
                        onChange={this._onChangeContent}
                        preserveWhitespace={true}/>
            {/* {this._renderMediaInput()} */}
        </div>

    }
}

export default RichEditor;