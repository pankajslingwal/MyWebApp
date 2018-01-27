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
          username : $('#h_v').val(),
          name : '',
          emailId : '',
          dateOfBirth : '',
          countryofRedsidence : ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
        this.handleChangeCOuntry = this.handleChangeCOuntry.bind(this);
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
          name : JSON.parse(d.data).firstName,
          emailId : JSON.parse(d.data).email,
          dateOfBirth : JSON.parse(d.data).birthDate,
          countryofRedsidence : JSON.parse(d.data).country
          
        })
      }, () => {
        this.setState({ 
          requestFailed: true
        })
      })
    }

    handleChangeName(event) {
      this.setState({name: event.target.value.toUpperCase()});
    }

    handleChangeEmail(event) {
      this.setState({emailId: event.target.value.toUpperCase()});
    }

    handleChangeBirthday(event) {
      this.setState({dateOfBirth: event.target.value.toUpperCase()});
    }

    handleChangeCOuntry(event) {
      this.setState({countryofRedsidence: event.target.value.toUpperCase()});
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
              name : this.state.name,            
              email: this.state.emailId,
              dob : this.state.dateOfBirth,
              country : this.state.countryofRedsidence
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
      if (!this.state.name)
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
          
            <h2>Welcome {this.state.name}</h2>
            <div className="form-group">
                <div className="col-sm-6">
                  <input value={this.state.name} onChange={this.handleChangeName} disabled={myState} type="text" placeholder="First Name" className="form-control"></input>
                 </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                  <input value={this.state.emailId} disabled='true' type="text" placeholder="Email" className="form-control" ></input>
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                  <input value={this.state.dateOfBirth}  onChange={this.handleChangeBirthday} disabled={myState} type="text" placeholder="Birth Day" className="form-control" ></input>
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-6">
                    <input value={this.state.countryofRedsidence} onChange={this.handleChangeCOuntry} disabled={myState} type="text" placeholder="country" className="form-control" ></input>
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
