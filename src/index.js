import React from 'react';
import ReactDOM from 'react-dom';
import R from './router';
import reducer from './reducer';
import {Provider,connect} from 'react-redux';
import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import request from 'superagent';
import { Form, Icon, Input, Button,Spin,Row,Col} from 'antd';
const FormItem = Form.Item;
import 'antd/dist/antd.min.css';
import './index.css';
const store = createStore(reducer,compose(
    applyMiddleware(thunk)
));
var host = 'http://101.200.129.112:9527';
const api = {
    init : '/deploy/init/',
    login: '/deploy/login/',
    logout : '/deploy/logout/'
};

window.initData = null;
let Init = React.createClass({
    render(){
        return(
            <div className="example">
                <Spin size="large"/>
            </div>
        )
    },
    componentDidMount(){
        request
            .get(host+api.init)
            .withCredentials()
            .end(function (err,res) {
                if(res.body.noLogin){
                    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
                    ReactDOM.render(<Login/>,document.getElementById('root'));
                }else{
                    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
                    window.initData = res.body;
                    ReactDOM.render(
                        <div className="App">
                            <Provider store={store}>
                                <R/>
                            </Provider>
                        </div>,
                        document.getElementById('root')
                    );
                }
            })
    }
});
let Login = React.createClass({
    getInitialState(){
        return {
            username:'',
            password:''
        }
    },
    render(){
        return(
           <div className="login">
               <h3>自动发布系统</h3>
               <Form className="login-form">
                   <FormItem>
                       <Input
                           value={this.state.username}
                           addonBefore={<Icon type="user" />}
                           placeholder="Username"
                           onChange={(e)=>this.setState({username:e.target.value})}
                       />
                   </FormItem>
                   <FormItem>
                       <Input
                           value={this.state.password}
                           addonBefore={<Icon type="lock" />}
                           type="password" placeholder="Password"
                           onChange={(e)=>this.setState({password:e.target.value})}
                       />
                   </FormItem>
                   <FormItem>
                       <Button
                           type="primary"
                           htmlType="submit"
                           className="login-form-button"
                           onClick={this.login}
                       >
                           Log in
                       </Button>
                   </FormItem>
               </Form>
           </div>
        )
    },
    login(){
        const query = {
            name:this.state.username,
            password:this.state.password
        };
        request
            .get(host+api.login)
            .query(query)
            .withCredentials()
            .end(function (err, res) {
               if(res.body.noLogin){
                   console.log("登录失败")
               }else{
                   ReactDOM.unmountComponentAtNode(document.getElementById('root'));
                   ReactDOM.render(
                       <Init/>,
                       document.getElementById('root')
                   )
                }
            })
    }
});
ReactDOM.render(
  <Init/>,document.getElementById('root')
);
