
var Menu = {};
var Graph = require('module/graph')
//CTRL
var ctrl = {}
Menu.controller = function(){
	
	ctrl.addWebsite = m.prop()
	ctrl.listWebsites = m.prop()
	ctrl.addWebsite = function(){
		var elem = Graph.container()
		console.log(elem.html(this.view))
	}

	ctrl.listWebsites = function(){
		m.addGlobalHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YWtzaGF5a3VtYXI1NzA3NzdjMmQ1ZTVmMTRmMDVhNmNjY2Rha3NoYXlAaGF0Y2hpdHVwLmNvbQ.y15gtnO2GwwOEW-gKJz_NKvI0QAbS2SNARh741Sw60Y');
		m
		.request({
			method: "GET",
			url: m.urls("company/website")
		})
		.then(function(data){
			console.log("data")
						
		});
	}
}


Menu.view = function(){
	return (
		<div class="ui vertical menu">
		  <a class="teal active item" onclick={ctrl.addWebsite}>
		    Add Website
		    <div class="ui teal label">+</div>
		  </a>
		  <a class="item" href="/listwebsites">
		    List Websites
		    <div class="ui label"></div>
		  </a>
		  <a class="item">
		    Graphs
		    <div class="ui label">1</div>
		  </a>
		  <div class="item">
		    <div class="ui transparent icon input">
		      <input type="text" placeholder="Search..." />
		      <i class="search icon"></i>
		    </div>
		  </div>
		</div>
	)
}


module.exports = Menu;