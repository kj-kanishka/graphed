
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
		{tag: "div", attrs: {class:"ui vertical menu"}, children: [
		  {tag: "a", attrs: {class:"teal active item", onclick:ctrl.addWebsite}, children: [
		    "Add Website", 
		    {tag: "div", attrs: {class:"ui teal label"}, children: ["+"]}
		  ]}, 
		  {tag: "a", attrs: {class:"item", href:"/listwebsites"}, children: [
		    "List Websites", 
		    {tag: "div", attrs: {class:"ui label"}}
		  ]}, 
		  {tag: "a", attrs: {class:"item"}, children: [
		    "Graphs", 
		    {tag: "div", attrs: {class:"ui label"}, children: ["1"]}
		  ]}, 
		  {tag: "div", attrs: {class:"item"}, children: [
		    {tag: "div", attrs: {class:"ui transparent icon input"}, children: [
		      {tag: "input", attrs: {type:"text", placeholder:"Search..."}}, 
		      {tag: "i", attrs: {class:"search icon"}}
		    ]}
		  ]}
		]}
	)
}


module.exports = Menu;