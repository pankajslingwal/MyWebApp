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
        this.formName = "User Profile Editable Form !!";
    }

    componentDidMount() {
    fetch(urlForUsername(this.props.username))
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }

        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          githubData: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
    }

    render()
    {
        return (
            <h1>testin - {this.formName}</h1>
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>,app);
