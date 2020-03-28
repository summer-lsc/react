import React, { Component } from "react";
import Todo from "./Todo";
import $ from 'jquery';

const todoItemTemp = 'xid';
class App extends Component {
    constructor(props) {//组件创建时调用，非必须
        //每次定义其子类的构造函数时，都需要调用 super 方法。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头
        super(props);

        // 定义state
        this.state = {
            newTodo: '',
            todoList: [
                {
                    name: 'todo item 1',
                    status: 'progress'
                },
                {
                    name: 'todo item 2',
                    status: 'done'
                }
            ] //初始化
        };
    }

    dealData(str) {
        const newItem = { name: str, status: 'progress' };
        const newArr = [...this.state.todoList, newItem];
        this.setState({
            todoList: newArr
        })
    }
    // 当组件挂载到DOM节点后会调用的一个方法，通常在这里发起一些异步操作，用于获取服务器端的数据等
    componentDidMount() {
        this.timer = setTimeout(() => {
            // 更新state
            this.dealData(todoItemTemp);
        }, 2000);
    }

    // 当组件从 DOM 节点中卸载之前会调用的方法，一般在这里面销毁定时器等会导致内存泄露的内容
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleChange(e) {
        this.setState({
            newTodo: e.target.value
        });
    }

    handleAdd(e) {
        e.preventDefault(e);
        this.dealData(this.state.newTodo);
    }

    handleDelete(index) {
        const newList = [...this.state.todoList];
        newList.splice(index, 1);
        this.setState({
            todoList: newList
        });
    }

    handleModify(index) {
        const currentItem = this.state.todoList.find((item, itemIndex) => {
            return index === itemIndex;
        });
        if (currentItem.status === 'done') {
            currentItem.status = 'progress';
        } else if (currentItem.status === 'progress') {
            currentItem.status = 'done';
        }
        const todoList = this.state.todoList;
        this.setState({todoList});
    }

    handleSearch() {
        const text = this.state.newTodo;
        if ($.trim(text) !== "") {
            console.log($("table tbody tr").hide());
            $("table tbody tr").hide().filter(":contains('" + text + "')").show();
        } else {
            $('table tr').show();//当删除文本框的内容时，又重新显示表格所有内容
        }
    }

    // ReactDOM.render方法接收2个参数：1）根组件 2）待挂载的DOM节点，可以将组件的内容渲染到HTML
    render() {//挂载时用来渲染内容，必须
        const renderList = this.state.todoList.map((todo, index) => {
            return <Todo onDeleteClick={() => this.handleDelete(index)}
                content={todo} key={index}
                onModifyClick={() => this.handleModify(index)}></Todo>
        })
        return (
            <div>
                <form onSubmit={e => this.handleAdd(e)}>
                    <input type="text" value={this.state.newTodo} onChange={e => this.handleChange(e)}></input>
                    <button type="submit">add</button>
                </form>
                <button type="submit" onClick={() => this.handleSearch()}>search</button>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Status</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;