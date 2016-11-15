/**
 * Created by Alex on 03.11.2016.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';

class FlashMessagesList extends Component {
    render() {
        const {deleteFlashMessage} = this.props;
        const messages = _.map(this.props.messages, message =>
            <FlashMessage
                key={message.id}
                message={message}
                deleteFlashMessage={deleteFlashMessage}
            />
        );
        return (
            <div>{messages}</div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages: PropTypes.object.isRequired
};

FlashMessagesList.defaultProps = {};

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
