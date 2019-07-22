import React, { Component } from 'react';

export default class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
        }
    }

    componentWillMount() { // chỉ dc gọi duy nhất 1 lần khi component dc gắn vào
        if(this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }
    
    componentWillReceiveProps(nextProps) {// một phương thức static sẽ chạy khi component nhận được props và đã được khởi tạo
        //is required if you want to update the state values with new props values
        if(nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else if (!nextProps.task){ // Đang edit chọn vào Add new sẽ xóa Form
            this.setState({
                id: '',
                name: '',
                status: false,
            });
        }
    }

    onCloseForm = () => this.props.onCloseForm()

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name==='status') {
            value= target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => { console.log(event);
        event.preventDefault(); //If this method is called, the default action of the event will not be triggered.
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear=()=>{
        this.setState=({
            name:'',
            status:false
        })
    }

    render() {
        var  {id} = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading ">
                    <h3 className="panel-title">
                        {id!==''?'Update task':'Add new task'}
                        <span className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            <label>Stutus: </label>
                            <select className="form-control" name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Hide</option>
                            </select><br />
                            <div className="form-center">
                                <button type="submit" className="btn btn-warning">
                                    <span className="fa fa-plus mr-5"></span>Save
                                </button>&nbsp;
                                <button type="button" className="btn btn-danger"
                                onClick={this.onClear}
                                >
                                    <span className="fa fa-close mr-5"></span>Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
