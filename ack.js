Contents = new Meteor.Collection("contents");

function getValue( content ){
	var object = Contents.findOne({id: content});
        return object ? object.value : "";
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

var oldText = null;

if (Meteor.is_client) {
	Template.content.text = function () {
		var text = getValue("text");
		console.log( oldText );
		console.log( text );
		console.log( oldText != text );
		if( oldText != text ){
			setTimeout(function(){
				$("textarea").hide().fadeIn();
			});
		}
		oldText = text;
		return text;
	};
	Template.content.events = {
		'blur textarea': function(e){
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
