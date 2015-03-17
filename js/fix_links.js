// JavaScript Document

$(document).ready(function() {
	$("#linkResults").hide(); //Sloppily hiding these two divs.
	$("#productLinks").hide();
	
	
	function stmlCheckFunc(){
		var inputVal = $.trim($(this).val());
			if(S(inputVal).contains('.stml')) {
				var splitSTML = $.trim($(this).val().split('.stml')[0]); //split the value into two parts of an array. 
				$(this).val(splitSTML+".stml");	//re-add the .stml ending
				console.log("Fixed string with stmlCheck"); //Not necessary, just for keeping track
			} else if(S(inputVal).contains('.html')) {
				var splitHTML = $.trim($(this).val().split('.html')[0]);
				$(this).val(splitHTML+".html");	
				console.log("Fixed string with htmlCheck"); //Not necessary, just for keeping track
			} else if(S(inputVal).contains('?utm_source')) {
				var splitUTM = $.trim($(this).val().split('?utm_source')[0]);
				$(this).val(splitUTM);	
				console.log("Fixed string with utmCheck"); //Not necessary, just for keeping track
				}
			
	}
	//The stmlCheckFunc scrubs links of anything extending past .html and .stml endings.
	//Additionally, it strips existing UTM codes away, which is Kelly-proof (hopefully)
		

	//Setting up the keycode-generating menus
    $("#list").selectmenu({width:200});
    $("#email").selectmenu({width:200});
    $("#product").selectmenu();
	$("#submitKeycode").button();
	$("#submitlinks").button();
	
	//Establishing the datepicker
	$( "#inlinedate" ).datepicker({
		dateFormat: "ymmdd" //Outputs as YYMMDD
		});
	
  	//This handles generating the keycode. It simply joins all of the necessary values from an array.
  	$("#keycodeForm").submit(function() { 
		event.preventDefault(); //Stops the page from reloading
		var keycodeGeneration = [$("#inlinedate").val(),$("#list").val(),$("#email").val(),$("#product").val()];
		//This array stores our Keycode values, to be used shortly.
		$("#submitKeycode").button({label: "Keycode Generated!"}); //Change button label to reflect generation
		$("#keycodeOutput").removeClass("alert-danger").addClass("alert-success").text("Generated Keycode: "+keycodeGeneration.join("")).effect("highlight", "slow");
		$("#keycodefield").val(keycodeGeneration.join(""));
		
		var currProduct = $.trim(document.getElementById(keycodeGeneration[3]).value); 
		//This grabs the element with the Product Code. 
		//keycodeGeneration[3] = Product Selection
		//Since the form ID's are set up with links as values, we can just grab the value of a matching form
		//It's trimmed in the end just to be safe, not really necessary though
		//For example - if keycodeGeneration[3] = SUB, this grabs the value of "#SUB", which is the link to the product
		$("#ProductInput").val(currProduct); //Sets up our product link in the "#inputForm"
	});
  
  
	//This function controls data validation, link scrubbing, and data transfer for the "Generate Links" button			
	$("#inputForm").submit(function() {
		event.preventDefault();
		if($("#keycodefield").val() == ""){
			alert("You must enter a keycode value! That's the whole reason you're here, right?");
		} 
		else {
			if($("#link1").val() == "" && $("#ProductInput").val() == "") {
				alert("You must enter at least one link!");
		}
			else {
			//Trim old STML, UTM, and HTML codes.	
			$("#inputForm input").each(stmlCheckFunc); //This trims #inputForm - which in turn takes care of #linkResults
			$("#productForm input").each(stmlCheckFunc); //This takes care of the product links, which previously were being stacked with multiple utm codes.
			
			
			var keycode = $.trim($("#keycodefield").val()); //Establishing our keycode.
			var utmsource = "?utm_source="+keycode+"&keycode="+keycode+"&u=[EMV FIELD]EMAIL_UUID[EMV /FIELD]"; 	
			//This pulls the whole UTM code together, being careful to trim the keycode of stray spaces
			
			// This function iterates over each Product, appending the URL with our UTM
			$("#productForm input").each(function() {
  				var currVal = $.trim($(this).val());	
				$(this).val(currVal+utmsource);
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
			
			$("#linkResults").show("drop"); //Show our results.
			$("#productLinks").show("drop");
			
			}
		}
		
   });
});