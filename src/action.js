import request from 'superagent'
import {hashHistory} from 'react-router';
let host = 'http://101.200.129.112:9527';
let api = {
    detail : '/deploy/detail/'
};

export function getInit(obj) {
    return {
        type : 'get-init',
        info : obj.info,
        project:obj.project,
        users:obj.users
    }
}
export function getDetail(obj) {
    return {
        type : 'get-detail',
        data : obj
    }
}
export function detail(query) {
    return function (dispatch) {
        request
            .get(host+api.detail)
            .query(query)
            .withCredentials()
            .end(function (err, res) {
                var data = res.body;
                dispatch(getDetail(data))
            })
    }
}
