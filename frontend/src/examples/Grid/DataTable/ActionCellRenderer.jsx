import React from 'react';
import PropTypes from 'prop-types';

class ActionCellRenderer extends React.Component {
    onApprove = () => {
        console.log('Approve:', this.props.data);
        // Add your approve logic here
    };

    onReject = () => {
        console.log('Reject:', this.props.data);
        // Add your reject logic here
    };

    render() {
        return (
            <span className="missionSpan">
                <button onClick={this.onApprove} className="missionButton">
                    <img
                        alt="Approve"
                        src="https://www.ag-grid.com/example-assets/icons/tick-in-circle.png"
                        className="missionIcon"
                    />
                </button>
                <button onClick={this.onReject} className="missionButton">
                    <img
                        alt="Reject"
                        src="https://www.ag-grid.com/example-assets/icons/cross-in-circle.png"
                        className="missionIcon"
                    />
                </button>
            </span>
        );
    }
}

ActionCellRenderer.propTypes = {
    data: PropTypes.object.isRequired
};

export default ActionCellRenderer;
