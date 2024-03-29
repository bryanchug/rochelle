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


if (Meteor.is_client) {

	var _txt1old = '';

	Template.content.txt1 = function () {
		var _txt1 = getValue("txt1");
		if( _txt1old != _txt1 ){
			setTimeout(function(){
				$(".old[name=txt1]").fadeOut('slow');
				$(".new[name=txt1]").hide().fadeIn('slow');
				_txt1old = _txt1;
			});
		}
		return _txt1;
	};
	Template.content.txt1old = function(){
		return _txt1old;
	};

	var _txt2old = '';

	Template.content.txt2 = function(){
                var _txt2 = getValue("txt2");
                if( _txt2old != _txt2 ){
                        setTimeout(function(){
                                $(".old[name=txt2]").fadeOut('slow');
                                $(".new[name=txt2]").hide().fadeIn('slow');
                                _txt2old = _txt2;
                        });
                }
                return _txt2;
	};
	Template.content.txt2old = function(){
		return _txt2old;
	}

	/*
	Template.content.events = {
		'blur .new': function(e){
			var content = $(e.target).attr('name');
			var value = e.target.value;
			console.log("content: "+content);
			setValue( content, value );
		}
	};
	*/
	
	$(document).keydown(function(e){
		var ESC = 27;
		if(e.keyCode == ESC){
			$(".new").each(function(){
				var content = $(this).attr('name');
				setValue( content, $(this).val() );
			});
		}
	});
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
