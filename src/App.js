import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            }
        };

    }
    componentWillMount() { //life circle nó sẽ dc gọi khi component dc gắn vào, và chỉ dc gọi duy nhất 1 lần
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }

    }
    onGenerateData = () => {
        var tasks = [
            { id: this.generateId(), name: 'Code', status: true }, { id: this.generateId(), name: 'running', status: false }, { id: this.generateId(), name: 'music', status: true }
        ]
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    s4 = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
    generateId = () => { return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4(); }

    onToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) { // Đang edit và chọn Add new
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });
        }

    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        if (data.id === '') { //add new
            data.id = this.generateId();
            tasks.push(data);

        } else {//edit
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({ tasks: tasks, taskEditing: null });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({ tasks: tasks });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({ tasks: tasks });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            this.onCloseForm();
        }
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }


    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }

        });
        return result;
    }
    render() {
        var { tasks, isDisplayForm, taskEditing, filter } = this.state; // var tasks = this.state.tasks
        console.log(filter);
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }
        var elmTaskForm = isDisplayForm ?
            <TaskForm
                onSubmit={this.onSubmit}
                onCloseForm={this.onCloseForm}
                task={taskEditing}
            /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Manage Task</h1>
                </div>
                <div className="row ">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/* TaskForm */}
                        {elmTaskForm}
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn  btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span> Add new task
                        </button>
                        <button type="button" className="btn  btn-danger ml-5"
                            onClick={this.onGenerateData}
                        > Generate data
                        </button>
                        {/* Search- Sort */}
                        <Control></Control>
                        {/* TaskList */}
                        <TaskList tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                            onFilter={this.onFilter}
                        ></TaskList>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;