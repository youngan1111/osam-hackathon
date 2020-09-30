import React from 'react';
import firebase from './firebase';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }
    onChangeHandler = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value })
    }
    onClickHanlder = (e) => {
        e.preventDefault();
        console.log(this.state);
        firebase.doSignInWithEmailAndPassword(this.state.username, this.state.password)
            .then(r => {
                console.log(r)
                this.props.login();
            });
    }
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <form>
                    <input type="text" id="username" onChange={this.onChangeHandler} value={username} />
                    <input type="password" id="password" onChange={this.onChangeHandler} value={password} />
                    <button className="button" onClick={this.onClickHanlder}>로그인</button>
                </form>
            </div>
        )
    }
}

export default Login;