/*
-----------------------------------------------
Design Illusions - Common Script
Created: 26-Aug-2014
Author:  Velmurugan
Copyright 2013 - www.designillusions.in
All rights reserved

  #####    ######  ####  ######  ####    ##      ##     ###### ##     ##     ##   ##  ####  ######  ####  ##      ##  ####
  ##   ##  ##     ##       ##   ##       ## ##   ##       ##   ##     ##     ##   ## ##       ##   ##  ## ## ##   ## ##
  ##    ## ####   ######   ##   ##  ###  ##  ##  ##       ##   ##     ##     ##   ## ######   ##   ##  ## ##  ##  ## ######
  ##   ##  ##         ##   ##   ##    ## ##   ## ##       ##   ##     ##     ##   ##     ##   ##   ##  ## ##   ## ##     ##
  ####     ######  ####  ######   ####   ##      ##     ###### ###### ######  #####   ####  ######  ####  ##      ##  ####


----------------------------------------------- */

$(document).ready(function(){
    
        $('.trip_estimate span').css({'font-weight': 'bold'});

        //for target blank
	$(".target_blank").on("click", function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		window.open(url, '_blank');
	});

	$('.slick_slider_home').slick({
	 	dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: 6000,
  		arrows: true, 
  		adaptiveHeight: false,
  		nextArrow: ".home_slider .arrows .next",
  		prevArrow: ".home_slider .arrows .prev",
	});


	$('.footer_top .testimonial .slider_image').slick({
	 	dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: 2000,
  		arrows: true, 
  		adaptiveHeight: false,
  		nextArrow: ".footer_top .testimonial .arrows .next",
  		prevArrow: ".footer_top .testimonial .arrows .prev",
  		asNavFor: '.footer_top .testimonial .slider_text'
	});

	$('.footer_top .testimonial .slider_text').slick({
	 	dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: 2000,
  		arrows: false, 
  		adaptiveHeight: false,
  		asNavFor: '.footer_top .testimonial .slider_image'
	});

	$(".booking_form .btn_select_taxi").on("click", function(){
                    var dte = new Date();
                    var day = dte.getDate();
                    var monthIndex = dte.getMonth()+1;
                    var year = dte.getFullYear();
                    var hrs = dte.getHours();
                    var mins = dte.getMinutes();
                    if(mins<10){mins = '0'+mins;}
                    //alert(year+"-"+monthIndex+"-"+day+"T"+hrs+":"+mins);
                    var curDT = year+"-"+monthIndex+"-"+day+"T"+hrs+":"+mins;
                    var dtj = $("#txtPickupDate").val();
                    dtj = dtj.toString();
                    var dtjday = dtj.substring(0,2);
                    var dtjmonth = dtj.substring(3,5);
                    var dtjyear = dtj.substring(6,10);
                    //alert(dtjyear+"-"+dtjmonth+"-"+dtjday+"T"+$("#selectPickupTime").val());
                    var bkDT = dtjyear+"-"+dtjmonth+"-"+dtjday+"T"+$("#selectPickupTime").val();
                    
                    var d = new Date(curDT);
                    var d2 = new Date(bkDT);
                    var t= d.getTime();
                    var t2= d2.getTime();
                    var timediff = (t2-t)/60000;
                    
                if((dtj=="08/07/2018" || dtj=="09/07/2018" || dtj == "10/07/2018") && 
                        ($("#selectDropArea").val() == "Vellore" || $(".booking_form .drop_area .custom-combobox-input").val() == "Vellore")
                        ){
                    alert("Due to very heavy one way traffic for Chennai to Vellore sector, Sedan AC will be charged Rs. 2400/- incl of all.");
                }
                    
		if($("#trip_mode").val() != "3" && ($("#selectPickupArea").val() == "" || $(".booking_form .pickup_area .custom-combobox-input").val() == "")){
			showModalError("Please select Pickup City");
                }else if($("#trip_mode").val() != "3" && ($("#selectDropArea").val() == "" || $(".booking_form .drop_area .custom-combobox-input").val() == "")){
			showModalError("Please select Drop City");
                }else if($("#trip_mode").val() != "3" && ($("#selectDropArea").val() == $("#selectPickupArea").val())){
			showModalError("Pickup City and Drop City should NOT be same!");
                }else if($("#trip_mode").val() == "3"  && ($("#selectPackage").val() == "" || $(".booking_form .package_area .custom-combobox-input").val() == ""))
			showModalError("Please sleect Package Type!");
                else if($("#txtPickupDate").val() == "")
			showModalError("Please select Pickup Date");
		else if($("#selectPickupTime").val() == "" || $(".booking_form .pickup_time .custom-combobox-input").val() == "")
			showModalError("Please select Pickup Time");
		else if($("#trip_mode").val() == "2"  && ($("#selectNoOfDays").val() == "" || $(".booking_form .no_of_days .custom-combobox-input").val() == ""))
			showModalError("Please sleect No of Days");
                else if((timediff<90) && (timediff>=0))
			showModalError("Unable to take online booking at such a short notice. Contact our Customer Care Executive!");
                else if((timediff<0))
			showModalError("Invalid Time. Select a time that is greater than current time!");
                else {
			$(".booking .booking_form").hide("slow");
			//$(".booking .choose_your_taxi").show("slow");
			$(".booking .steps .step.taxi").addClass("active").siblings().removeClass("active");
			//$(".booking .choose_your_taxi table tr:first-child td:first-child input").prop("checked", true);
                        /* added by elango */
                
                        if($("#trip_mode").val()==1){
                            if((dtj=="08/07/2018" || dtj=="09/07/2018" || dtj == "10/07/2018") && 
                                    (($("#selectPickupArea").val() == "Chennai" || $(".booking_form .pickup_area .custom-combobox-input").val() == "Chennai") && 
                                    (($("#selectDropArea").val() == "Vellore" || $(".booking_form .drop_area .custom-combobox-input").val() == "Vellore")))
                                    ){
                                $(".booking .choose_your_taxi_hike").show("slow");
                                $(".booking .choose_your_taxi_hike table tr:first-child td:first-child input").prop("checked", true);
                            }else{
                                $(".booking .choose_your_taxi").show("slow");
                                $(".booking .choose_your_taxi table tr:first-child td:first-child input").prop("checked", true);
                            }
                        } else if ($("#trip_mode").val()==2){
                            $(".booking .choose_your_taxi_rt").show("slow");
                            $(".booking .choose_your_taxi_rt table tr:first-child td:first-child input").prop("checked", true);
                        } else {
                            if($("#selectPackage").val()=="HD9006"){
                            $(".booking .choose_your_taxi_pkg9006").show("slow");
                            $(".booking .choose_your_taxi_pkg9006 table tr:first-child td:first-child input").prop("checked", true);
                            }
                            if($("#selectPackage").val()=="FD18010"){
                            $(".booking .choose_your_taxi_pkg18010").show("slow");
                            $(".booking .choose_your_taxi_pkg18010 table tr:first-child td:first-child input").prop("checked", true);
                            }
                            if($("#selectPackage").val()=="SAS4560"){
                            $(".booking .choose_your_taxi_pkgSAS4560").show("slow");
                            $(".booking .choose_your_taxi_pkgSAS4560 table tr:first-child td:first-child input").prop("checked", true);
                            }
                        }
		}
	});
	
        function GetEstimate(RatePerKM,TripType,NoOfDays){
            var $estimate = [];
            $.ajax({
                type: "POST",
                data: {
                    fcity: $("#selectPickupArea").val(),
                    tcity: $("#selectDropArea").val(),
                    dcode: $("#disccode").val(),
                    rpkm: RatePerKM,
                    triptype: TripType,
                    noofdays: NoOfDays,
                    ajax:false
                },
                url: "process/p_getestimate.php",
                dataType:"json",
                success: function(data)
                {
                    $estimate = data;
                    //console.log($estimate);
                    //alert($estimate['estimate']);
                    //$(".booking .booking_form .booking_summary #distance").val($distval);
                 },
                 complete: function (data) {
                     if($estimate['estimate'] == 0){
                         $(".booking .booking_summary .estamount").html("Contact Customer Care for Estimate! ");
                     } else {
                        $(".booking .booking_summary .estamount").html("Rs. "+$estimate['estimate']); 
                        if($estimate['ishardroute'] == 1){
                        $(".booking .booking_summary .estterms").append("<br><strong>This is a hard route to serve. Hence rate is increased by Rs.3/km.</strong>");
                        $(".info_car_rate").html("Rs. "+(parseFloat(RatePerKM)+3)+"/km.");
                        }
                    }
                 }
            }); 
        }
    
	//on clikcing proceed to summary
	$(".booking .choose_your_taxi .btn_proceed_confirm_booking").on("click",function(){
		$(".booking .choose_your_taxi").hide("slow");
                $(".booking .choose_your_taxi_hike").hide("slow");
                $(".booking .choose_your_taxi_rt").hide("slow");
                $(".booking .choose_your_taxi_pkg9006").hide("slow");
                $(".booking .choose_your_taxi_pkg18010").hide("slow");
                $(".booking .choose_your_taxi_pkgSAS4560").hide("slow");
		$(".booking .booking_summary").show("slow");
		$(".booking .steps .step.confirm").addClass("active").siblings().removeClass("active");

		//updating info
                if($("#trip_mode").val() == 1 || $("#trip_mode").val() == 2){
                    $(".info_from_city").html($("#selectPickupArea").val() + " to ");
                    $(".info_to_city").html($("#selectDropArea").val());
                    $(".info_package").hide("fast");
                    $(".info_from_city").show("fast");
                    $(".info_to_city").show("fast");
                }  
		if($("#trip_mode").val() == 1)
			$(".info_trip_mode").html("One Way");
		else if($("#trip_mode").val() == 2)
			$(".info_trip_mode").html("Round Trip");
                else {
                        $(".info_trip_mode").html("Package Trip");
                    }
		$(".info_journey_date").html($("#txtPickupDate").val());
		$(".info_journey_time").html($("#selectPickupTime").val());
		$(".info_no_of_days").html($("#selectNoOfDays").val());
		if($("#trip_mode").val() == 1 || $("#trip_mode").val() == 3)
			$(".info_row_no_of_days").hide();
		else 
			$(".info_row_no_of_days").show();
		
		//finding car
                if($("#trip_mode").val()==1){
                    car_type = $(".booking .choose_your_taxi table input[type=radio]:checked").val();
                    vehicle_type = $('.vtype_'+car_type).val();
                    if(car_type == '558784c79fb9c'){
                        alert("Hatchbacks will be alloted only if they are available!");
                    }
                    rateperkm = $('.rpkm_'+car_type).val();
                } else {
                    car_type_rt = $(".booking .choose_your_taxi_rt table input[type=radio]:checked").val();
                    vehicle_type = $('.vtype_'+car_type_rt).val();
                    if(car_type_rt == '558784c79fb9c'){
                        alert("Hatchbacks will be alloted only if they are available!");
                    }
                    rateperkm = $('.rpkm_'+car_type_rt).val();
                }
                  
                $(".dpaddr").show("slow");
                
                $(".dplabel").html("Drop Point Address");

                $(".info_car_type").html(vehicle_type);
                $(".info_car_rate").html("Rs. "+rateperkm+"/km.");
                GetEstimate(rateperkm,$("#trip_mode").val(),1);
                
                
                //distance = $(".booking .booking_form .booking_summary #distance").val();
                //alert("After ajax:"+distance);
                //$(".booking .booking_summary .estamount").html("Rs. "+eval(rateperkm*distance));

	});
        
        //on clikcing proceed to summary Hike rate
	$(".booking .choose_your_taxi_hike .btn_proceed_confirm_booking").on("click",function(){
		$(".booking .choose_your_taxi").hide("slow");
                $(".booking .choose_your_taxi_hike").hide("slow");
                $(".booking .choose_your_taxi_rt").hide("slow");
                $(".booking .choose_your_taxi_pkg9006").hide("slow");
                $(".booking .choose_your_taxi_pkg18010").hide("slow");
                $(".booking .choose_your_taxi_pkgSAS4560").hide("slow");
		$(".booking .booking_summary").show("slow");
		$(".booking .steps .step.confirm").addClass("active").siblings().removeClass("active");

		//updating info
                if($("#trip_mode").val() == 1 || $("#trip_mode").val() == 2){
                    $(".info_from_city").html($("#selectPickupArea").val() + " to ");
                    $(".info_to_city").html($("#selectDropArea").val());
                    $(".info_package").hide("fast");
                    $(".info_from_city").show("fast");
                    $(".info_to_city").show("fast");
                }  
		if($("#trip_mode").val() == 1)
			$(".info_trip_mode").html("One Way");
		else if($("#trip_mode").val() == 2)
			$(".info_trip_mode").html("Round Trip");
                else {
                        $(".info_trip_mode").html("Package Trip");
                    }
		$(".info_journey_date").html($("#txtPickupDate").val());
		$(".info_journey_time").html($("#selectPickupTime").val());
		$(".info_no_of_days").html($("#selectNoOfDays").val());
		if($("#trip_mode").val() == 1)
			$(".info_row_no_of_days").hide();
		else 
			$(".info_row_no_of_days").show();
		
		//finding car
                if($("#trip_mode").val()==1){
		car_type = $(".booking .choose_your_taxi_hike table input[type=radio]:checked").val();
                vehicle_type = $('.vtype_'+car_type).val();
                if(car_type == '558784c79fb9c'){
                        alert("Hatchbacks will be alloted only if they are available!");
                    }
                rateperkm = $('.rpkm_'+car_type).val();
                ratehike = $('.rate_'+car_type).val();
            } else {
                car_type_rt = $(".booking .choose_your_taxi_hike table input[type=radio]:checked").val();
                vehicle_type = $('.vtype_'+car_type_rt).val();
                if(car_type_rt == '558784c79fb9c'){
                        alert("Hatchbacks will be alloted only if they are available!");
                    }
                rateperkm = $('.rpkm_'+car_type_rt).val();
            }
                  
                $(".dpaddr").show("slow");
                
                $(".dplabel").html("Drop Point Address");
                $("#custDropPoint").attr("placeholder", "Drop Point Address");

                $(".info_car_type").html(vehicle_type);
                $(".info_car_rate").html("Rs. "+ratehike+".");
                //GetEstimate(rateperkm,$("#trip_mode").val(),1);
                $(".booking .booking_summary .estamount").html("Rs. "+ratehike+" (all incl.)");
                $(".booking .booking_summary .estterms").html("This estimate is inclusive of GST.");
                //distance = $(".booking .booking_form .booking_summary #distance").val();
                //alert("After ajax:"+distance);
                //$(".booking .booking_summary .estamount").html("Rs. "+eval(rateperkm*distance));

	});
        
        //on clikcing proceed to summary Round Trip
	$(".booking .choose_your_taxi_rt .btn_proceed_confirm_booking").on("click",function(){
		$(".booking .choose_your_taxi").hide("slow");
                $(".booking .choose_your_taxi_hike").hide("slow");
                $(".booking .choose_your_taxi_rt").hide("slow");
                $(".booking .choose_your_taxi_pkg9006").hide("slow");
                $(".booking .choose_your_taxi_pkg18010").hide("slow");
                $(".booking .choose_your_taxi_pkgSAS4560").hide("slow");
		$(".booking .booking_summary").show("slow");
		$(".booking .steps .step.confirm").addClass("active").siblings().removeClass("active");

		//updating info
		$(".info_from_city").html($("#selectPickupArea").val());
		$(".info_to_city").html($("#selectDropArea").val());
                $(".info_package").hide("fast");
		if($("#trip_mode").val() == 1)
			$(".info_trip_mode").html("One Way");
		else
			$(".info_trip_mode").html("Round Trip");
		$(".info_journey_date").html($("#txtPickupDate").val());
		$(".info_journey_time").html($("#selectPickupTime").val());
		$(".info_no_of_days").html($("#selectNoOfDays").val());
		if($("#trip_mode").val() == 1)
			$(".info_row_no_of_days").hide();
		else 
			$(".info_row_no_of_days").show();
		
		//finding car
                if($("#trip_mode").val()==1){
                    car_type = $(".booking .choose_your_taxi table input[type=radio]:checked").val();
                    vehicle_type = $('.vtype_'+car_type).val();
                    if(car_type == '558784c79fb9c'){
                        alert("Hatchbacks will be alloted only if they are available!");
                    }
                    rateperkm = $('.rpkm_'+car_type).val();
                } else {
                    car_type_rt = $(".booking .choose_your_taxi_rt table input[type=radio]:checked").val();
                    vehicle_type = $('.rt_vtype_'+car_type_rt).val();
                    if(car_type_rt == '558784c79fb9c'){
                        alert("Hatchbacks will be alloted only if they are available!");
                    }
                    rateperkm = $('.rt_rpkm_'+car_type_rt).val();
                }
                $(".dpaddr").hide("slow");
                $(".info_car_type").html(vehicle_type);
                $(".info_car_rate").html("Rs. "+rateperkm+"/km.");
                GetEstimate(rateperkm,$("#trip_mode").val(),$("#selectNoOfDays").val());

	});

        $(".booking .choose_your_taxi_pkg9006 .btn_proceed_confirm_booking").on("click",function(){
		$(".booking .choose_your_taxi").hide("slow");
                $(".booking .choose_your_taxi_hike").hide("slow");
                $(".booking .choose_your_taxi_rt").hide("slow");
                $(".booking .choose_your_taxi_pkg9006").hide("slow");
                $(".booking .choose_your_taxi_pkg18010").hide("slow");
                $(".booking .choose_your_taxi_pkgSAS4560").hide("slow");
		$(".booking .booking_summary").show("slow");
		$(".booking .steps .step.confirm").addClass("active").siblings().removeClass("active");

		//updating info
                $(".info_to_city").hide("fast");
                $(".info_package").show("fast");
                $(".info_package").html("90 kms / 6 hrs");
                $(".info_from_city").html($("#selectPickupArea").val());
                
                $(".info_trip_mode").html("Package Trip");
		$(".info_journey_date").html($("#txtPickupDate").val());
		$(".info_journey_time").html($("#selectPickupTime").val());
		$(".info_no_of_days").html($("#selectNoOfDays").val());
		if($("#trip_mode").val() == 1 || $("#trip_mode").val() == 3)
			$(".info_row_no_of_days").hide();
		else 
			$(".info_row_no_of_days").show();
		
		//finding car
                car_type_pkg = $(".booking .choose_your_taxi_pkg9006 table input[type=radio]:checked").val();
                
                vehicle_type = $('.booking .choose_your_taxi_pkg9006 .pkg_vtype_'+car_type_pkg).val();
                pkgrate = $('.booking .choose_your_taxi_pkg9006 .pkg_rate_'+car_type_pkg).val();

                $(".dpaddr").show("slow");
                $(".dplabel").html("Visiting Places / Towns");
                $("#custDropPoint").attr("placeholder", "Visiting Places / Towns");

                $(".info_car_type").html(vehicle_type);
                $(".info_car_rate").html("Rs. "+pkgrate);
                $(".booking .booking_summary .estamount").html("Rs. "+pkgrate);
	});
        
        $(".booking .choose_your_taxi_pkg18010 .btn_proceed_confirm_booking").on("click",function(){
		$(".booking .choose_your_taxi").hide("slow");
                $(".booking .choose_your_taxi_hike").hide("slow");
                $(".booking .choose_your_taxi_rt").hide("slow");
                $(".booking .choose_your_taxi_pkg9006").hide("slow");
                $(".booking .choose_your_taxi_pkg18010").hide("slow");
                $(".booking .choose_your_taxi_pkgSAS4560").hide("slow");
		$(".booking .booking_summary").show("slow");
		$(".booking .steps .step.confirm").addClass("active").siblings().removeClass("active");

		//updating info
                $(".info_to_city").hide("fast");
                $(".info_package").show("fast");
                $(".info_package").html("180 kms / 10 hrs");
                $(".info_from_city").html($("#selectPickupArea").val());
                
                $(".info_trip_mode").html("Package Trip");
		$(".info_journey_date").html($("#txtPickupDate").val());
		$(".info_journey_time").html($("#selectPickupTime").val());
		$(".info_no_of_days").html($("#selectNoOfDays").val());
		$(".info_row_no_of_days").hide();
                
                //finding car
                car_type_pkg = $(".booking .choose_your_taxi_pkg18010 table input[type=radio]:checked").val();
                //alert(car_type_pkg);
                vehicle_type = $('.booking .choose_your_taxi_pkg18010 .pkg_vtype_'+car_type_pkg).val();
                //alert(vehicle_type);
                pkgrate = $('.booking .choose_your_taxi_pkg18010 .pkg_rate_'+car_type_pkg).val();
                //alert(pkgrate);

                $(".dpaddr").show("slow");
                $(".dplabel").html("Visiting Places / Towns");
                $("#custDropPoint").attr("placeholder", "Visiting Places / Towns");

                $(".info_car_type").html(vehicle_type);
                $(".info_car_rate").html("Rs. "+pkgrate);
                $(".booking .booking_summary .estamount").html("Rs. "+pkgrate);
	});
        
        $(".booking .choose_your_taxi_pkgSAS4560 .btn_proceed_confirm_booking").on("click",function(){
		$(".booking .choose_your_taxi").hide("slow");
                $(".booking .choose_your_taxi_hike").hide("slow");
                $(".booking .choose_your_taxi_rt").hide("slow");
                $(".booking .choose_your_taxi_pkg9006").hide("slow");
                $(".booking .choose_your_taxi_pkg18010").hide("slow");
                $(".booking .choose_your_taxi_pkgSAS4560").hide("slow");
		$(".booking .booking_summary").show("slow");
		$(".booking .steps .step.confirm").addClass("active").siblings().removeClass("active");

		//updating info
                $(".info_to_city").hide("fast");
                $(".info_package").show("fast");
                $(".info_package").html("45 kms / 1 hr");
                $(".info_from_city").html("Sastra University");
                
                $(".info_trip_mode").html("Package Trip");
		$(".info_journey_date").html($("#txtPickupDate").val());
		$(".info_journey_time").html($("#selectPickupTime").val());
		$(".info_no_of_days").html($("#selectNoOfDays").val());
		$(".info_row_no_of_days").hide();
                
                //finding car
                car_type_pkg = $(".booking .choose_your_taxi_pkgSAS4560 table input[type=radio]:checked").val();
                //alert(car_type_pkg);
                vehicle_type = $('.booking .choose_your_taxi_pkgSAS4560 .pkg_vtype_'+car_type_pkg).val();
                //alert(vehicle_type);
                pkgrate = $('.booking .choose_your_taxi_pkgSAS4560 .pkg_rate_'+car_type_pkg).val();
                //alert(pkgrate);

                $(".dpaddr").show("slow");
                $(".dplabel").html("Visiting Places / Towns");
                $("#custDropPoint").attr("placeholder", "Visiting Places / Towns");

                $(".info_car_type").html(vehicle_type);
                $(".info_car_rate").html("Rs. "+pkgrate);
                $(".booking .booking_summary .estamount").html("Rs. "+pkgrate);
	});

	$(".booking .choose_your_taxi table td").on("click", function(){
		$(".booking .choose_your_taxi table tr").removeClass("active")
		$(this).parent("tr").addClass("active")
		$(this).parent("tr").children("td:first-child").children("input").prop("checked", true)
	});
        
        $(".booking .choose_your_taxi_hike table td").on("click", function(){
		$(".booking .choose_your_taxi_hike table tr").removeClass("active")
		$(this).parent("tr").addClass("active")
		$(this).parent("tr").children("td:first-child").children("input").prop("checked", true)
	});
        
        $(".booking .choose_your_taxi_rt table td").on("click", function(){
		$(".booking .choose_your_taxi_rt table tr").removeClass("active")
		$(this).parent("tr").addClass("active")
		$(this).parent("tr").children("td:first-child").children("input").prop("checked", true)
	});
        
        $(".booking .choose_your_taxi_pkg9006 table td").on("click", function(){
		$(".booking .choose_your_taxi_pkg9006 table tr").removeClass("active")
		$(this).parent("tr").addClass("active")
		$(this).parent("tr").children("td:first-child").children("input").prop("checked", true)
	});
        
        $(".booking .choose_your_taxi_pkg18010 table td").on("click", function(){
		$(".booking .choose_your_taxi_pkg18010 table tr").removeClass("active")
		$(this).parent("tr").addClass("active")
		$(this).parent("tr").children("td:first-child").children("input").prop("checked", true)
	});
        
        $(".booking .choose_your_taxi_pkgSAS4560 table td").on("click", function(){
		$(".booking .choose_your_taxi_pkgSAS4560 table tr").removeClass("active")
		$(this).parent("tr").addClass("active")
		$(this).parent("tr").children("td:first-child").children("input").prop("checked", true)
	});

	//back button on choose taxi stage
	$(".booking .choose_your_taxi button.back").on("click", function(){
		$(".booking .choose_your_taxi").hide("slow");
		$(".booking .booking_form").show("slow");
		$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
	});
        
        //back button on choose taxi hike stage
	$(".booking .choose_your_taxi_hike button.back").on("click", function(){
		$(".booking .choose_your_taxi_hike").hide("slow");
		$(".booking .booking_form").show("slow");
		$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
	});
        
        //back button on choose taxi RT stage
	$(".booking .choose_your_taxi_rt button.back").on("click", function(){
		$(".booking .choose_your_taxi_rt").hide("slow");
		$(".booking .booking_form").show("slow");
		$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
	});
        
        //back button on choose taxi pkg10006 stage
	$(".booking .choose_your_taxi_pkg9006 button.back").on("click", function(){
		$(".booking .choose_your_taxi_pkg9006").hide("slow");
		$(".booking .booking_form").show("slow");
		$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
	});
        
        //back button on choose taxi pkg18010 stage
	$(".booking .choose_your_taxi_pkg18010 button.back").on("click", function(){
		$(".booking .choose_your_taxi_pkg18010").hide("slow");
		$(".booking .booking_form").show("slow");
		$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
	});
        
        //back button on choose taxi pkgSAS4560 stage
	$(".booking .choose_your_taxi_pkgSAS4560 button.back").on("click", function(){
		$(".booking .choose_your_taxi_pkgSAS4560").hide("slow");
		$(".booking .booking_form").show("slow");
		$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
	});

	//back button on confirm booking
	$(".booking .booking_summary button.back").on("click", function(){
		$(".booking .booking_summary").hide("slow");
                if($("#trip_mode").val()==1){
                    $(".booking .choose_your_taxi").show("slow");
                } else if($("#trip_mode").val()==2){
                    $(".booking .choose_your_taxi_rt").show("slow");
                } else {
                    if($("#selectPackage").val()=="HD9006")
                        $(".booking .choose_your_taxi_pkg9006").show("slow");
                    else if($("#selectPackage").val()=="FD18010")
                        $(".booking .choose_your_taxi_pkg18010").show("slow");
                    else 
                        $(".booking .choose_your_taxi_pkgSAS4560").show("slow");
                }
		$(".booking .steps .step.taxi").addClass("active").siblings().removeClass("active");
	});

	//close modal window
	$(".modal_window .btn_close, .modal_window .btn_accept").on("click", function() {
		$(".modalBG, .modal_window").hide("fast");
	});
        
        $( "#optquestions" ).on( "change", "#howknow", function() {
            if($("#howknow").val()=='9'){
                $("#hktext").show();
            } else {
                $("#hktext").hide();
            }
        });

	$(".booking .booking_summary .btn_make_payment").on("click", function(){
                var typo = true; 
                var firstdigit = $("#custMobile").val().slice(0,1);
                
                if($("#custName").val() == "") {
			$("#errName").show();	
			typo = false;
		} else {$("#errName").hide();}
                
                if($("#custEmailId").val() == "") {
			$("#errEmail").show();	
			typo = false;
		} else {$("#errEmail").hide();}
                
                if($("#custMobile").val() == "" || $("#custMobile").val().length != 10) {
			$("#errMobile").show();	
			typo = false;
		} else {$("#errMobile").hide();}
                
                if(firstdigit == 6 || firstdigit == 7 || firstdigit == 8 || firstdigit == 9) {
			$(".booking_summary .error.firstnotok").hide();	
		} else {
                    $(".booking_summary .error.firstnotok").show();
                    typo = false;
                }
               
                if(firstdigit == 0) {
			$(".booking_summary .error.firstzero").show();	
			typo = false;
		} else $(".booking_summary .error.firstzero").hide();
                
                if($("#custPickupPoint").val() == "") {
			$("#errPickupPoint").show();	
			typo = false;
		} else {$("#errPickupPoint").hide();}
                
                if($("#custDropPoint").val() == "") {
			$("#errDropPoint").show();	
			typo = false;
		} else {$("#errDropPoint").hide();}
                
                if($("#howknow").val() == "") {
			alert("Please select an option for 'How do you know Droptaxi'!");	
			typo = false;
		} else {}
                
                if(typo){
                    if($(".booking .booking_summary .check_i_accept").prop("checked")) {
                            if(confirm("DropTrip - Minimum 100 km or actual distance travelled whichever is higher. RoundTrip - Per day minimum 250 km or actual distance travelled whichever is higher.")) {
                                $("#main_booking_form").submit();
                            }
                     } else {
                            showModalError("Please accept the Terms &amp; Conditions");
                     }
                }
	});

	//one-way or two-way click
	$(".tab_head a").on("click", function() {
		if($(this).hasClass("one_way")) {
			$(".tab_head a.one_way").addClass("active");
			$(".tab_head a.two_way").removeClass("active");
                        $(".tab_head a.package").removeClass("active");
                        $(".booking .booking_form .field.pickup_area").show("fast");
                        $(".booking .booking_form .field.drop_area").show("fast");
                        $(".booking .booking_form .field.package_area").hide("fast");
			$(".booking .booking_form .field.no_of_days").hide("fast");
			$(".booking .booking_form").show();
			$(".booking .choose_your_taxi, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_rt, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkg9006, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkg18010, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkgSAS4560, .booking .booking_summary").hide();
			$("#trip_mode").val(1);
			$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
		}
		else if($(this).hasClass("two_way")) {
			$(".tab_head a.two_way").addClass("active");
			$(".tab_head a.one_way").removeClass("active");
                        $(".tab_head a.package").removeClass("active");
			$(".booking .booking_form .field.no_of_days").show("fast");
                        $(".booking .booking_form .field.pickup_area").show("fast");
                        $(".booking .booking_form .field.drop_area").show("fast");
                        $(".booking .booking_form .field.package_area").hide("fast");
			$(".booking .booking_form").show();
			$(".booking .choose_your_taxi, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_rt, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkg9006, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkg18010, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkgSAS4560, .booking .booking_summary").hide();
			$("#trip_mode").val(2);
			$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
		}
                else if($(this).hasClass("package")) {
                        $(".tab_head a.package").addClass("active");
			$(".tab_head a.two_way").removeClass("active");
			$(".tab_head a.one_way").removeClass("active");
                        $(".booking .booking_form .field.drop_area").hide("fast");
                        $(".booking .booking_form .field.package_area").show("fast");
			$(".booking .booking_form .field.no_of_days").hide("fast");
			$(".booking .booking_form").show();
			$(".booking .choose_your_taxi, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_rt, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkg9006, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkg18010, .booking .booking_summary").hide();
                        $(".booking .choose_your_taxi_pkgSAS4560, .booking .booking_summary").hide();
			$("#trip_mode").val(3);
			$(".booking .steps .step.location").addClass("active").siblings().removeClass("active");
		}
	});

	//login form validation 
	$(".login_form .btns .submit").on("click",function(){
                       
		var typo = true; 
		$(".login_form .error.post_submit").hide();
		if($(".login_form .field.user input").val() == "") {
			$(".login_form .field.user .error").show();	
			typo = false;
		}
		else $(".login_form .field.user .error").hide();	

		if($(".login_form .field.password input").val() == "") {
			$(".login_form .field.password .error").show();	
			typo = false;
		}
		else $(".login_form .field.password .error").hide();
                
		if(typo) {
                        /*
			if($(".login_form .field.password input").val() == "12345") {

				$(".login_form .error.post_submit").html("Login Successfull").addClass("success").show();
				$(".login_form .field.user input").val("");
				$(".login_form .field.password input").val("");
			}
			else {
				$(".login_form .error.post_submit").html("Invalid Email / Password, Please check your credentials...").removeClass("success").show();
			}
                        */
                       $("#login_form").submit();
		}
	});
        
        var login_err = qs('login_err');
        if(login_err){
            $("body").addClass("fullscreen");
	    $(".popups .block_bg").fadeIn("slow");
	    $(".popups .popup_window").fadeIn("slow");
	    $(".popups .popup_window .box.login").fadeIn("slow");
            $(".login_form .error.post_submit").html("Invalid Email / Password, Please check your credentials...").show();
        }


	//Register form validation 
	
        $(".register_form .btns .submit").on("click",function(){
            
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                var valid_email = re.test($(".register_form .field.email input").val());
		var typo = true; 
		$(".register_form .error").hide();
		
                if($(".register_form .field.user input").val() == "") {
			$(".register_form .field.user .error.empty").show();	
			typo = false;
		}
                
		if($(".register_form .field.email input").val() == "") {
			$(".register_form .field.email .error.empty").show();	
			typo = false;
		}
		else if(!valid_email) {
			$(".register_form .field.email .error.invalid").show();	
			typo = false;
		}
		
		if($(".register_form .field.main_mobile input").val() == "") {
			$(".register_form .field.main_mobile .error").show();	
			typo = false;
		}

		if($(".register_form .field.add_line input").val() == "") {
			$(".register_form .field.add_line .error").show();	
			typo = false;
		}

		if($(".register_form .field.area input").val() == "") {
			$(".register_form .field.area .error").show();	
			typo = false;
		}

		if($(".register_form .field.city input").val() == "") {
			$(".register_form .field.city .error").show();	
			typo = false;
		}

		if($(".register_form .field.pin input").val() == "") {
			$(".register_form .field.pin .error").show();	
			typo = false;
		}

		if($(".register_form .field.password input").val() == "") {
			$(".register_form .field.password .error").show();	
			typo = false;
		}

		if($(".register_form .field.confirm_password input").val() == "") {
			$(".register_form .field.confirm_password .error.empty").show();	
			typo = false;
		}
		else if($(".register_form .field.confirm_password input").val() != $(".register_form .field.password input").val()) {
			$(".register_form .field.confirm_password .error.mismatch").show();	
			typo = false;
		}

		if(!$(".register_form .field.i_accept input").is(":checked")) {
			$(".register_form .field.i_accept .error").show();	
			typo = false;
		}

		
		if(typo) {
                    /*
			//Ajax call to submit data

			//display success message
			$(".register_form .error.post_submit").addClass("success").show();

			//resetting all fields
			$(".register_form .field.email input").val("");
			$(".register_form .field.mobile input").val("");
			$(".register_form .field.add_line input").val("");
			$(".register_form .field.area input").val("");
			$(".register_form .field.city input").val("");
			$(".register_form .field.pin input").val("");
			$(".register_form .field.password input").val("");
			$(".register_form .field.confirm_password input").val("");
			$(".register_form .field.i_accept input").prop("checked", false);
                    */
                   $("#SignupForm").submit();
		}
	});


//Distributer form validation 
	$(".distributer_form .btns .submit").on("click",function(){

		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                var valid_email = re.test($(".distributer_form .field.email input").val());
		var typo = true; 
		$(".distributer_form .error").hide();
		
		if($(".distributer_form .field.email input").val() == "") {
			$(".distributer_form .field.email .error.empty").show();	
			typo = false;
		}
		else if(!valid_email) {
			$(".distributer_form .field.email .error.invalid").show();	
			typo = false;
		}
		
		if($(".distributer_form .field.main_mobile input").val() == "") {
			$(".distributer_form .field.main_mobile .error").show();	
			typo = false;
		}

		if($(".distributer_form .field.add_line input").val() == "") {
			$(".distributer_form .field.add_line .error").show();	
			typo = false;
		}

		if($(".distributer_form .field.area input").val() == "") {
			$(".distributer_form .field.area .error").show();	
			typo = false;
		}

		if($(".distributer_form .field.city input").val() == "") {
			$(".distributer_form .field.city .error").show();	
			typo = false;
		}

		if($(".distributer_form .field.pin input").val() == "") {
			$(".distributer_form .field.pin .error").show();	
			typo = false;
		}

		if($(".distributer_form .field.password input").val() == "") {
			$(".distributer_form .field.password .error").show();	
			typo = false;
		}

		if($(".distributer_form .field.confirm_password input").val() == "") {
			$(".distributer_form .field.confirm_password .error.empty").show();	
			typo = false;
		}
		else if($(".distributer_form .field.confirm_password input").val() != $(".distributer_form .field.password input").val()) {
			$(".distributer_form .field.confirm_password .error.mismatch").show();	
			typo = false;
		}

		if(!$(".distributer_form .field.i_accept input").is(":checked")) {
			$(".distributer_form .field.i_accept .error").show();	
			typo = false;
		}

		
		if(typo) {

			//Ajax call to submit data

			//display success message
			$(".distributer_form .error.post_submit").addClass("success").show();

			//resetting all fields
			$(".distributer_form .field.email input").val("");
			$(".distributer_form .field.mobile input").val("");
			$(".distributer_form .field.add_line input").val("");
			$(".distributer_form .field.area input").val("");
			$(".distributer_form .field.city input").val("");
			$(".distributer_form .field.pin input").val("");
			$(".distributer_form .field.password input").val("");
			$(".distributer_form .field.confirm_password input").val("");
			$(".distributer_form .field.i_accept input").prop("checked", false);

		}
	});
       

	//forgot form validation 
	$(".forgot_form .btns .submit").on("click",function(){
		var typo = true; 
		$(".forgot_form .error.post_submit").hide();
		
		if($(".forgot_form .field.user input").val() == "") {
			$(".forgot_form .field.user .error.empty").show();	
			typo = false;
		}
		else $(".forgot_form .field.user .error").hide();	
		
		if(typo) {
                        /*
			if($(".forgot_form .field.user input").val() == "velnet2k@gmail.com") {

				$(".forgot_form .error.post_submit").html("Reset Password Successfull, Please check your email").addClass("success").show();
				$(".forgot_form .field.user input").val("");
			}
			else {
				$(".forgot_form .error.post_submit").html("Invalid Email / Password, Please check your credentials...").removeClass("success").show();
			}
                        */
                       $("#forgot_form").submit();
		}
	});
	
        //call back form submission.
        $(".call_back_form .btns .submit").on("click",function(){
                var typo = true;
                var firstdigit = $(".call_back_form .field input").val().slice(0,1);
                
                if($(".call_back_form .field input").val().length != 10) {
			$(".call_back_form .error.len").show();	
			typo = false;
		} else {
                    $(".call_back_form .error.len").hide();
                    $(".call_back_form .error.firstnotok").hide();
                }
               
               if(firstdigit == 7 || firstdigit == 8 || firstdigit == 9) {
			$(".call_back_form .error.firstnotok").hide();	
		} else {
                    $(".call_back_form .error.firstnotok").show();
                    typo = false;
                }
               
                if(firstdigit == 0) {
			$(".call_back_form .error.firstzero").show();	
			typo = false;
		} else $(".call_back_form .error.firstzero").hide();
                
                if($(".call_back_form .field input").val() == "") {
			$(".call_back_form .error.empty").show();
                        $(".call_back_form .error.len").hide();
                        $(".call_back_form .error.firstzero").hide();
                        $(".call_back_form .error.firstnotok").hide();
			typo = false;
		} else {
                    $(".call_back_form .error.empty").hide();
                }
                
            if(typo){
                $("#callback_form").submit();
            }
        });
        
        //feedback form submission. This is shifted to the feedback.php page
        /*
        $(".feedback_form .btns .submit").on("click",function(){
                var typo = true;
                var firstdigit = $(".feedback_form .field.alternative_mobile input").val().slice(0,1);
                
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                var valid_email = re.test($(".feedback_form .field.email input").val());
		 
		$(".feedback_form .error").hide();
		
                if($(".feedback_form .field.user input").val() == "") {
			$(".feedback_form .field.user .error.empty").show();	
			typo = false;
		}
                
		if($(".feedback_form .field.email input").val() == "") {
			$(".feedback_form .field.email .error.empty").show();	
			typo = false;
		}
		else if(!valid_email) {
			$(".feedback_form .field.email .error.invalid").show();	
			typo = false;
		}
                
                if($(".feedback_form .field.alternative_mobile input").val().length != 10) {
			$(".feedback_form .error.len").show();	
			typo = false;
		} else {
                    $(".feedback_form .error.len").hide();
                    $(".feedback_form .error.firstnotok").hide();
                }
               
               if(firstdigit == 7 || firstdigit == 8 || firstdigit == 9) {
			$(".feedback_form .error.firstnotok").hide();	
		} else {
                    $(".feedback_form .error.firstnotok").show();
                    typo = false;
                }
               
                if(firstdigit == 0) {
			$(".feedback_form .error.firstzero").show();	
			typo = false;
		} else $(".feedback_form .error.firstzero").hide();
                
                if($(".feedback_form .field.alternative_mobile input").val() == "") {
			$(".feedback_form .error.empty").show();
                        $(".feedback_form .error.len").hide();
                        $(".feedback_form .error.firstzero").hide();
                        $(".feedback_form .error.firstnotok").hide();
			typo = false;
		} else {
                    $(".feedback_form .error.empty").hide();
                }
                
                if($(".feedback_form .field.textarea input").val() == "") {
			$(".feedback_form .field.textarea .error.empty").show();	
			typo = false;
		}
                
            if(typo){
                $("#feedback_form").submit();
            }
        });
        */
       
	//header icon action
	$(".header .box > span").on("click", function(){
		$(".popups .popup_window .box").fadeOut("slow");
		$(this).parent(".box").addClass("active").siblings().removeClass("active");
		if($(this).parent(".box").hasClass("call_back")) {
			$("body").addClass("fullscreen");
			$(".popups .block_bg").fadeIn("slow");
			$(".popups .popup_window").fadeIn("slow");
			$(".popups .popup_window .box.call_back").fadeIn("slow");
		}
                else if($(this).parent(".box").hasClass("feedback")) {
			$("body").addClass("fullscreen");
                        $(".popups .block_bg").fadeIn("slow");
                        $(".popups .popup_window").fadeIn("slow");
                        $(".popups .popup_window .box.feedback").fadeIn("slow");
                }
		else if($(this).parent(".box").hasClass("tariff")) {
			$("body").addClass("fullscreen");
			$(".popups .block_bg").fadeIn("slow");
			$(".popups .popup_window").fadeIn("slow");
			$(".popups .popup_window .box.tariff").fadeIn("slow");
		}
		else if($(this).parent(".box").hasClass("login")) {
			$("body").addClass("fullscreen");
			$(".popups .block_bg").fadeIn("slow");
			$(".popups .popup_window").fadeIn("slow");
			$(".popups .popup_window .box.login").fadeIn("slow");
		}
                else if($(this).parent(".box").hasClass("logout")) {
			$("body").addClass("fullscreen");
			$(".popups .block_bg").fadeIn("slow");
			$(".popups .popup_window").fadeIn("slow");
			$(".popups .popup_window .box.logout").fadeIn("slow");
		}
                else if($(this).parent(".box").hasClass("trip_estimate")) {
                        //close popup functions are done first.
			$(".popups .block_bg").fadeOut("slow");
                        $(".popups .popup_window").fadeOut("slow");
                        $(".popups .popup_window .box.login").fadeOut("slow");
                        $("body").removeClass("fullscreen");
                        $(".header .box").removeClass("active");
                        window.location.href = "trip-estimate.php";
		}
                else if($(this).parent(".box").hasClass("refer")) {
                        //close popup functions are done first.
			$(".popups .block_bg").fadeOut("slow");
                        $(".popups .popup_window").fadeOut("slow");
                        $(".popups .popup_window .box.login").fadeOut("slow");
                        $("body").removeClass("fullscreen");
                        $(".header .box").removeClass("active");
                        window.location.href = "referfriends.php";
		}
	});

	//close popup
	$(".popup_window .close_btn").on("click", function(){
		
		$(".popups .block_bg").fadeOut("slow");
		$(".popups .popup_window").fadeOut("slow");
		$(".popups .popup_window .box.login").fadeOut("slow");
		$("body").removeClass("fullscreen");
		$(".header .box").removeClass("active");
	});

	//to open forgot password
	$(".forgot_password_register_btns .forgot_password").on("click", function(){
		$("body").addClass("fullscreen");
		$(".popups .block_bg").fadeIn("slow");
		$(".popups .popup_window").fadeIn("slow");
		$(".popups .popup_window .box.forgot_password").fadeIn("slow");
	});

	//to open register
	$(".forgot_password_register_btns .register_btn").on("click", function(){
		$("body").addClass("fullscreen");
		$(".popups .block_bg").fadeIn("slow");
		$(".popups .popup_window").fadeIn("slow");
		$(".popups .popup_window .box.register").fadeIn("slow");
	});


	//resize function
	$(window).on("resize", function(){
		resize();
	});

	/*
	$('.slider.home').slick({
		dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: 20000,
  		arrows: true, 
  		adaptiveHeight: false,
  		fade: true,
  		

    });
    $('.slider.homeBig').slick({
		dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: 4000,
  		arrows: false,
  		adaptiveHeight: true,
  		asNavFor: '.slider.home',
    });
    $('.slider.project_highlights').slick({
		dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: 4000,
  		arrows: true, 
  		adaptiveHeight: false,

    });

	$('.slider.quotes_left').slick({
		dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: 4000,
  		arrows: false,
  		adaptiveHeight: true,
    });

	

	//for ajax form to submit
	$(".ajax_form").on('submit', function(e) {
		//alert("submit initiated	")
		e.preventDefault();
		obj = $(this);
		if(validateThisForm($(this))) {
			obj.prev(".error_msg").html("Processing...")
			obj.ajaxSubmit({
	            target: obj.prev(".error_msg"),
	            success:  function() {
	            	obj.prev(".error_msg").children(".alert").html("We got your query, will get back to you shortly...");
					obj[0].reset();		
	            } 
	        });
		}
	});

	//remove messgge when type
	$(".ajax_form input, .ajax_form textarea").on("keydown", function(){
		$(".ajax_form").prev(".error_msg").html("");
	});

	$(window).on("resize", function(){
		resize();
	});
	

	$(".custom_scroll").niceScroll({touchbehavior:false, autohidemode:false});

	//for jPlayer
	new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
	}, [
		{
			title:"Kurai Onrum Illai",
			mp3: PATH + "/assets/files/kurai_ondrum_illai_flute.mp3",
			oga: PATH + "/assets/files/kurai_ondrum_illai_flute.ogg"
		}
		
	], {
		swfPath: ADMIN_PATH_SITE + "/lib/jplayer/jplayer",
		supplied: "oga, mp3",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: true,
		smoothPlayBar: true,
		keyEnabled: true,
		ready: function () {
			$(this).jPlayer("play"); // Attempts to Auto-Play the media
		}

	})
	*/

	resize();
});



var resizeCounter = 0;
function resize() {
	resizeCounter++;
	$(".debug").html(resizeCounter + ": width: " + $(window).width() + ", height: " + $(window).height());
	
	if($(window).width() > 767) {
		
	}
	else {
		
	}

	$(".popup_window .box").css({ minHeight: $(window).height() })
}


//function to animate loading
var loadedPercentage = 0;
function animateLoading() {
	if($("#jprePercentage").length)
		loadedPercentage = $("#jprePercentage").html().replace("Loading...","0").replace("%","");
	$(".loaderPlus .percentage").width(loadedPercentage + "%");
	$(".loaderLine").width(loadedPercentage + "%");
	loadTimer = setTimeout(animateLoading,50);
}


function showModalError(msg) {
	//alert(order_no)
	$(".modalBG, .modal_window.error_message").show("fast");
	$(".modal_window .error").hide();
	$(".modal_window.error_message .inner").html(msg)
	
}

//This function is used to get a query string value in url
function qs(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
}