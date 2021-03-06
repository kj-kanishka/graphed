var Graph = {};

require('transition');



Graph.SubRoutes = function(element){
	console.log("set element")
	Graph.container = m.prop(jQuery(element))
}

Graph.header = m.prop("Welcome")

//CTRL
Graph.controller = function(){
	


	var ctrl = {};

	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }

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


Graph.Load = function(ctrl){

	return (
		<div class="ui container" config={ctrl.viewConfig}>
			{require('module/partials/header')}
		  <div class="ui divider"></div>
		  <br/>
		  <div class="ui grid">
		    <div class="four wide column">
		    	{require('module/partials/menu')}
		    </div>
		    <div class="twelve wide column" config={Graph.SubRoutes}>
		    	<div class="ui column grid">
			      <div class="column">
			        <div class="ui raised segment">
			          <h2>{this.header()}</h2>
			          <p>Welcome to graphed.io</p>
			        </div>
			      </div>
			    </div>
		    </div>
		  </div>
		</div>
	);
}

Graph.view = function(ctrl){
	return (
		this.Load(ctrl)
		)
	// return (
	// 	auth.isLoggedIn()() ? this.Load(ctrl) : require('module/loader')
	// )
	
}

module.exports = Graph;