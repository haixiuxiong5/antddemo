import React, { Component } from 'react';
import {Layout,Menu,Icon} from 'antd'
import './App.css'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Home from './components/Home'
import HotMovie from './components/HotMovie'
import SoonMovie from './components/SoonMovie'
import Top250 from './components/Top250'
import Detail from './components/Detail'
const {SubMenu} = Menu;
const {Header,Content,Sider,Footer} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
	  collapsed:false,
	  url:'home'
    }
  }
  toggle(){
    // this.setState({
    //   collapsed:!this.state.collapsed
    // });
  }
  render() { 
    return ( 
			<Router>
				<Layout>
					<Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
						<div className="logo" style={{height:'32px',backgroundColor:'#666',borderRadius:'6px',margin:'16px',color:'#fff',lineHeight:'32px',textAlign:'center'}}>豆瓣电影</div>
						<Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.url || "home"]} defaultOpenKeys={["sub1"]}>
							<Menu.Item key="home">
								<Link to="/home"><Icon type="home" /><span>首页</span></Link>
								
							</Menu.Item>
							<SubMenu key='sub1' title={<span><Icon type="laptop" />豆瓣电影</span>}>
								<Menu.Item key="HotMovie"><Link to="/HotMovie">最近热映</Link></Menu.Item>
								<Menu.Item key="SoonMovie"><Link to="/SoonMovie">即将上映</Link></Menu.Item>
								<Menu.Item key="Top250"><Link to="/Top250">Top250</Link></Menu.Item>
							</SubMenu>
							<Menu.Item key="6">
								<Icon type="upload" />
								<span>nav 3</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout style={{marginLeft:200}}>
						<Header style={{backgroundColor:'#fff'}}>
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle.bind(this)}
							/>
						</Header>
						<Content style={{ background: '#fff', margin: 16,padding:24, minHeight: 280 }}>
							<Route exact path="/home" component={Home}></Route>
							<Route exact path="/HotMovie" component={HotMovie}></Route>
							<Route exact path="/SoonMovie" component={SoonMovie}></Route>
							<Route exact path="/Top250" component={Top250}></Route>
							<Route path="/Detail/:id" component={Detail}></Route>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							Ant Design ©2016 Created by Ant UED
						</Footer>
					</Layout>
				</Layout>
			</Router>
    );
  }
  componentWillMount(){
	  let url=window.location.pathname;
	  url=url.split('/')
	  this.setState({
		url:url[1]
	  });
  }
}
 
export default App;
