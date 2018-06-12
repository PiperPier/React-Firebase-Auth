import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";
import StyleFiredbaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyDx5H2u1d0gMNwU4w1vi4n_l3M8Cj6bpQQ",
  authDomain:"fireabse-auth-tutorial.firebaseapp.com"
})

class App extends Component {
  state={isSignedIn: false}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

componentDidMount = ()=>{

  firebase.auth().onAuthStateChanged(user=>{
    this.setState({isSignedIn: !!user})
    console.log("user",user)
  })
}

  render() {
    return (
      <div className="App">
      {this.state.isSignedIn ? (
        <span>
      <div>Signed In!</div>  
      <button onClick={()=>firebase.auth().signOut()} >Sign out!</button>
      <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
      <img 
        alt="profile picture" 
        src={firebase.auth().currentUser.photoURL}
      />
      </span>
      ) : (
        <StyleFiredbaseAuth
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
        />
        )}
      </div>
    )
  }
}

export default App;
