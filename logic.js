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
        this.moveTodone = this.moveTodone.bind(this);
        this.returnTodo = this.returnTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.deleteDone = this.deleteDone.bind(this);
        this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this);
        this.newItemArray = [];
        this.doneItemArray = [];
        this.state = { 
            todoitems: [],
            doneitems: [],
            isWinter: "",
            isdone: false
        }
    }
    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
          // save to localStorage
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
      }
    eventCreate () {
        this.newItemArray = this.state.todoitems;
        var activities = this.textInput.value + this.dateInput.value;
        this.newItemArray.push(activities);
        this.setState ({
            todoitems: this.newItemArray
        })
        // save new array to local storage
            // localStorage.setItem("list", JSON.stringify(list));
    // localStorage.setItem("newItem", "");
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
    returnTodo (e) {
        var text = (e.target.value);
        console.log(text);
        var newDone = this.state.doneitems;
        console.log(newDone);
        var selectedIndex = newDone.indexOf(text)
        console.log(selectedIndex);
        newDone.splice(selectedIndex, 1);
        var notYetdone = this.state.todoitems;
        notYetdone.push(text);
        this.setState ({
            todoitems: notYetdone,
            doneitems: newDone
        })
    }
    deleteTodo (e) {
        var listItem = (e.target.value);
        var toDo = this.state.todoitems;
        console.log(listItem);
        var selectedIndex = toDo.indexOf(listItem);
        console.log(selectedIndex)
        toDo.splice(selectedIndex, 1);
        this.setState ({
            todoitems: toDo
        })
    }
    deleteDone (e) {
        var listItem = (e.target.value);
        var done = this.state.doneitems;
        console.log(listItem);
        var selectedIndex = done.indexOf(listItem);
        console.log(selectedIndex)
        done.splice(selectedIndex, 1);
        this.setState ({
            doneitems: done
        })
    }
    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
    
            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
            }
          }
        }
      }
      componentDidMount() {
        this.hydrateStateWithLocalStorage();
    
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
      }
      componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }
    render () {
        return (
            <div>
                <h3 className = "todoTitle">What do you need to get done: </h3>
                <div className="inputFields">
                    <input className="input" placeholder="enter activity" type = "text" ref = {input => { this.textInput = input;}}/>
                    <input className="input" type = "date" ref = {input => { this.dateInput = input;}}/>
                    <input type = "submit" onClick = {this.eventCreate}/>
                </div>
                <div className="listContainer">
                    <TodoListItem className="todo" newtodo = {this.state.todoitems} handleClick = {this.moveTodone} handleDelete = {this.deleteTodo}/>
                    <DoneListItem className="done" newdone = {this.state.doneitems} handleClick = {this.returnTodo} handleDonedelete = {this.deleteDone}/>
                </div>
            </div>
        );
    }
}
class TodoListItem extends React.Component {
    constructor(props) {
        super (props)
        this.markDone = this.markDone.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    markDone (e) {
        this.props.handleClick(e);
    }
    deleteItem (e) {
        this.props.handleDelete(e)
    }

    render () {
        var items = this.props.newtodo.map(
            (item) => <span key = {item + "todo"}><li key={item + "listitem"}>{item}</li><button type = "button" key={item + "done-button"} value={item} onClick = {this.markDone}>done</button><button type = "button" key = {item + "delete-todo"} value = {item} onClick = {this.deleteItem}>Delete</button></span>
        )
        return (
            <ol>
                {items}
            </ol>
        )
    }
}
class DoneListItem extends React.Component {
    constructor(props) {
        super (props)
        this.markNotdone = this.markNotdone.bind(this);
        this.deleteDoneitem = this.deleteDoneitem.bind(this)
    }
    markNotdone (e) {
        this.props.handleClick(e);
    }
    deleteDoneitem (e) {
        this.props.handleDonedelete(e);
    }

    render () {
        var items = this.props.newdone.map(
            (item) => <span key = {item + "done"}>Done<li key={item}>{item}</li><button type = "button" key={item + "button"} onClick = {this.markNotdone} value = {item}>not done</button><button type = "button" key = {item + "delete-completed"} value = {item} onClick = {this.deleteDoneitem}>Delete</button></span>
        )
        return (
            <ol className = "done">
                {items}
            </ol>
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