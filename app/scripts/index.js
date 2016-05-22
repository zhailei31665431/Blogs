'use strict';


const Nav = React.createClass({	
	render:function(){}
})

const ListEmpty = React.createClass({
	render:function(){
		return (<div className="">暂无数据</div>)
	}
})
const List = React.createClass({
	render:function(){
		console.log(this.props)
		return (<div className=""></div>)
	}
})

const Controller = React.createClass({
	getInitialState:function(){
		var self = this;
		return {}
	},
	render:function(){
		var container;
		if(this.state.list && this.state.list.length!=0){
			container = <List data={this.state.list}/>
		}else{
			container = <ListEmpty/>
		}
		return (<div className="">{container}</div>)
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

ReactDOM.render(
	<Controller></Controller>,
	document.getElementById('article-w')
)