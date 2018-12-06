class App extends React.Component {

    render () {
        return (
            <div className = "container">
                <h1 className = "title">Welcome to your To-do List</h1>
                <Input/>
            </div>
        )
    }
}
class Input extends React.Component {
    constructor (props){
        super(props)
        this.eventCreate = this.eventCreate.bind(this);
        this.moveTodone = this.moveTodone.bind(this)
        this.newItemArray = [];
        this.doneItemArray = [];
        this.state = { 
            todoitems: [],
            doneitems: [],
            isWinter: "",
            isdone: false
        }
    }
    eventCreate () {
        var activities = this.textInput.value + this.dateInput.value;
        this.newItemArray.push(activities);
        this.setState ({
            todoitems: this.newItemArray
        })
    }
    moveTodone (e) {
        console.log(e.target.parentNode);
        console.log(this.state.todoitems)
        var text = (e.target.value);
        console.log(text);
        var newTodo = this.state.todoitems;
        var selectedIndex = newTodo.indexOf(text);
        newTodo.splice(selectedIndex, 1);
        // var newItem = e.target.value;
        // console.log(e.target.value);
        var newCompleted = this.state.doneitems;
        newCompleted.push(text);
        this.setState ({
            doneitems: newCompleted,
            todoitems: newTodo
            // isdone: true
        })
    }
    render () {
        // var TodolistPlacement = this.state.isdone === false?: null;
        // var DonelistPlacement = this.state.isdone?  : null;
        return (
            <div>
                <h3 className = "TodoEntry">What do you need to do: </h3>
                <input type = "text" ref = {input => { this.textInput = input;}}/>
                <input type = "date" ref = {input => { this.dateInput = input;}}/>
                <input type = "submit" onClick = {this.eventCreate}/>
                <TodoListItem newtodo = {this.state.todoitems} handleClick = {this.moveTodone}/>
                <DoneListItem newdone = {this.state.doneitems}/>
            </div>
        );
    }
}
class TodoListItem extends React.Component {
    constructor(props) {
        super (props)
        this.markDone = this.markDone.bind(this);
    }
    markDone (e) {
        this.props.handleClick(e);
    }

    render () {
        var items = this.props.newtodo.map(
            (item) => <span key = {item + "todo"}><li key={item + "listitem"}>{item}</li><button type = "button" key={item + "button"} value={item} onClick = {this.markDone}>done</button></span>
        )
        return (
            <ul>
                {items}
            </ul>
        )
    }
}
class DoneListItem extends React.Component {
    constructor(props) {
        super (props)
    }

    render () {
        console.log("Render DoneList")
        var items = this.props.newdone.map(
            (item) => <span key = {item + "done"}>Done<li key={item}>{item}</li><button type = "button" key={item + "button"} onClick = {this.markNotdone}>not done</button></span>
        )
        return (
            <ul className = "done">
                {items}
            </ul>
        )
    }
}

function render () {
    ReactDOM.render(
        <App/>,
        document.getElementById("root")
    );
}

render ()