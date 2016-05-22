'use strict';


const Nav = React.createClass({	
	render:function(){
		return (<div className="nav">
							<div className="nav-item">全部内容</div>
							<div className="nav-item">个人信息</div>
						</div>)
	}
})

const List = React.createClass({
	render:function(){
		return (<div className=""></div>)
	}
})
const ListEmpty = React.createClass({
	render:function(){
		return (<div className="">暂无数据</div>)
	}
})
const ListController = React.createClass({
	getInitialState:function(){
		return {}
	},
	render:function(){
		var container;
		if(this.state.list && this.state.list.length!=0){
			container = <List data={this.state.list}/>
		}else{
			container = <ListEmpty/>
		}
		return (<div className="list">
							<div className="list-main">
								{container}
							</div>
						</div>)
	},
	componentDidMount:function(){
		var self = this;
		NProgress.start();
		$.get('/api/list',function(resp){
			NProgress.done()
      console.log(resp,'123')
			self.setState(resp);
		})
	}
})

const Controller = React.createClass({
	render:function(){
		return (<div className="">
							<Nav/>
							<ListController/>
						</div>)
	}
})

ReactDOM.render(
	<Controller></Controller>,
	document.getElementById('article-w')
)