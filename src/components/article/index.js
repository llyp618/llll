import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../../partial/page/page.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List,ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import Loading from '../../partial/loading/loading';
import './hightlight.css';
import'./article.less';
import 'whatwg-fetch';
class Article extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			blog:{},
			loaded:false
		};
		this.style = {
			cardText : {
				fontSize:16,
				lineHeight:1.4,
				paddingTop:0
			}
		}
	}
	componentDidMount() {
		let articleId = this.props.params.id,
				articleType = this.props.params.type
		fetch('/api/article',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				id:articleId,
				type:articleType
			})
		})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			this.setState({
				blog : data.blog,
				loaded:true
			})
		})
	}
	render(){
		if(!this.state.loaded){
			return (
				<Page isLeftMenu={true} isRightMenu={true}>
					<Loading words="加载中" />
				</Page>
			)
		}
		return (
				<Page isLeftMenu={true} isRightMenu={true}>
					<Card className="article-card" >
						<div className="articleHeader">
							<span className="articleTitle">{this.state.blog.title} </span>
							<span className="articleTime">{this.state.blog.create_time}</span>
						</div>
						<hr className="articleHr" />
					   	<CardText  style={this.style.cardText} dangerouslySetInnerHTML={{__html:this.state.blog.content}}>
					    </CardText>
					  <CardActions style={{textAlign:'right'}}>
						      <Link className="link" to={`/${this.props.params.type}`}><FlatButton label="返回列表" secondary={true}></FlatButton></Link>
						</CardActions>
				  	</Card>
				  	<Card className="articleComments">
				  		<CardHeader title="评论留言" titleStyle={{fontSize:20,fontWeight:800}}></CardHeader>
				  		<ul>
				  			<li>
				  				<span className="commentName">ttiancai : </span>
				  				<p className="commentText">nis sdkj mk klfu sdk mncv kj  cmnv d nvuh snm ldks mcv haioudf nsmc jdf </p>
				  			</li>
				  			<li>
				  				<span className="commentName">ttiancai : </span>
				  				<p className="commentText">nis sdkj mk klfu sdk mncv kj  cmnv d nvuh snm ldks mcv haioudf nsmc jdf </p>
				  			</li>
				  		</ul>
				  	</Card>
				</Page>
		)
	}
}

export default Article;