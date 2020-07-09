import React, {Component, PropTypes} from 'react';
import debounce from 'lodash/debounce';

//@TODO Should refactor
function InputSearch(props) {
    // static propTypes = {
    //     //     text = PropTypes.string.isRequired,
    //     //     updateText = PropTypes.func.isRequired,
    //     // };

    const [value, setValue] = React.useState('');

    React.useEffect(()=>{
        sendTextChange = debounce(sendTextChange, 500);
        setValue(props.text || '');
    }, []);

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         text: '',
    //     };
    // }
    //
    // componentDidMount() {
    //     this.sendTextChange = debounce(this.sendTextChange, 500);
    //     this.setState({text:this.props.text});
    // }

    function sendTextChange(text) {
        setValue(text);
    };

    function handleTextChange(e) {
        setValue(e.target.value);
        sendTextChange(e.target.value.trim())
    };

    return (
        <input onChange={handleTextChange} value={value} />
    )
}

export default InputSearch;