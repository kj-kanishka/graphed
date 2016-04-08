
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
		m
		.request({
			method: "GET",
			url: m.urls("company/website")
		})
		.then(function(data){
			console.log(data)
			m.route("/listwebsites");
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
		  {tag: "a", attrs: {class:"item", onclick:ctrl.listWebsites}, children: [
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