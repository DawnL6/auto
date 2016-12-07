import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import {bindActionCreators} from 'redux';
import Home from './compoents/home';
import Page404 from './compoents/page404';
import Repo from './compoents/repo';
import {getInit} from './action';
let R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home}></Route>
                <Route path="repo/:id" component={Repo}></Route>
                <Route path="*" component={Page404}></Route>
            </Router>
        )
    },
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(getInit(window.initData))
    }

});
const mapState2props  = function () {
    return{}
};
const dispatch2props = function (dispatch) {
    return {
        dispatch:dispatch
    }
};
export default connect(mapState2props,dispatch2props)(R)
