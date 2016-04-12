var Website = {}
Website.SubRoutes = function (element) {

	// body...
}
var ctrl={}

Website.controller = function(){


	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }
	var websiteId = document.baseURI.split("=")[1];
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
	// ctrl.loadWebsite = m.prop()
	// ctrl.loadWebsite = function () {
	// 	m.addGlobalHeader('authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YWtzaGF5a3VtYXI1NzA3NzdjMmQ1ZTVmMTRmMDVhNmNjY2Rha3NoYXlAaGF0Y2hpdHVwLmNvbQ.w1pumA55gppaAjBl7f_cg5BmCM-3LHMp6wrQG6fl4mQ');
	// 	m
	// 	.request({
	// 		method:"GET",
	// 		url:m.urls("company/website")
	// 	}).then(function(data){
	// 		console.log(data);
	// 		ctrl.Website(data.data.projects);
	// 	})
	// }
	// ctrl.loadWebsite()
	// ctrl.loadwebsiteById = function(element){
	// 	var elem = jQuery(element);
	// 	Website.websiteId(element.attr("id"))
	// }
	return ctrl;	
}

Website.view = function(){
	return (
		<div class="ui container" config={ctrl.viewConfig}>
			{require('module/partials/header')}
		  <div class="ui divider"></div>
		  <br/>
		  <div class="ui grid">
		    <div class="four wide column">
		    	{require('module/partials/menu')}
		    </div>
		    <div class="twelve wide column" config={Website.SubRoutes}>
		    	    <div class="ui raised segment">
			          <h2>Website </h2>
			          
			         
			        </div>
			  </div>
		  </div>
		</div>
	)
}

module.exports = Website;