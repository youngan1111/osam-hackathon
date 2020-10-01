import React from 'react';
import firebase from './firebase';
import "./login.css";

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        checked: true,
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
                console.log(r);
                // this.props.login();
            });
    }
    setChecked = (checked) => {
        this.setState({checked})
    };

    render() { 
        const { username, password } = this.state;
        return (
                <div className="login-wrap">

                    <div className="login-html">
                        
                        <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked></input>
                        <label htmlFor="tab-1" className="tab" checked>로그인</label>
                        <input id="tab-2" type="radio" name="tab" className="sign-up"></input>
                        <label htmlFor="tab-2" className="tab">회원가입</label>

                        <div className="login-form">

                            <div className="sign-in-htm">
                                <div className="group">
                                    <label htmlFor="user" className="label">아이디</label>
                                    <input id="username" type="text" className="input" onChange={this.onChangeHandler} value={username}></input>
                                </div>
                                <div className="group">
                                    <label htmlFor="pass" className="label">비밀번호</label>
                                    <input id="password" type="password" className="input" data-type="password" onChange={this.onChangeHandler} value={password}></input>
                                </div>
                                {/* <div className="group">
                                    <input id="check" type="checkbox" className="check" checked></input>
                                    <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                                </div> */}
                                <div className="group">
                                    <button className="button" onClick={this.onClickHanlder}>로그인</button>
                                </div>
                                <div className="hr"></div>
                                <div className="foot-lnk">
                                    <a href="#forgot" className="forgot">비밀번호 찾기</a>
                                </div>
                            </div>

                            <div className="sign-up-htm">
                                <div className="group">
                                    <label htmlFor="user" className="label">아이디</label>
                                    <input id="user" type="text" className="input"></input>
                                </div>
                                <div className="group">
                                    <label htmlFor="pass" className="label">비밀번호</label>
                                    <input id="pass" type="password" className="input" data-type="password"></input>
                                </div>
                                <div className="group">
                                    <label htmlFor="pass" className="label">비밀번호 재확인</label>
                                    <input id="pass" type="password" className="input" data-type="password"></input>
                                </div>
                                <div className="group">
                                    <input type="submit" className="button" value="가입하기"></input>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        )
    }
}

export default Login;