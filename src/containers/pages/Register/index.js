import React, {Component} from 'react';
import './Register.scss'
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import {Link} from 'react-router-dom';

class Register extends Component{
    state={
        email: '',
        password: '',
    }

    handleChangeText = (e) =>{
        this.setState({
            [e.target.id]: e.target.value,
            
        })
    }

    handleRegisterSubmit = () =>{
        const {email, password}=this.state;
        this.props.registerAPI({email, password});
        this.setState({
            email: "",
            password: ""
        })
        
    }

    render(){
        return(
            <div>
                <div className="auth-container">
                    <div className="auth-card">
                        <p className="auth-title">Register Page</p>
                        <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email}/>
                        <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password}/>
                        <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading}/>
                        <Link to="/login">
                            <Button title="Go to Login Page"/>
                        </Link>
                        
                    </div>
                </div>
                <button>Go To Dashboard</button>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);