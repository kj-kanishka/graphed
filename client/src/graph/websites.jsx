var Websites = {}

Websites.SubRoutes = function (element) {
	// body...
}
var ctrl={}
Websites.controller = function(){


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

Websites.view = function(){
	return (
		<div class="ui container" config={ctrl.viewConfig}>
			{require('module/partials/header')}
		  <div class="ui divider"></div>
		  <br/>
		  <div class="ui grid">
		    <div class="four wide column">
		    	{require('module/partials/menu')}
		    </div>
		    <div class="twelve wide column" config={Websites.SubRoutes}>
		    	<div class="ui column grid">
			      <div class="column">
			        <div class="ui raised segment">
			          <h2>Website List</h2>
			          <div class="ui segment">
			          Top
			          </div>
			        </div>
			      </div>
			    </div>
		    </div>
		  </div>
		</div>
	)
}

module.exports = Websites;