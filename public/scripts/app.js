'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskManagerApp = function (_React$Component) {
    _inherits(TaskManagerApp, _React$Component);

    function TaskManagerApp(props) {
        _classCallCheck(this, TaskManagerApp);

        var _this = _possibleConstructorReturn(this, (TaskManagerApp.__proto__ || Object.getPrototypeOf(TaskManagerApp)).call(this, props));

        _this.state = {
            tasks: []
        };

        return _this;
    }

    _createClass(TaskManagerApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('http://127.0.0.1:9000/tasks').then(function (res) {
                return res.json();
            }).then(function (data) {
                console.log(data);
                _this2.setState({
                    tasks: data
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = 'Aewsome toDo List';
            var subtitle = 'Manage your tasks including forecast and predictions';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(TaskList, { tasks: this.state.tasks }),
                React.createElement(AddTask, { tasks: this.state.tasks })
            );
        }
    }]);

    return TaskManagerApp;
}(React.Component);

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    this.props.title
                ),
                React.createElement(
                    'h2',
                    null,
                    this.props.subtitle
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var TaskList = function (_React$Component3) {
    _inherits(TaskList, _React$Component3);

    function TaskList() {
        _classCallCheck(this, TaskList);

        return _possibleConstructorReturn(this, (TaskList.__proto__ || Object.getPrototypeOf(TaskList)).apply(this, arguments));
    }

    _createClass(TaskList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'lo',
                    null,
                    this.props.tasks.map(function (task) {
                        return React.createElement(Task, { key: task.task_id, optionText: task.task_title });
                    })
                )
            );
        }
    }]);

    return TaskList;
}(React.Component);

var Task = function (_React$Component4) {
    _inherits(Task, _React$Component4);

    function Task() {
        _classCallCheck(this, Task);

        return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
    }

    _createClass(Task, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                this.props.optionText,
                React.createElement(
                    'button',
                    null,
                    'remove'
                )
            );
        }
    }]);

    return Task;
}(React.Component);

var AddTask = function (_React$Component5) {
    _inherits(AddTask, _React$Component5);

    function AddTask() {
        _classCallCheck(this, AddTask);

        return _possibleConstructorReturn(this, (AddTask.__proto__ || Object.getPrototypeOf(AddTask)).apply(this, arguments));
    }

    _createClass(AddTask, [{
        key: 'handleAddTaskForm',
        value: function handleAddTaskForm(event) {
            event.preventDefault();

            var title = event.target.elements.task_title.value.trim();
            var body = event.target.elements.task_body.value.trim();

            console.log(title + ' - ' + body);

            if (title && body) {
                fetch('http://127.0.1:9000/tasks', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        task_title: title,
                        task_body: body
                    })

                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddTaskForm },
                    React.createElement('input', { type: 'text', name: 'task_title' }),
                    React.createElement('input', { type: 'test', name: 'task_body' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Task'
                    )
                )
            );
        }
    }]);

    return AddTask;
}(React.Component);

ReactDOM.render(React.createElement(TaskManagerApp, null), document.getElementById('app'));
