var Website = {}
Website.SubRoutes = function (element) {

	// body...
}
var ctrl={}
ctrl.webpages=m.prop([])

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
	ctrl.loadWebsite = m.prop()
	ctrl.loadWebsite = function () {
		m.addGlobalHeader('authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YWtzaGF5a3VtYXI1NzA3NzdjMmQ1ZTVmMTRmMDVhNmNjY2Rha3NoYXlAaGF0Y2hpdHVwLmNvbQ.w1pumA55gppaAjBl7f_cg5BmCM-3LHMp6wrQG6fl4mQ');
		m
		.request({
			method:"GET",
			url:m.urls("webpages/"+websiteId)
		}).then(function(data){
			console.log(data);
			data.data.forEach(function(page){
				m
				.request({
					method:'GET',
					url:m.urls('users/'+page.pageId)
				}).then(function(resp){
					page.users = resp.data.users;
					ctrl.webpages().push(page);
				})
			})
		})
	}
	ctrl.loadWebsite()
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
			          <h2>Webpages </h2>
			          {
			          	ctrl.webpages().map(function(val){
			          		return  <div class="ui segment">
			          					<div class="ui grid">
			          						<div class="two wide column"><i class="world icon"></i></div>
			          						<div class="ten wide column"><a   href={"websitedetails?id="+val.pageId}>{val.address}</a></div>
			          						<div class="two wide column">users:{val.users}</div>
			          						<div class="two wide column"><i class="remove icon"></i></div>
			          					</div>
			          				</div>

			          	})
			          }
			         
			        </div>
			  </div>
		  </div>
		</div>
	)
}

module.exports = Website;