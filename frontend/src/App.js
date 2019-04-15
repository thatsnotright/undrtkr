import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as taskActionFns from './services/tasks/actions';
import './App.css';
import { bindActionCreators } from 'redux';
import Task from './components/task';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  static propTypes = {
    taskActions: PropTypes.shape({
      createTask: PropTypes.func.isRequired,
      fetchTasks: PropTypes.func.isRequired,
    }),
  }

  constructor() {
    super();
    this.state = {
      newDueDate: null,
      newDesc: '',
      newPriority: 'meh',
      newPoints: 0,
    }
  }

  componentDidMount() {
    this.props.taskActions.fetchTasks();
  }

  saveTask = () => {
    const { newPoints, newDesc, newPriority, newDueDate } = this.state;
    this.props.taskActions.createTask(newDesc, newPriority, newPoints, null, newDueDate);
  }

  changePriority = (e) => {
    this.setState({ newPriority: e.target.value });
  }

  changeDueDate = (newDate) => {
    this.setState({ newDueDate: newDate });
  }

  changeDescription = (e) => {
    this.setState({ newDesc: e.target.value });
  }

  changePoints = (e) => {
    const pts = parseInt(e.target.value, 10);
    if (Number.isNaN(pts) || pts > 11 || pts < 0) {
      return true;
    }
    this.setState({ newPoints: pts });
  }

  completeTask(taskUrl) {
    this.props.taskActions.updateTask(taskUrl, { complete: true });
  }

  deleteTask(taskUrl) {
    this.props.taskActions.deleteTask(taskUrl);
  }

  render() {
    const { newPoints, newDesc, newPriority, newDueDate } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          Undrtkr: The Epic Task Quest
        </header>
        <div className="container">
          <div className='row'>
              <div className="col-4">Task</div>
              <div className="col-2">Priority</div>
              <div className="col-2">Points</div>
              <div className="col-2">Due Date</div>
              <div  className="col-2"></div>
          </div>
          {this.props.incomplete.map( task => (<Task key={task.url} {...task} completeTask={() => this.completeTask(task.url)} deleteTask={() => this.deleteTask(task.url)} />))}
          <div className="row">
            <div className="col-4"><input type="text" onChange={this.changeDescription} value={newDesc}></input></div>
            <div className="col-2">
              <select onChange={this.changePriority} value={newPriority}>
                <option value="asap">Normal</option>
                <option value="meh">Low</option>
                <option value="megadoit">High</option>
              </select>
            </div>
            <div className="col-2"><input onChange={this.changePoints} pattern="[0-9]*" size="3" type="text" value={newPoints}></input></div>
            <div className="col-3"><DatePicker selected={newDueDate} onChange={this.changeDueDate}/></div>
            <div className="col-1">
              <button onClick={this.saveTask}>✔</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  taskActions: bindActionCreators(taskActionFns, dispatch),
});

const mapStateToProps = (state) => {
  return {
    incomplete: state.tasks.incomplete
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
