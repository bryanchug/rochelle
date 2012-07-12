Contents = new Meteor.Collection("contents");

function getValue( content ){
	var object = Contents.findOne({id: content});
        return object ? object.value : null;
}

function setValue( content, value ){
	value = value.replace(/\*/g, '★');
       	var object = Contents.findOne({id: content});
        if( object ){
       	        Contents.update({id: content}, {$set: {value: value}});
        }else{
             	Contents.insert({id: content, value: value});
        }
}

if (Meteor.is_client) {
	Template.content.title = function () {
		return getValue("title");
	};
	Template.content.subtitle = function() {
		return getValue("subtitle");
	};
	Template.content.events = {
		'blur input': function(e){
			var content = $(e.target).parent().attr('id');
			var value = e.target.value;
			setValue( content, value );
		}
	}
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
