import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/atoms/Button';
import { LoginUserAPI } from '../../../config/redux/action';

class Login extends Component{
    state={
        email: '',
        password: '',
    }

    handleChangeText = (e) =>{
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleLoginSubmit = async() =>{
        const {email, password}=this.state;
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if(res){
            console.log('Login Success');
            this.setState({
                email: "",
                password: ""
            })
            history.push('/')
        }else {
            console.log('Login Failed')
        }
        
    }



    render(){
        return(
            <div>
                <div className="auth-container">
                    <div className="auth-card">
                        <p className="auth-title">Login Page</p>
                        <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email}/>
                        <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password}/>
                        <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading}/>
                    </div>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(LoginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);