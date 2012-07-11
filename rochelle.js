Contents = new Meteor.Collection("contents");

function getValue( content ){
	var object = Contents.findOne({id: content});
        return object ? object.value : "";
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
		return getValue("title") || "Rochelle @ 18";
	};
	Template.content.subtitle = function() {
		return getValue("subtitle") || "PEARLMONT INN ★ JULY 14, 2012";
	};
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
