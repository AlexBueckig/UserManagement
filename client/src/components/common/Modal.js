/**
 * Created by Alex on 13.11.2016.
 */
import React, {
    PropTypes
} from 'react';

const Modal = (props) => {
    const {title, formName, buttonStyles, buttonText}  = props;
    return (
        <div className="container-fluid">
            <div className={buttonStyles} data-toggle="modal" data-target="#myModal">{buttonText}</div>

            <div className="modal" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{title}</h4>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" form={formName}>Add</button>
                            <a className="btn btn-default" data-dismiss="modal">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    buttonStyles: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired
};
Modal.defaultProps = {
    buttonStyles: 'btn btn-primary btn-default pull-right',
    buttonText: ''
};

export default Modal;