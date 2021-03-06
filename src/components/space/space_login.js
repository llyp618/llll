import React from 'react';
import {browserHistory} from 'react-router';
import Page from '../../partial/page/page';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './space.less';
import 'whatwg-fetch';
import Captcha from '../../partial/captcha';
// 登录
class LoginBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			submitDisabled:true,
			resError:true,
			resMsg:''
		}
		this.submit = {
			account:false,
			password:false,
			captcha:false,
		}
	}
	verify(account,password){
		if(account == '' ){
			this.setState({
				accountError:'请输入账号'
			})
			return false;
		}
		if(password == '') {
			this.setState({
				passwordError:'请输入密码'
			})
			return false;
		}
		return true
	}
	doLogin(){
		let sAccount = this.refs.account.getValue().replace(/\s/,'');
		let sPassword = this.refs.password.getValue().replace(/\s/,'');
		fetch('/api/space/space_login',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				account:sAccount,
				password:sPassword
			})
		}).then((res) => {
			return res.json()
		})
		.then((data) => {
			if(data.status == 0){
				this.setState({
					resError:true,
					resMsg:data.msg
				})
				this.refs.captcha.updateCap(()=>{
					this.submit.captcha = false;
					this.setSubmitDisabled();
				})
			}else if (data.status == 1){
				const token = data.access_token;
				sessionStorage.setItem('access_token',token);
				browserHistory.push('/space/space_blog_list');
			}
		})
	}
	setAccount = (e) => {
		let sAccount = e.target.value.replace(/\s/,'');
		if( sAccount == ''){
			this.submit.account = false;
		}else {
			this.submit.account = true;
		}
		this.setSubmitDisabled();
	}
	setPassword = (e) => {
		let sPassword = e.target.value.replace(/\s/,'');
		if( sPassword == ''){
			this.submit.password = false;
		}else {
			this.submit.password = true;
		}
		this.setSubmitDisabled();
	}
	setCaptcha = (isValid) => {
		this.submit.captcha = isValid;
		this.setSubmitDisabled();
	}
	setSubmitDisabled = () => {
		if(this.submit.account && this.submit.password && this.submit.captcha){
			this.setState({
				submitDisabled:false
			})
		}else {
			this.setState({
				submitDisabled:true
			})
		}
	}
	render(){
		return (
			<div className="login-box">
				<TextField
		      hintText="账号"
		      floatingLabelText="输入账号" fullWidth={true}
		      name="account"
		      ref="account"
		      onChange={this.setAccount}
		    /> <br/>
				<TextField
		      hintText="密码"
		      floatingLabelText="输入密码" fullWidth={true} type="password"
		      name="password"
		      ref="password"
		      onChange={this.setPassword}
		    />
		    <Captcha captchaRe={(isValid) => {this.setCaptcha(isValid)}} ref="captcha"/>
		     <br/><br/>
		    <RaisedButton label="确 认 登 录" onClick={() => this.doLogin()} disabled={this.state.submitDisabled} primary={true} fullWidth={true} />
				<p className={`error-text ${this.state.resError? 'active' : ''}`}>
					{this.state.resMsg}
				</p>
			</div>
		)
	}
}


class SpaceLogin extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}
	render(){
		return (
			<div className="main-content">

				<div className="space-login">
					<h3>登 录</h3>
					<LoginBox />
				</div>
			</div>
		)
	}
}

export default SpaceLogin;