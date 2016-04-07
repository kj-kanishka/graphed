
var Menu = {};

//CTRL
Menu.controller = function(){

}


Menu.view = function(){
	return (
		{tag: "div", attrs: {class:"ui vertical menu"}, children: [
		  {tag: "a", attrs: {class:"teal active item"}, children: [
		    "Tasks", 
		    {tag: "div", attrs: {class:"ui teal label"}, children: ["1"]}
		  ]}, 
		  {tag: "a", attrs: {class:"item"}, children: [
		    "Team", 
		    {tag: "div", attrs: {class:"ui label"}, children: ["51"]}
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