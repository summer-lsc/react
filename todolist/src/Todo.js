import React, { Component } from "react";

class Todo extends Component {
    render() {
        // 当遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，
        // 需要把子组件的 state 数据提升至其共同的父组件当中保存。
        // 之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。
        // refer: https://react.docschina.org/tutorial/tutorial.html
        // return <li onClick={() => this.props.onClick()}>hello, {this.props.content}</li>;
        return (
            <tr>
                <td className="name">{this.props.content.name}</td>
                <td>{this.props.content.status}</td>
                <td>
                    <button onClick={() => this.props.onModifyClick()} type="submit">Modify</button>
                    <button onClick={() => this.props.onDeleteClick()} type="submit">Delete</button>
                </td>
            </tr>
        )
    }
}

export default Todo;