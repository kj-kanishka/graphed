
var Menu = require('module/partials/menu');
var Header = {};


//CTRL
Header.controller = function(){
}

Header.config = function(ctrl){

	return function(element,isInit){
	}
};

var slideout;

Header.sidebarIcon =  function(element,isInit){

	slideout = new Slideout({
	    'panel': element,
	    'menu': Menu.Elements.sidebar,
	    'padding': 120,
	    'tolerance': 20
	});
	element.onclick = function(e){
		e.preventDefault(); 
		slideout.toggle();
	}
}

Header.view = function(){
	return (
			{tag: "div", attrs: {}, children: [
				{tag: "br", attrs: {}}, 
				{tag: "div", attrs: {class:"ui secondary menu"}, children: [
			    	{tag: "div", attrs: {class:"ui compact menu"}, children: [
					    {tag: "a", attrs: {class:"item"}, children: [
					      {tag: "i", attrs: {class:"icon announcement"}}, " Milestones"
					    ]}, 
					    {tag: "a", attrs: {class:"item", href:"/", config:m.fadesOutPage}, children: [
						    {tag: "i", attrs: {class:"icon mail"}}, " Conversation", 
						    {tag: "div", attrs: {class:"floating ui red label"}, children: ["22"]}
						]}

					]}, 
				    
				    {tag: "div", attrs: {class:"right menu"}, children: [
					  
					  {tag: "a", attrs: {class:"item", href:"/settings", config:m.fadesOutPage}, children: [
				        "Settings"
				      ]}, 
				      {tag: "a", attrs: {class:"item", href:"/logout", config:m.fadesOutPage}, children: [
				        "Logout"
				      ]}
					]}
			  	]}
		  	]}
		 )


}


module.exports = Header;