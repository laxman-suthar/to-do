import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import arr from './arr';
import Modal from "./modal"
// function App() {
//   return (<>
//     <div className=" container-fluid App ">
      
//       <h1 className="text-white text-uppercase text-center py-4">Todo app</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="mb-4">
//                 <button
//                   className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal"
//                 >
//                   Add task
//                 </button>
                
                
//               </div>
//               <div>
//               <button
//                   className="btn btn-primary me-2 bg-light text-dark"
//                 >
//                 completed
//                 </button>
//                 <button
//                   className="btn btn-primary ms-2 incomplete"
//                 >
//                   incompleted
//                 </button>
//                 </div>
            
//               <ul className="list-group list-group-flush border-top-0">
//               {
//               arr.map((a)=>{
//                 return(<>
//                 <p>{a.title}</p>
//               <p>{a.desc}</p>
//               </>)
                
//               })
//             }
//               </ul>
             
//             </div>
            
//           </div>
//         </div>
      
//     </div>
//     <div className='modal ' id='modal'>
//         <div className='modal-dialog modal-dialog-centered'>
//           <div className='modal-content'>
//             <div className='modal-header'>
//               <h6 className='modal-title'> Todo app</h6>
//               <button type="button" class="btn-close mb-2" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className='modal-body'>
//               <label for='title'> Title</label><br/>
//               <input className='input w-100 mb-2' type='text' name='title' placeholder='Enter a to-do' />
//               <label  for='title'> Description</label><br/>
//               <input className='input w-100' type='text' name='title' placeholder='Enter about Todo' />
//               <div class="form-check form-switch mt-3">
//                 <label class="form-check-label" for="flexSwitchCheckChecked">completed</label>
//                 <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  />
                
//               </div>
//             </div>
//             <div className='modal-footer'>
//             <button type="button" class="btn btn-primary">Save</button>
//             </div>
//           </div>
//         </div>
//     </div>
   
// </>
    
//   );
// }
import React, { Component } from "react";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://127.0.0.1:8000/api/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://127.0.0.1:8000/api/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/http://127.0.0.1:8000/api/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://127.0.0.1:8000/api/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;