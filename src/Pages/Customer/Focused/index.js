import React,{ Component } from 'react'
import $ from 'jquery'
export default class Home extends Component{
    componentWillMount = () => {
        $.ajax({
		url : 'customers',
		data : {index : 1, size : 10},
		type : 'get',
		dataType : 'json',
		success : function(response) {
			console.dir(response);
		}
	});
    }
    render(){
        return <h2> customer focused </h2>
    }
}
