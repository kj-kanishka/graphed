//var m = require('mithril');
var Settings = {};

//CTRL
Settings.controller = function(){

}


Settings.view = function(ctrl){
	return (
	    <div class="twelve wide column">
	    	<div class="ui column grid">
		      <div class="column">
		        <div class="ui raised segment">
		          <h2>Settings</h2>
		          <img class="ui wireframe image" src="http://semantic-ui.com/images/wireframe/paragraph.png"/>
		        </div>
		      </div>
		    </div>
	    </div>		
	)
}


module.exports = Settings;