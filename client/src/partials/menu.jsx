
var Menu = {};

//CTRL
Menu.controller = function(){

}


Menu.view = function(){
	return (
		<div class="ui vertical menu">
		  <a class="teal active item">
		    Tasks
		    <div class="ui teal label">1</div>
		  </a>
		  <a class="item">
		    Team
		    <div class="ui label">51</div>
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