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
		<div class="ui container" config={ctrl.viewConfig}>
			{require('module/partials/header')}
		  <div class="ui divider"></div>
		  <br/>
		  <div class="ui grid">
		    <div class="four wide column">
		    	{require('module/partials/menu')}
		    </div>
		    <div class="twelve wide column" config={Dashboard.SubRoutes}>
		    	<div class="ui column grid">
			      <div class="column">
			        <div class="ui raised segment">
			          <h2>Your tasks</h2>
			          <img class="ui wireframe image" src="http://semantic-ui.com/images/wireframe/paragraph.png"/>
			        </div>
			      </div>
			    </div>
		    </div>
		  </div>
		</div>
	);
}

Dashboard.view = function(ctrl){
	
	return (
		auth.isLoggedIn()() ? this.Load(ctrl) : require('module/loader')
	)
	
}

module.exports = Dashboard;