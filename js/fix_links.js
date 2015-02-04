// JavaScript Document
// var USRMM = "http://www.independentlivingnews.com/video/usr-video-3p.php"
// var GAB = "http://www.independentlivingnews.com/il/great-american-blackout.php"
// var DNS = "http://www.independentlivingnews.com/instant-access/digital-self-reliance-newsletter.stml"
// var PW = "http://www.independentlivingnews.com/video/pw-video.php"
// var thirtyDay ="http://www.independentlivingnews.com/video/comfort-food-reserve.php"
// var CSG = "https://www.independentlivingnews.com/video/csg-video.php"
// var gunControl = "http://www.independentlivingnews.com/poll/gun-control/poll.php"
// var LPLM = "http://www.independentlivingnews.com/video/lpl-video.php"
// var ObamaDollar = "http://www.independentlivingnews.com/il/obama-dollar-debacle.php"
// var emergencyPack = "http://www.independentlivingnews.com/video/epack2-video.php"
// var sunTrek = "http://www.independentlivingnews.com/video/suntrek/" 



$(document).ready(function() {
	$("#linkResults").hide(); //Sloppily hiding these two divs.
	$("#productLinks").hide();
	
	//Find value of X inputs and store them in an "Original" array. 
	//Do this before appending utms - you could just spit out "console.log(original[x]). 
	//Then call this if a keycode is regenerating, restoring product links to the original ones
	
		var values = {};
		$('#productForm input').each(function() {
    	values[this.name] = this.value;
		});
		console.log(values);
		
	
	//Setting up the keycode-generating menus
    $("#list").selectmenu({width:100}); 
    $("#email").selectmenu({width:175});
    $("#product").selectmenu();
	$("#submitKeycode").button();
	$("#submitlinks").button();
	
	//Establishing the datepicker
	$( "#inlinedate" ).datepicker({
		dateFormat: "ymmdd" //Outputs as YYMMDD
		});
	
  
  	$("#keycodeForm").submit(function() {
		event.preventDefault(); //Stops the page from reloading
		keycodeGeneration = [$("#inlinedate").val(),$("#list").val(),$("#email").val(),$("#product").val()]; 	
		//This array stores our Keycode values, to be used shortly.
		$("#submitKeycode").button({label: "Keycode Generated!"}); //Change button label to reflect generation
		$("#keycodeOutput").removeClass("alert-danger").addClass("alert-success").text("Generated Keycode: "+keycodeGeneration.join(""));
		$("#keycodefield").val(keycodeGeneration.join(""));
		
		var currProduct = $.trim(document.getElementById(keycodeGeneration[3]).value); 
		//This grabs the element with the Product Code. 
		//keycodeGeneration[3] = Product Selection
		//Since the form ID's are set up with links as values, we can just grab the value of a matching form
		//It's trimmed in the end just to be safe, not really necessary though
		//For example - if keycodeGeneration[3] = SUB, this grabs the value of "#SUB", which is the link to the product
		$("#ProductInput").val(currProduct); //Sets up our product link in the "#inputForm"
	});
  
  
				
	//start checking for valid input
	$("#inputForm").submit(function() {
		event.preventDefault();
		if($("#keycodefield").val() == ""){
			alert("You must enter a keycode value! That's the whole reason you're here, right?");
		} 
		else {
			if($("#link1").val() == "" && $("#ProductInput").val() == "") {
				alert("You must enter at least one link! That's pretty obvious, at least to my primitive computer brain.");
			}
			else {
			$("#linkResults").show();
			$("#productLinks").show();
			
			
			var keycode = $.trim($("#keycodefield").val()); //Establishing our keycode.
			
			//This pulls the whole UTM code together, being careful to trim the keycode of stray spaces
			var utmsource = "?utm_source="+keycode+"&keycode="+keycode+"&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]";
			// This function iterates over each Product, appending the URL with our UTM
			$("#productForm input").each(function() {
  				var currVal = $.trim($(this).val())
				$(this).val(currVal+utmsource);
			});
			
			
			//Here we split the link1 value into two parts of an array. 
			//We do this to remove any unnecessary trailing codes from ILN links. 
			//Kelly also has a tendency to copy+paste utm codes into this, so hopefully that will help.
			$("#inputForm input").each(function() {
  				var stmlCheck = $.trim($(this).val())
					if(S(stmlCheck).contains('.stml')) {
						var splitSTML = $.trim($(this).val().split('.stml')[0]);
						$(this).val(splitSTML+".stml");	
						console.log("Fixed string with stmlCheck"); //Not necessary, just for keeping track
						}
						
				var htmlCheck = $.trim($(this).val())
					if(S(htmlCheck).contains('.html')) {
						var splitHTML = $.trim($(this).val().split('.html')[0]);
						$(this).val(splitHTML+".html");	
						console.log("Fixed string with htmlCheck"); //Not necessary, just for keeping track
						}		
			});
			
			//Below, we print the first link, and then check the other inputs for value.
			//If the input has something, it is processed. Otherwise, it's left alone.
			if($("#link1").val() != "") {
				$("#Link1Results").val($("#link1").val()+utmsource);
			} 
			if($("#link2").val() != "") {
				$("#Link2Results").val($("#link2").val()+utmsource);
			} 
			if($("#link3").val() != "") {
				$("#Link3Results").val($("#link3").val()+utmsource);
			}
			if($("#link4").val() != "") {
				$("#Link4Results").val($("#link4").val()+utmsource);
			}
			if($("#link5").val() != "") {
				$("#Link5Results").val($("#link5").val()+utmsource);
			}
			if($("#ProductInput").val() != "") {
				$("#ProductOutput").val($("#ProductInput").val()+utmsource);
			}
			}
		}
		
   });
});