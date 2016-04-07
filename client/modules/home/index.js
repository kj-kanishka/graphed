
var auth = require('module/auth');
var HomePage = {};


//CTRL
HomePage.controller = function(){
	if(auth.gotSession())
		m.route("/dashboard");
	else
		m.route("/connect");
	//check if user is logged in
	return {
		onunload:function(){
			console.log("unloading home component");
		}
	}
}

HomePage.view = function(ctrl){
	return m.component(require('module/partials/header'))
	
}


module.exports = HomePage;