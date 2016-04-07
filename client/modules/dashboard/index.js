var Dashboard = {};

var auth = require('module/auth');
require('transition');



Dashboard.SubRoutes = function(element){

	

}


//CTRL
Dashboard.controller = function(){
	


	var ctrl = {};

	//redirect if cookie doesnt exists.
	if(!auth.gotSession()){
		m.route('/connect');
		return {}
	}

	ctrl.DashboardElement = m.prop();

	ctrl.viewConfig = function(element){
		var elm = jQuery(element);
		ctrl.DashboardElement = m.prop(elm);
	};

	ctrl.fadeOut = function(element){
		var elem = jQuery(element);

            elem
            .transition({
                animation  : 'fade out',
                onComplete : function(){
                	m.redraw(true);

                	ctrl.DashboardElement()
                	.transition('fade in');                    
                }
            })
	}


	return ctrl;	
}


Dashboard.Load = function(ctrl){

	return (
		{tag: "div", attrs: {class:"ui container", config:ctrl.viewConfig}, children: [
			require('module/partials/header'), 
		  {tag: "div", attrs: {class:"ui divider"}}, 
		  {tag: "br", attrs: {}}, 
		  {tag: "div", attrs: {class:"ui grid"}, children: [
		    {tag: "div", attrs: {class:"four wide column"}, children: [
		    	require('module/partials/menu')
		    ]}, 
		    {tag: "div", attrs: {class:"twelve wide column", config:Dashboard.SubRoutes}, children: [
		    	{tag: "div", attrs: {class:"ui column grid"}, children: [
			      {tag: "div", attrs: {class:"column"}, children: [
			        {tag: "div", attrs: {class:"ui raised segment"}, children: [
			          {tag: "h2", attrs: {}, children: ["Your tasks"]}, 
			          {tag: "img", attrs: {class:"ui wireframe image", src:"http://semantic-ui.com/images/wireframe/paragraph.png"}}
			        ]}
			      ]}
			    ]}
		    ]}
		  ]}
		]}
	);
}

Dashboard.view = function(ctrl){
	
	return (
		auth.isLoggedIn()() ? this.Load(ctrl) : require('module/loader')
	)
	
}

module.exports = Dashboard;