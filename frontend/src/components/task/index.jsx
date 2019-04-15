import React from 'react';
import PropTypes from 'prop-types';

const mapPriorityToUI = {
    'megadoit': 'Urgent',
    'asap': 'Normal',
    'meh': 'Low',
}

const Task = ({description, url, due_date, priority, point_value, completeTask, deleteTask}) => {
    return (
        <div className="task">
            <div className='row'>
                <div className="col-4">{description}</div>
                <div className="col-2">{mapPriorityToUI[priority]}</div>
                <div className="col-2">{point_value}</div>
                <div className="col-2">{due_date}</div>
                <div className="col-2">
                    <button onClick={completeTask}>✔</button>
                    <button onClick={deleteTask}>❌</button>
                </div>
            </div>
        </div>
    )
}

Task.propTypes = {
    description: PropTypes.string,
    due_date: PropTypes.string,
    priority: PropTypes.string,
    point_value: PropTypes.number,
    deleteTask: PropTypes.func,
    completeTask: PropTypes.func,
};

export default Task;