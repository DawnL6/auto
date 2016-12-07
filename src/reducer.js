import {combineReducers} from 'redux'
const me = function (state={info:{},project:[],users:[]}, action) {
    switch (action.type){
        case 'get-init':
            return Object.assign({},state,{info:action.info,project:action.project,users:action.users})
    }
    return state
};
const detail = function (state={project:{
    active_branch:'',
    admin:{},
    commit_info:[],
    folders:[],
    description:'',
    local_branches:[],
    logo:'',
    name:'',
    remote_branches:[],
    url:''
}}, action) {
    switch (action.type){
        case 'get-detail':
            return Object.assign({},state,{project:action.data})
    }
    return state
};
const reducer = combineReducers({
    me,
    detail
});
export default reducer