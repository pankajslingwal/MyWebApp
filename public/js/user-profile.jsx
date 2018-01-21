//https://www.youtube.com/watch?v=vu_rIMPROoQ

import React from "react";
import ReactDOM from "react-dom";

//https://github.com/javascript-playground/remote-data-react-screencasts/blob/master/src/Github.js

const urlForUsername = username => 'http://localhost:3000/getUser'
//const urlForUsername = username => 'http://localhost:3000/getUser/${username}'


class Layout extends React.Component {
    constructor()
    {
        super();
        this.state = {
          requestFailed: false,
          button :true
        }
        this.formName = "User Profile Editable Form !!";
    }

    makeFormEditable()
    {
      const myState2 = this.state.button;

      if(myState2)
      {
        //control should b e disable by defaultValue
        //in this loop we have to make them enabled
        this.setState({button: false});
      }
      else{

        //take user input and pouplate user data and submitt
        //disbale user input
        this.setState({button: true});
      }
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
      const myState = this.state.button;

      var buttonText;
      var readOnlyText;

      if(myState)
      {
        buttonText = "Edit";
      }
      else{
        buttonText = "Save";
      }

      if (this.state.requestFailed)
      { 
        return <p>Failed!</p>
      }
      if (!this.state.userData)
      { 
         return <p>Loading...</p>
      }
      
        return (
          <div className="container">
          <form className="form-horizontal" role="form">

            <h2>Welcome {this.state.userData.firstName}</h2>
            <div className="form-group">
                <div className="col-sm-6">
                  <input readOnly type="text" placeholder="First Name" className="form-control" defaultValue={this.state.userData.firstName}></input>
                 </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                  <input readOnly type="text" placeholder="Email" className="form-control" defaultValue={this.state.userData.email}></input>
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                  <input readOnly type="text" placeholder="Birth Day" className="form-control" defaultValue={this.state.userData.birthDate}></input>
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                    <input readOnly type="text" placeholder="country" className="form-control" defaultValue={this.state.userData.country}></input>
                </div>
             </div>

             <div className="form-group">
                <div className="col-sm-2">
                  <button type="button"  className="btn btn-primary btn-block" onClick={this.makeFormEditable.bind(this)}>{buttonText}</button>
                </div>
             </div>
          </form>   
      </div>  
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>,app);
