import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { findIndex, filter } from 'lodash';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filterTask: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        };
    }
    
    componentWillMount() { //componentWillMount : thực thi trước khi component được render() trên cả server side và client side
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    generateId = () =>  this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4()

    onToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) { // Đang chọn Edit -> Chọn Add new
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
            var index = findIndex(tasks, (task) => {
                return task.id === data.id;
            });
            tasks[index] = data;
        }
        this.setState({ tasks: tasks, taskEditing: null });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = findIndex(tasks, (task) => {
            return task.id === id;
        });
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({ tasks: tasks });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = findIndex(tasks, (task) => {
            return task.id === id;
        });
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({ tasks: tasks });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            this.onCloseForm();
        }
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = findIndex(tasks, (task) => {
            return task.id === id;
        });
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filterTask: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
        console.log(this.state.sortBy, this.state.sortValue); // chỗ này kết quả có vấn đề
    }

    render() {
        var { tasks, isDisplayForm, taskEditing, filterTask, keyword, sortBy, sortValue } = this.state;
        if (filterTask) {
            if (filterTask.name) {
                tasks = filter(tasks, (task) => {
                    return task.name.toLowerCase().indexOf(filterTask.name) !== -1;
                });
            }

            tasks = filter(tasks, (task) => {
                if (filterTask.status === -1) {
                    return task;
                } else {
                    return task.status === (filterTask.status === 1 ? true : false);
                }
            });
        }

        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            })
        }

        if (sortBy === "name") {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            });
        }

        var elmTaskForm = isDisplayForm ?
            <TaskForm
                onSubmit={this.onSubmit}
                onCloseForm={this.onCloseForm}
                task={taskEditing}
            />
            : '';

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
                        {/* Search- Sort */}
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        ></Control>
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

