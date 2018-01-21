//https://www.youtube.com/watch?v=vu_rIMPROoQ

import React from "react";
import ReactDOM from "react-dom";

//https://github.com/javascript-playground/remote-data-react-screencasts/blob/master/src/Github.js

const urlForUsername = username => 'http://localhost:3000/getUser'
//const urlForUsername = username => 'https://api.github.com/users/${username}'


class Layout extends React.Component {
    constructor()
    {
        super();
        this.state = {
          requestFailed: false
        }
        this.formName = "User Profile Editable Form !!";
    }

    makeFormEditable()
    {
      console.log("pankaj");
      return "";
    }

    componentDidMount() {
    fetch(urlForUsername(this.props.username))
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
      .then(d=> d.json())
      .then(d => {
        this.setState({
          userData: JSON.parse(d.data)
        })
      }, () => {
        this.setState({ 
          requestFailed: true
        })
      })
    }

    render()
    {
      if (this.state.requestFailed)
      { 
        return <p>Failed!</p>
      }
      if (!this.state.userData)
      { 
         return <p>Loading...</p>
      }
      
        return (
           <div>
             <p>{this.state.userData.firstName}</p>
            <p>{this.state.userData.email}</p>
            <p>{this.state.userData.birthDate}</p>
            <p>{this.state.userData.country}</p>
            <button onClick={this.makeFormEditable}>Edit Profile</button>
          </div>     
        );
        
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>,app);
