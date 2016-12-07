import React from 'react';
import './index.css';
import {Row,Col} from 'antd';
import Logo from'../../images/logo.jpg';
import {hashHistory} from 'react-router';
let User = React.createClass({
    render(){
        const {data,info} =this.props;
        const{project}=data;
        let userprojects = project.map((obj,i)=>{
            return(
                <li key={obj.id} onClick={(e)=>hashHistory.push('repo/'+obj.id)}>
                    {obj.name}
                </li>
            )
        });
        return(
            <ul className="list">
                {userprojects}
            </ul>
        )
    }
});
let Home = React.createClass({
    render(){
        const {info,users} = this.props;
        let projects = info.project.map((obj,i)=>{
            return(
                <li key={obj.id} onClick={(e)=>hashHistory.push('repo/'+obj.id)}>
                    {obj.name}
                </li>
            )
        });
        let user = users.map((obj,i)=>{
            if(obj.id!=info.id){
                return(
                   <div className="user" key={i}>
                       <Row >
                           <Col span={4}>
                               <div className="my-info">
                                   <img src="/static/media/logo.1f6ea201.jpg" alt=""/>
                                   <p>{obj.name}的项目</p>
                               </div>
                           </Col>
                           <Col span={20}>
                               <User data={obj}/>
                           </Col>
                       </Row>
                   </div>
                )
            }
        });
        return (
            <div className="home">
                <h3 className="title">前端自动化发布系统</h3>
                <div className="my">
                    <Row>
                        <Col span={4}>
                            <div className="my-info">
                                <img src="/static/media/logo.1f6ea201.jpg" alt=""/>
                                <p>{info.name}的项目</p>
                            </div>
                        </Col>
                        <Col span={20}>
                            <ul className="list">
                                {projects}
                            </ul>
                        </Col>
                    </Row>
                    {user}
                </div>
            </div>
        );
    }
});

import {connect} from 'react-redux'

const store2props = function (store) {
    return {
        info:store.me.info,
        users:store.me.users
    }
};
export default connect(store2props)(Home);
