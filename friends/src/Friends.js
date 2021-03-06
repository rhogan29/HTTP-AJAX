import React, { Component } from 'react';
import axios from 'axios';
import './Friends.css';
import { Route } from 'react-router-dom';

class Friends extends Component {
    constructor() {
        super();
        this.state = {
            friends: [],
            name: '',
            age: null,
            email: '',
        }
    };

    componentDidMount() {
        axios.get('http://localhost:5000/friends')
        .then(response => {
          this.setState({ friends: response.data });
        })
        .catch(error => {
          console.log( `There was an error getting friends: ${error}`);
        });
        }

        addFriend = () => {
            const newFriend = {
              name: this.state.name,
              age: this.state.age,
              email: this.state.email
            }
            axios.post('http://localhost:5000/friends/', newFriend)
            .then(response => {
              this.setState({name: '', age: '', email: ''});
            })
            .catch(error => {
              console.log( `Please try again!: ${error}`);
            });
          
          };
          
          handleInputChange = (event) => {
          const { name, value } = event.target;
          this.setState({ [name]: value });
          };
          
          handleSubmit = (event) => {
            event.preventDefault();
          };
          
            render() {
              return (
                <div>
                <div className="title">Friend info below!</div>
                <form className='form' onSubmit={this.addFriend}>
                 <label> Name: <input type='text' name='name' placeholder='Name' onChange={this.handleInputChange} value={this.state.name} />
                 </label>
                 <label> Age: <input type='number' name='age' placeholder='Age' onChange={this.handleInputChange} value={this.state.age} />
                 </label>
                 <label> Email: <input type='text' name='email' placeholder='Email' onChange={this.handleInputChange} value={this.state.email} />
                 </label>
                 <button className='button' type='submit'>Add friend</button>
          
                </form>
                <ul className="grid">
                {this.state.friends.map(friend => {
                  return (
                    <ol key={friend.id} className="friend">
                     <div className="name">{friend.name}</div>
                     <div className="age">{`Age:${friend.age}`}</div>
                     <div className="email">{`Email: ${friend.email}`}</div>
                     </ol>
                  );
                })}
                </ul>
              </div>
              );
            }
          
          }
          
          
           export default Friends;