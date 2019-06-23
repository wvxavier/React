
class TaskManagerApp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: []
        }

    }


    componentDidMount() {

        fetch('http://127.0.0.1:9000/tasks')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    tasks: data
                })
            })

    }

    render() {
        const title = 'Aewsome toDo List'
        const subtitle = 'Manage your tasks including forecast and predictions'


        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <TaskList tasks={this.state.tasks} />
                <AddTask tasks={this.state.tasks} />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {

        return (
            <div >
                <h1 >{this.props.title}</h1>
                <h2 >{this.props.subtitle}</h2>
            </div>
        )
    }

}


class TaskList extends React.Component {

    render() {
        return (
            <div>
                <lo>
                {this.props.tasks.map((task) => <Task key={task.task_id} optionText={task.task_title} />)}
                </lo>
            </div>
        )
    }
}

class Task extends React.Component {
    render() {
        return (
            <li>
                {this.props.optionText}
                <button>remove</button>
            </li>
        )
    }
}

class AddTask extends React.Component {
    handleAddTaskForm(event) {
        event.preventDefault()

        const title = event.target.elements.task_title.value.trim()
        const body = event.target.elements.task_body.value.trim()

        console.log(title +' - ' + body)

        if (title && body) {
            fetch('http://127.0.1:9000/tasks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_title: title,
                    task_body: body,
                })
                      
            })

            


        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddTaskForm}>
                    <input type="text" name="task_title" />
                    <input type="test" name="task_body" />
                    <button>Add Task</button>
                </form>
            </div>
        )

    }

}




ReactDOM.render(<TaskManagerApp />, document.getElementById('app'))