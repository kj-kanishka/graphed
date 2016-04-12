var Websites = {}

Websites.SubRoutes = function (element) {

	// body...
}
var ctrl={}


ctrl.websites=m.prop([
      {
        "_id": "570228210828dec30367481d",
        "companyId": "570227c90828dec30367481c",
        "active": true,
        "websiteId": 325,
        "website": "www.hatchitservices.com",
        "__v": 0
      },
      {
        "_id": "570228210828dec30367481d",
        "companyId": "570227c90828dec30367481c",
        "active": true,
        "websiteId": 325,
        "website": "www.google.com",
        "__v": 0
      }
    ])

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
	ctrl.loadWebsites = m.prop()
	ctrl.loadWebsites = function () {
		m.addGlobalHeader('authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YWtzaGF5a3VtYXI1NzA3NzdjMmQ1ZTVmMTRmMDVhNmNjY2Rha3NoYXlAaGF0Y2hpdHVwLmNvbQ.w1pumA55gppaAjBl7f_cg5BmCM-3LHMp6wrQG6fl4mQ');
		m
		.request({
			method:"GET",
			url:m.urls("company/website")
		}).then(function(data){
			console.log(data);
			ctrl.websites(data.data.projects);
		})
	}
	ctrl.loadWebsites()
	
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
		    	    <div class="ui raised segment">
			          <h2>Websites List</h2>
			          {
			          	ctrl.websites().map(function(val){
			          		return  <div class="ui segment">
			          					<div class="ui grid">
			          						<div class="two wide column"><i class="world icon"></i></div>
			          						<div class="twelve wide column"><a   href={"websitedetails?id="+val.websiteId}>{val.website}</a></div>
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

module.exports = Websites;