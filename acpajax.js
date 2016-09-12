$(document).ready(function(){

	$(".btn").click(function(){
		console.log("gadsasd")
	    $.ajax({
	    	type:"GET",
	    	dataType:"json" ,
	     	url:"/cputemp",
	     	success:function(response){
	     		console.log(response);
	     		var y = response.temperature;
	     		$("#tempdisp").html(y);
	     		$("#stat").append(response.battery.status);
	     		$("#charge").append(response.battery.charge); 
	     		$("#rate").append(response.battery.rate);
	     	}
	    });
	});
});