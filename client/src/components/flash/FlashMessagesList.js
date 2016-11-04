/**
 * Created by Alex on 03.11.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';

class FlashMessagesList extends Component {
    render() {
        const messages = this.props.messages.map(message =>
            <FlashMessage
                key={message.id}
                message={message}
            />
        );
        return (
            <div>{messages}</div>
        );
    }
}

FlashMessagesList.propTypes = {};

FlashMessagesList.defaultProps = {};

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps)(FlashMessagesList);
