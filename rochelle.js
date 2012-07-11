Contents = new Meteor.Collection("contents");

function getValue( content ){
	var object = Contents.findOne({id: content});
        return object ? object.value : null;
}

function setValue( content, value ){
       	var object = Contents.findOne({id: content});
        if( object ){
       	        Contents.update({id: content}, {$set: {value: value}});
        }else{
             	Contents.insert({id: content, value: value});
        }
}

if (Meteor.is_client) {
	Template.content.title = function () {
		var value = getValue("title");
		return value != null ? value : "Rochelle @ 18";
	};
	Template.content.subtitle = function() {
		var value = getValue("subtitle");
		return value != null ? value : "PEARLMONT INN ★ JULY 14, 2012";
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
