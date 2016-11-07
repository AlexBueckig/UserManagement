/**
 * Created by Alex on 04.11.2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {addFlashMessage} from '../actions/flashMessages';

export default function (ComposedComponent, requireAdmin = false) {
    class Authenticate extends React.Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to login to access this page'
                });
                this.context.router.transitionTo('/login');
            } else {
                if (requireAdmin) {
                    if (!this.props.isAdmin) {
                        this.props.addFlashMessage({
                            type: 'error',
                            text: 'You need to login as admin to access this page'
                        });
                        this.context.router.transitionTo('/');
                    }
                }
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.transitionTo('/');
            }
            if (requireAdmin) {
                if (!nextProps.isAdmin) {
                    this.context.router.transitionTo('/');
                }
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {};

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            isAdmin: state.auth.user.isAdmin
        };
    }

    return connect(mapStateToProps, {addFlashMessage})(Authenticate);
}