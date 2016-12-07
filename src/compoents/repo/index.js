import React from 'react';
import {detail} from '../../action';
import {connect} from 'react-redux';
import {Row,Col,Button} from 'antd';
import { Steps } from 'antd';
const Step = Steps.Step;
import './index.css'
var Repo = React.createClass({
   render(){
       const {project} =this.props;
       const {active_branch,admin,commit_info,folders,description,local_branches,logo,name,remote_branches,url} = project;
       let local_branch_nodes =[];
       for(let key in local_branches){
           local_branch_nodes.push(
               <a key={key} href="javascript:void(0)">{key}/</a>
           )
       }
       let remote_branches_nodes =[];
       for(let key in remote_branches){
           remote_branches_nodes.push(
               <a key={key} href="javascript:void(0)">{key}/</a>
           )
       }
       return(
           <div className="detail">
               <h3>{name}项目详细信息</h3>
               <Row>
                   <Col span={8} offset={4}>
                       <h3>基本信息</h3>
                       <ul className="detail-message">
                           <li>
                               <p>项目名字:<span>{name}</span></p>
                           </li>
                           <li>
                               <p>作者:<span>{admin.name}</span></p>
                           </li>
                           <li>
                               <p>active_branch:<span><a href="javascript:void(0)">{active_branch}</a></span></p>
                           </li>
                           <li>
                               <p>folders:<span>{folders.map((str,i)=> <a href="javascript:void(0)" key={i}>{str}/</a>)}</span></p>
                           </li>
                           <li>
                               <p>local_branch:<span>{local_branch_nodes}</span></p>
                           </li>
                           <li>
                               <p>remote_branches:<span>{remote_branches_nodes}</span></p>
                           </li>
                           <li>
                               <p>description:<span>{description}</span></p>
                           </li>
                       </ul>
                   </Col>
                   <Col span={10} offset={2}>
                       <div className="edition">
                           <h3 style={{marginRight: 60}}>版本信息</h3>
                           <Steps direction="vertical" size="default" current={commit_info.length}>
                               {commit_info.map((obj,i)=>
                                   <Step key={i} title={obj.committer.message} description={
                                       <Row>
                                           <Col span={12}>
                                               <p>名字:<span>{obj.committer.name}</span></p>
                                               <p>E-mail:<span>{obj.committer.email}</span></p>
                                               <p><Button type='ghost'>reset to here</Button></p>
                                           </Col>
                                           <Col span={12}>
                                               <p>信息:<span>{obj.message}</span></p>
                                               <p>总结:<span>{obj.summary}</span></p>
                                               <p>时间:<span>{obj.time}</span></p>
                                           </Col>
                                       </Row>
                                   } />
                               )}
                           </Steps>
                       </div>
                   </Col>
               </Row>
           </div>
       )
   },
    componentDidMount(){
        const {params,dispatch} = this.props;
        const {id} = params;
        dispatch(detail({repo_id:id}))
    }
});
const store2props = function (store) {
    return {
        project:store.detail.project
    }
};
export default connect(store2props)(Repo);
