//https://www.youtube.com/watch?v=vu_rIMPROoQ
import React from "react";
import ReactDOM from "react-dom";

const urlForUsername = 'http://localhost:3000/getUser/'

class Layout extends React.Component {
    constructor()
    {
        super();
        this.state = {
          requestFailed: false,
          button :true,
          processing : false,
          username : $('#h_v').val()
        }
        this.formName = "User Profile Editable Form !!";
    }

   
    componentDidMount() {
    fetch(urlForUsername + this.state.username)
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

     makeFormEditable() 
    {
      const myState2 = this.state.button;

      if(myState2)
      { 
        this.setState({button: false});
      }
      else{
        
        this.setState({processing: true});
         
        $.ajax({
          url: 'http://localhost:3000/updateUser',
          type: 'POST',
          contentType: "application/json",
          data: JSON.stringify({ 
              email: this.state.userData.email
          }),
          success: function(data) {
            this.setState({processing: false});
            this.setState({button: true});
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(this.props.url, status, err.toString());
          }.bind(this)
        });
        
        
      }
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
      if (this.state.processing)
      { 
         return <p>Processing...</p>
      }
      
        return (
          <div className="container">
          <form className="form-horizontal" role="form">

            <h2>Welcome {this.state.userData.firstName}</h2>
            <div className="form-group">
                <div className="col-sm-6">
                  <input disabled={myState} type="text" placeholder="First Name" className="form-control" defaultValue={this.state.userData.firstName}></input>
                 </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                  <input disabled={myState} type="text" placeholder="Email" className="form-control" defaultValue={this.state.userData.email}></input>
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                  <input disabled={myState} type="text" placeholder="Birth Day" className="form-control" defaultValue={this.state.userData.birthDate}></input>
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                    <input disabled={myState} type="text" placeholder="country" className="form-control" defaultValue={this.state.userData.country}></input>
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
