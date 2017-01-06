import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../page/page.js';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import './home.less';
class EntryPaper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {zDepth:1};
		this.style = {
			height:340,
			width:300,
			margin:20,
			display: 'inline-block',
		}
	}
	_onMouseEnter = () => this.setState({zDepth:3});
	_onMouseLeave = () => this.setState({zDepth:1});
	render(){
		return (
			<Paper style={this.style} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} zDepth={this.state.zDepth} >
				{this.props.children}
			</Paper>
		)
	}
}
class Entry extends React.Component {

	constructor(props) {
		super(props);
		
	}
	render(){
		return (
			<div className="entry-wrap">
				<EntryPaper>
					<Link className="link" to="/blog">
						<div className="entry-paper-header">
							My Blog
						</div>
						<div className="entry-paper-body">
						</div>
					</Link>
				</EntryPaper>
				<EntryPaper>
					<Link className="link" to="/blog">
						<div className="entry-paper-header">
							My DailyLife
						</div>
						<div className="entry-paper-body">
						</div>
					</Link>
				</EntryPaper>
				<EntryPaper>
					<Link className="link" to="/blog">
						<div className="entry-paper-header">
							My Personal Space
						</div>
						<div className="entry-paper-body">
						</div>
					</Link>
				</EntryPaper>
			</div>
		)
	}
}
class Home extends React.Component {

	render(){
		return (
				<Page>
					<h1 className="website-title">LuLu's Home</h1>
					<Entry />
				</Page>
			)
	}
}

export default Home;