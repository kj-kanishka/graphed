//var m = require('mithril');
var Settings = {};

//CTRL
Settings.controller = function(){

}


Settings.view = function(ctrl){
	return (
	    {tag: "div", attrs: {class:"twelve wide column"}, children: [
	    	{tag: "div", attrs: {class:"ui column grid"}, children: [
		      {tag: "div", attrs: {class:"column"}, children: [
		        {tag: "div", attrs: {class:"ui raised segment"}, children: [
		          {tag: "h2", attrs: {}, children: ["Settings"]}, 
		          {tag: "img", attrs: {class:"ui wireframe image", src:"http://semantic-ui.com/images/wireframe/paragraph.png"}}
		        ]}
		      ]}
		    ]}
	    ]}		
	)
}


module.exports = Settings;