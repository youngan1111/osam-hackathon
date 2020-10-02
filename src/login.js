import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase";
import { AuthContext } from "./auth";
import "./login.css";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-wrap">

            <div className="login-html">

                <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked></input>
                <label htmlFor="tab-1" className="tab" checked>로그인</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"></input>
                <label htmlFor="tab-2" className="tab">회원가입</label>

                <div className="login-form">

                    <div className="sign-in-htm">
                        <form onSubmit={handleLogin}>
                            <div className="group">
                                <label className="label">
                                    아이디
                                        <input name="email" type="email" placeholder="Email" />
                                </label>
                            </div>
                            <div className="group">
                                <label classNmae="label">
                                    Password
                                        <input name="password" type="password" placeholder="Password" />
                                </label>
                            </div>
                            {/* <div className="group">
                                        <input id="check" type="checkbox" className="check" checked></input>
                                        <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                                    </div> */}
                            <div className="group">
                                <button type="submit">로그인</button>
                            </div>
                        </form>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <a href="#forgot" className="forgot">비밀번호 찾기</a>
                        </div>
                    </div>

                    {/* <div className="sign-up-htm">
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
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);
