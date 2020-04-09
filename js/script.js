/*
-----------------------------------------------
Sarathi Creations - Common Script
Created: 23-MAY-2018
Author:  Sarath
Copyright 2018
All rights reserved
----------------------------------------------- */

// Tooltips Initialization
$(function () {
    $('#dropTrip').addClass('trip-options-active');
    $('#dropTripStepper').show();
    /*
    $('#dHatch').attr('src', "assets/images/hAtch_yellow.png");
    $('#dHatch').siblings('p').css('color', 'black');
    */
    $('#dSedan').attr('src', "assets/images/sedan_yellow.png");
    $('#dSedan').siblings('p').css('color', 'black');
    $('.taxi_hd').prop('checked', true);
    $('.taxi_hr').prop('checked', true);
    $('.taxi_sp').prop('checked', true);
    $('#roundTripStepper').hide();
    $('#packageStepper').hide();
    $('#dSedanP').attr("src", "assets/images/sedan_yellow.png");
    $('#dSedanP').siblings('p').css('color', 'black');

    $('#estimate, .book-now, .date-time, #addressSection').hide();
    $('#estimate-round, .book-now-round, .date-time-days, #addressSection-round').hide();
    $('#estimate-pkg, .car-collection-pack, .book-now-pack, .date-time-pack, #addressSection-pack').hide();
    
    $( "#referredbyblock" ).hide();
    $( "#redeemblock" ).hide();
    $( "#referredbyblock-round" ).hide();
    $( "#redeemblock-round" ).hide();
    $( "#referredbyblock-pack" ).hide();
    $( "#redeemblock-pack" ).hide();

})

//                 
$(document).ready(function () {
    var dataFrom = '';
    var dataTo = '';

    var dropFromLabel = $('.lab-from');
    var dropToLabel = $('.lab-to');
    var dropDateLabel = $('.lab-date');
    var dropTimeLabel = $('.lab-time');
    
    var $ddpkg = $('#pack-from-loc').html();
    var $ddpkghtml = $('#pack-to-loc').html();
    
    var $ddlocalpkg = $('#localpkghtml').html();
    $('#localpkghtml').hide();

    dropFromLabel.css('visibility', 'hidden');
    dropToLabel.css('visibility', 'hidden');
    dropDateLabel.css('visibility', 'hidden');
    dropTimeLabel.css('visibility', 'hidden');
    $('.lab-days').css('visibility', 'hidden');
    $('#addNameLabel, #addTelLabel, #addTelAltLabel, #addTelAltLabel-round, #addTelAltLabel-pack, #addEmailLabel, #pickAddLabel, #dropAddLabel').css('visibility', 'hidden');
    $('.lab-date-round, .lab-time-round').css('visibility', 'hidden');
    $('#addNameLabel-round, #addTelLabel-round, #addEmailLabel-round, #pickAddLabel-round, #dropAddLabel-round').css('visibility', 'hidden');
    $('.lab-pick, .lab-pack').css('visibility', 'hidden');
    $('.lab-date-pack, .lab-time-pack').css('visibility', 'hidden');
    $('#addNameLabel-pack, #addTelLabel-pack, #addEmailLabel-pack, #pickAddLabel-pack').css('visibility', 'hidden');

    //slick Carousel Section
    $('#slick-content').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: "",
  		prevArrow: ""
    });
    //Slick ends

    //Get Estimate
    function GetEstimate(RatePerKM,TripType,NoOfDays){
            var $estimate = [];
            
            $.ajax({
                type: "POST",
                data: {
                    fcity: $('#drop-from-loc').val(),
                    tcity: $('#drop-to-loc').val(),
                    dcode: $("#disccode").val(),
                    vid: $("#car_type").val(),
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
                    console.log($estimate);
                    //alert($estimate['estimate']);
                    //$(".booking .booking_form .booking_summary #distance").val($distval);
                 },
                 complete: function (data) {
                     if($estimate['estimate'] == 0){
                         $(".estamount").html("<span style='font-size:16px;'>Contact Customer Care for Estimate! </span>");
                     } else {
                        if($estimate['distance']!=0){
                            $("#tripamount").val($estimate['estimate']);
                            if($estimate['isshortroute'] && $estimate['rpkm']==10){
                                $("#estdistancedt").html("Distance: "+$estimate['distance']/2+" kms (Short Route Tariff apply - Rs. "+$estimate['rpkm']*2+"/km - No Waiting is allowed.)");
                            } else {
                                $("#estdistancedt").html("Distance: "+$estimate['distance']+" kms");
                            }   
                        }
                        $(".estamount").html($estimate['estimate']);
                        if(($('#drop-from-loc').val()=="Chennai" && $('#drop-to-loc').val()=="Pondicherry")
                            || ($('#drop-from-loc').val()=="Pondicherry" && $('#drop-to-loc').val()=="Chennai")){
                            $(".mesgpkg").html("<span style='font-size:14px;color:red;font-weight:bold;'>Package Trip for Chennai - Pondicherry is available at reduced rate. (Rs. 1900 / Rs.1950). <br>Check PACKAGES!!!</span>")
                        } else if($('#car_type').val() == "558784ee2e854"){
                            
                            if(($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Trichy") || 
                               ($('#drop-from-loc').val() == "Trichy" && $('#drop-to-loc').val() == "Chennai") ||
                               ($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Vellore") ||
                               ($('#drop-from-loc').val() == "Vellore" && $('#drop-to-loc').val() == "Chennai") ||
                               ($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Ranipet") ||
                               ($('#drop-from-loc').val() == "Ranipet" && $('#drop-to-loc').val() == "Chennai") ||
                               ($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Bangalore") ||
                               ($('#drop-from-loc').val() == "Bangalore" && $('#drop-to-loc').val() == "Chennai") ||
                               ($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Cuddalore") ||
                               ($('#drop-from-loc').val() == "Cuddalore" && $('#drop-to-loc').val() == "Chennai") ||
                               ($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Chidambaram") ||
                               ($('#drop-from-loc').val() == "Chidambaram" && $('#drop-to-loc').val() == "Chennai") ||
                               ($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Neyveli") ||
                               ($('#drop-from-loc').val() == "Neyveli" && $('#drop-to-loc').val() == "Chennai") ||
                               ($('#drop-from-loc').val() == "Chennai" && $('#drop-to-loc').val() == "Thiruvannamalai") ||
                               ($('#drop-from-loc').val() == "Thiruvannamalai" && $('#drop-to-loc').val() == "Chennai")
                               ){
                                $(".mesgpkg").html("");
                                //$(".mesgpkg").html("<span style='font-size:14px;color:red;font-weight:bold;'>Package Trip for "+$('#drop-from-loc').val()+" - "+$('#drop-to-loc').val()+" is available at reduced rate.</span> <br><span id='checkpkgs' style='text-decoration:underline;color:red;cursor:pointer;font-weight:bold;'>Check PACKAGES!!!</span>");
                            }
                            
                            else {
                                $(".mesgpkg").html("");
                            }
                        } else {
                           $(".mesgpkg").html("");         
                        }
                        $(".estdtbreakup").html("[Base charges: &#8377; "+$estimate['basecharge']+" / Driver bata: &#8377; "+$estimate['driverbata']);
                        if($estimate['isp']!=0){
                            $(".estdtbreakup").append(" / ISP: &#8377; "+$estimate['isp']);
                        }
                        if($estimate['hillcharges']!=0){
                            $(".estdtbreakup").append(" / Hill charges: &#8377; "+$estimate['hillcharges']);
                        }
                        $(".estdtbreakup").append(" + Toll at actuals]");
                        
                        $(".hardrouteterms").html("");
                        if($estimate['ishardroute'] == 1){
                        $(".hardrouteterms").html("<br><span style='color:red;'><strong>This is a hard route to serve. Hence rate is increased by Rs.3/km.</strong> (Rs. "+(parseFloat(RatePerKM)+3)+"/km.)</span>");
                        }
                    }
                 }
            }); 
    }
    
    function GetEstimateRT(RatePerKM,TripType,NoOfDays){
            var $estimate = [];
            $.ajax({
                type: "POST",
                data: {
                    fcity: $('#round-from-loc').val(),
                    tcity: $('#round-to-loc').val(),
                    dcode: $("#disccode").val(),
                    vid: $("#Rcar_type").val(),
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
                         $("#estimate-round .estamount").html("<span style='font-size:16px;'>Contact Customer Care for Estimate! </span>");
                     } else {
                        if($estimate['distance']!=0){
                            $("#estdistancert").html("Distance: "+$estimate['distance']+" kms");
                        }
                        $("#estimate-round .estamount").html($estimate['estimate']);
                        $(".estrtbreakup").html("[Base charges: &#8377; "+$estimate['basecharge']+" / Driver bata: &#8377; "+$estimate['driverbata']);
                        if($estimate['isp']!=0){
                            $(".estrtbreakup").append(" / ISP: &#8377; "+$estimate['isp']);
                        }
                        if($estimate['hillcharges']!=0){
                            $(".estrtbreakup").append(" / Hill charges: &#8377; "+$estimate['hillcharges']);
                        }
                        $(".estrtbreakup").append(" + Toll at actuals]");
                    }
                 }
            }); 
    }
    //--End Estimate
    
    function check_user_referred(triptype)
    {
        var mobile;
        if(triptype == 'drop'){
            mobile = $('#addTel').val();
        }
        if(triptype == 'round'){
            mobile = $('#addTel-round').val();
        }
        if(triptype == 'pack'){
            mobile = $('#addTel-pack').val();
        }
        $.ajax({
            type: "POST",
            data: {
                mno: mobile,ajax:true
            },
            dataType:"json",
            url: "userexists_ref.php",
            success: function(data)
            {
                //console.log(data);
                if(data['status'] === 'USER_EXISTS')
                {
                    if(triptype == 'drop'){
                        $("#referredbyblock").hide();
                        $("#addName").val(data['name']);
                        $("#addEmail").val(data['email']);
                        $("#addTelAlt").val(data['altno']);
                        $('#addName').attr('readonly', true);
                        $('#addEmail').attr('readonly', true);
                        $('#drop_trip #isnewuser').val('0');
                    }
                    if(triptype == 'round'){
                        $("#referredbyblock-round").hide();
                        $("#addName-round").val(data['name']);
                        $("#addEmail-round").val(data['email']);
                        $("#addTelAlt-round").val(data['altno']);
                        $('#addName-round').attr('readonly', true);
                        $('#addEmail-round').attr('readonly', true);
                        $('#round_trip #isnewuser').val('0');
                    }
                    if(triptype == 'pack'){
                        $("#referredbyblock-pack").hide();
                        $("#addName-pack").val(data['name']);
                        $("#addEmail-pack").val(data['email']);
                        $("#addTelAlt-pack").val(data['altno']);
                        $('#addName-pack').attr('readonly', true);
                        $('#addEmail-pack').attr('readonly', true);
                        $('#pack_trip #isnewuser').val('0');
                    }
                } else {
                    if(triptype == 'drop'){
                        $( "#referredbyblock" ).show();
                        $("#addName").val('');
                        $("#addEmail").val('');
                         $("#addTelAlt").val('');
                        $('#addName').removeAttr('readonly');
                        $('#addEmail').removeAttr('readonly');
                        $('#drop_trip #isnewuser').val('1');
                    }
                    if(triptype == 'round'){
                        $( "#referredbyblock-round" ).show();
                        $("#addName-round").val('');
                        $("#addEmail-round").val('');
                        $("#addTelAlt-round").val('');
                        $('#addName-round').removeAttr('readonly');
                        $('#addEmail-round').removeAttr('readonly');
                        $('#round_trip #isnewuser').val('1');
                    }
                    if(triptype == 'pack'){
                        $( "#referredbyblock-pack" ).show();
                        $("#addName-pack").val('');
                        $("#addEmail-pack").val('');
                        $("#addTelAlt-pack").val('');
                        $('#addName-pack').removeAttr('readonly');
                        $('#addEmail-pack').removeAttr('readonly');
                        $('#pack_trip #isnewuser').val('1');
                    }
                }
            }
        });              
    }
    function check_referred_user(triptype){
        var mobile;
        if(triptype == 'drop'){
            mobile = $('#referredby').val();
        }
        if(triptype == 'round'){
            mobile = $('#referredby-round').val();
        }
        if(triptype == 'pack'){
            mobile = $('#referredby-pack').val();
        }
        $.ajax({
            type: "POST",
            data: {
                mno: mobile,ajax:true
            },
            dataType:"json",
            url: "userexists_ref.php",
            success: function(data)
            {
                console.log(data);
                if(data['status'] === 'USER_NOT_EXISTS')
                {
                    if(triptype == 'drop'){
                        $("#referredbyblock .refmesg").show();    
                    }
                    if(triptype == 'round'){
                        $("#referredbyblock-round .refmesg").show();
                    }
                    if(triptype == 'pack'){
                        $("#referredbyblock-pack .refmesg").show();
                    }
                } else {
                    $("#referredbyblock .refmesg").hide(); 
                    $("#referredbyblock-round .refmesg").hide(); 
                    $("#referredbyblock-pack .refmesg").hide(); 
                }
            }
        }); 
    }
    function check_redeemAmount(triptype)
    {
        var mobile;
        if(triptype == 'drop'){
            mobile = $('#addTel').val();
        }
        if(triptype == 'round'){
            mobile = $('#addTel-round').val();
        }
        if(triptype == 'pack'){
            mobile = $('#addTel-pack').val();
        }
        $.ajax({
            type: "POST",
            data: {
                mno: mobile,ajax:true
            },
            url: "redeemamount.php",
            success: function(data)
            {
                var ramt = parseInt(data);
                if(ramt > 0)
                {
                    if(triptype == 'drop'){
                        $("#redeemblock").show();   
                        $("#redeemavailable").html("Rs. "+ramt);
                        $('#redeemlimit').val(ramt);
                    }
                    if(triptype == 'round'){
                        $("#redeemblock-round").show();   
                        $("#redeemavailable-round").html("Rs. "+ramt);
                        $('#redeemlimit-round').val(ramt);
                    }
                    if(triptype == 'pack'){
                        $("#redeemblock-pack").show();   
                        $("#redeemavailable-pack").html("Rs. "+ramt);
                        $('#redeemlimit-pack').val(ramt);
                    }
                } else {
                    $("#redeemblock").hide();
                    $("#redeemblock-round").hide();
                    $("#redeemblock-pack").hide();
                }

            }
        });              
    }
    
    function is_user_exists()
    {
        var mobile;
        mobile = $('#CustMobileNo').val();
        $.ajax({
            type: "POST",
            data: {
                mno: mobile,ajax:true
            },
            dataType:"json",
            url: "userexists_ref.php",
            success: function(data)
            {
                //console.log(data);
                if(data['status'] === 'USER_EXISTS')
                {
                    $("#register_form .userExists").show();
                } else {
                    
                }
            }
        });              
    }
    $("#register_form #CustMobileNo").keyup(function(){
         if($("#register_form #CustMobileNo").val().length == 10){
            is_user_exists();
         }
     });
    $("#addTel").keyup(function(){
         var ntxt, lstchar;
         ntxt = $('#addTel').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#addTel').val(ntxt.substring(0, ntxt.length-1));
            }
         if($("#addTel").val().length == 10){
            check_user_referred('drop');
            check_redeemAmount('drop');
         }
     });
     
     $("#addTel-round").keyup(function(){
         var ntxt, lstchar;
         ntxt = $('#addTel-round').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#addTel-round').val(ntxt.substring(0, ntxt.length-1));
            }
         if($("#addTel-round").val().length == 10){
            check_user_referred('round');
            check_redeemAmount('round');
         }
     });
     
     $("#addTel-pack").keyup(function(){
         var ntxt, lstchar;
         ntxt = $('#addTel-pack').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#addTel-pack').val(ntxt.substring(0, ntxt.length-1));
            }
         if($("#addTel-pack").val().length == 10){
            check_user_referred('pack');
            check_redeemAmount('pack');
         }
     });
     
     $('#addTelAlt').on('keyup', function () {
          var ntxt, lstchar;
         ntxt = $('#addTelAlt').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#addTelAlt').val(ntxt.substring(0, ntxt.length-1));
            }
    });
    $('#addTelAlt-round').on('keyup', function () {
        var ntxt, lstchar;
         ntxt = $('#addTelAlt-round').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#addTelAlt-round').val(ntxt.substring(0, ntxt.length-1));
            }
    });
    $('#addTelAlt-pack').on('keyup', function () {
        var ntxt, lstchar;
         ntxt = $('#addTelAlt-pack').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#addTelAlt-pack').val(ntxt.substring(0, ntxt.length-1));
            }
    });
     
     $('#addName').keyup(function(e) {
         var ntxt, lstchar;
         ntxt = $('#addName').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                $('#addName').val(ntxt.substring(0, ntxt.length-1));
            }
     });
     
     $('#addName-round').keyup(function(e) {
         var ntxt, lstchar;
         ntxt = $('#addName-round').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                $('#addName-round').val(ntxt.substring(0, ntxt.length-1));
            }
     });
     
     $('#addName-pack').keyup(function(e) {
         var ntxt, lstchar;
         ntxt = $('#addName-pack').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                $('#addName-pack').val(ntxt.substring(0, ntxt.length-1));
            }
     });
     
     $('#CustMobileNo').keyup(function(e) {
         var ntxt, lstchar;
         ntxt = $('#CustMobileNo').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#CustMobileNo').val(ntxt.substring(0, ntxt.length-1));
            }
     });
     
     $('#CustAltContactNo').keyup(function(e) {
         var ntxt, lstchar;
         ntxt = $('#CustAltContactNo').val();
         lstchar = parseInt(ntxt[ntxt.length-1]);
            if (lstchar >= 0 && lstchar <= 9) {
                
            } else {
                $('#CustAltContactNo').val(ntxt.substring(0, ntxt.length-1));
            }
     });
     
     $("#referredby").keyup(function(){
         if($("#referredby").val().length == 10){
            check_referred_user('drop');
         }
     });
     $("#referredby-round").keyup(function(){
         if($("#referredby-round").val().length == 10){
            check_referred_user('round');
         }
     });
     $("#referredby-pack").keyup(function(){
         if($("#referredby-pack").val().length == 10){
            check_referred_user('pack');
         }
     });
        
    $('#drop-from-loc').on('change', function () {
        $("#estimate .estamount").html("<img src='images/loading.gif' />");
        dropFromLabel.css('visibility', 'visible');
        dataFrom = $('#drop-from-loc').val(); 
        dataTo = $('#drop-to-loc').val();

        if (dataFrom != '' && dataTo != '') {
            GetEstimate($('#rpkm').val(),$('#trip_mode').val(),1);
            $('#estimate, .book-now').show();
        }
    });
    $('#drop-to-loc').on('change', function () {
        $("#estimate .estamount").html("<img src='images/loading.gif' />");
        dropToLabel.css('visibility', 'visible');
        dataFrom = $('#drop-from-loc').val();
        dataTo = $('#drop-to-loc').val();
        if ($('#drop-from-loc').val() == $('#drop-to-loc').val()) {
            $('#exampleModalCenter').modal('show');
        } else if (dataFrom != '' && dataTo != '') {
            GetEstimate($('#rpkm').val(),$('#trip_mode').val(),1);
            $('#estimate, .book-now').show();
        }
    });
    $('.book-now').on('click', function () {
        $('.estim-wrap').addClass('estimate-fullview');
        $(this).hide();
        $('.date-time, #addressSection').show();
        if($('#car_type').val()=="558784c79fb9c"){
            alert("Hatchbacks are allotted subject to availability!");
        }
    });
    $('#drop-date').on('focus', function () {
        dropDateLabel.css('visibility', 'visible');
    });
    $('#drop-date').on('change', function () {
        var dtj = $('#drop-date').val();
        
        if($('#drop-from-loc').val()=="Vellore" && $('#drop-to-loc').val()=="Chennai"){
            if(dtj=="2020-03-16" || dtj=="2020-03-17" || dtj=="2020-03-18"){
                alert("Due to very heavy one way traffic for Vellore - Chennai route, Sedan AC will be charged Rs. 2500/- and MUV will be charged Rs. 3200/- all inclusive.");
            }
        }
        if(($('#drop-from-loc').val()=="Chennai" && $('#drop-to-loc').val()=="Vellore")||
                ($('#drop-from-loc').val()=="Chennai" && $('#drop-to-loc').val()=="Katpadi")){
            if(dtj=="2019-07-07" || dtj=="2019-07-08" || dtj=="2019-07-09" || dtj=="2019-07-10" 
                     || dtj=="2019-07-11"){
            alert("Due to very heavy one way traffic for Chennai - Vellore  route, Sedan AC will be charged Rs. 2500/- and MUV will be charged Rs. 3200/- all inclusive.");
            }
        }
        
       if($('#drop-from-loc').val()=="Chennai"){
            if(dtj=="2020-01-13" || dtj=="2020-01-14"){
                alert("Due to very heavy one way traffic from Chennai, unable to confirm online booking. Please contact customer care.");
            }
        }

        if($('#drop-to-loc').val()=="Chennai"){
            if(dtj=="2020-01-18" || dtj=="2020-01-19"){
                alert("Due to very heavy one way traffic to Chennai, Sedan rate will be Rs.15/km and MUV rate will be Rs.18/km.");
            }
        }

    });
    $('#drop-time').on('focus', function () {
        dropTimeLabel.css('visibility', 'visible');
    })
    $('#addName').on('keydown', function () {
        $('#addNameLabel').css('visibility', 'visible');
    });
    $('#addTel').on('keydown', function () {
        $('#addTelLabel').css('visibility', 'visible');
    });
    $('#addTel-round').on('keydown', function () {
        $('#addTelLabel-round').css('visibility', 'visible');
    });
    $('#addTelAlt').on('keydown', function () {
        $('#addTelAltLabel').css('visibility', 'visible');
    });
    $('#addTelAlt-round').on('keydown', function () {
        $('#addTelAltLabel-round').css('visibility', 'visible');
    });
    $('#addTelAlt-pack').on('keydown', function () {
        $('#addTelAltLabel-pack').css('visibility', 'visible');
    });
    $('#addEmail').on('keydown', function () {
        $('#addEmailLabel').css('visibility', 'visible');
    });
    $('#pickAdd').on('keydown', function () {
        $('#pickAddLabel').css('visibility', 'visible');
    });
    $('#dropAdd').on('keydown', function () {
        $('#dropAddLabel').css('visibility', 'visible');
    });
    // Round Trip Section

    $('#round-from-loc').on('change', function () {
        $("#estimate-round .estamount").html("<img src='images/loading.gif' />");
        $('.lab-from').css('visibility', 'visible');
        dataFrom = $('#round-from-loc').val();
        dataTo = $('#round-to-loc').val();
        if ($('#round-from-loc').val() == $('#round-to-loc').val()) {
            $('#exampleModalCenter').modal('show');
        } else if (dataFrom != '' && dataTo != '') {
            GetEstimateRT($('#rpkmrt').val(),2,$('#round-days').val());
            $('#estimate-round, .book-now-round').show();
        }
    });
    $('#round-to-loc').on('change', function () {
        $("#estimate-round .estamount").html("<img src='images/loading.gif' />");
        $('.lab-to').css('visibility', 'visible');
        dataFrom = $('#round-from-loc').val();
        dataTo = $('#round-to-loc').val();
        if ($('#round-from-loc').val() == $('#round-to-loc').val()) {
            $('#exampleModalCenter').modal('show');
        } else if (dataFrom != '' && dataTo != '') {
            GetEstimateRT($('#rpkmrt').val(),2,$('#round-days').val());
            $('#estimate-round, .book-now-round').show();
        }
    });
    $('.book-now-round').on('click', function () {
        $('.estim-wrap-round').addClass('estimate-fullview');
        $(this).hide();
        $('.date-time-days, #addressSection-round').show();
        if($('#Rcar_type').val()=="558784c79fb9c"){
            alert("Hatchbacks are allotted subject to availability!");
        }
    });
    $('#round-date').on('focus', function () {
        $('.lab-date-round').css('visibility', 'visible');
    });
    $('#round-time').on('focus', function () {
        $('.lab-time-round').css('visibility', 'visible');
    });
    $('#round-days').on('focus', function () {
        $('.lab-days-round').css('visibility', 'visible');
    });
    $('#addName-round').on('keydown', function () {
        $('#addNameLabel-round').css('visibility', 'visible');
    });
    $('#addTel-round').on('keydown', function () {
        $('#addTelLabel-round').css('visibility', 'visible');
    });
    $('#addEmail-round').on('keydown', function () {
        $('#addEmailLabel-round').css('visibility', 'visible');
    });
    $('#pickAdd-round').on('keydown', function () {
        $('#pickAddLabel-round').css('visibility', 'visible');
    });
    $('#dropAdd-round').on('keydown', function () {
        $('#dropAddLabel-round').css('visibility', 'visible');
    });

    // Pack
    $('#estimate .mesgpkg').on('click',"#checkpkgs",function(){
        $('#packages').addClass('trip-options-active');
        $("#roundTrip").removeClass('trip-options-active');
        $("#dropTrip").removeClass('trip-options-active');
        $('#dropTripStepper').hide();
        $('#roundTripStepper').hide();
        $('#estimate-pkg').hide();
        $('#packageStepper').show();
    });
    $('#outstationtext').on('click', function () {
        $('#pack-to-loc').html($ddpkghtml);
        $('#outstationtext').addClass('active');
        $('#localtext').removeClass('active');
        $('#estimate-pkg').hide();
    });
    $('#localtext').on('click', function () {
        $('#pack-to-loc').html($ddlocalpkg);
        $('#localtext').addClass('active');
        $('#outstationtext').removeClass('active');
        $('#estimate-pkg').hide();
    });
    $('#pack-from-loc').on('change', function () {
        $('.lab-pick').css('visibility', 'visible');
        dataFrom = $('#pack-from-loc').val();
    });
    $('#pack-to-loc').on('change', function () {
        //Specific packages dropdown options
        var $ddpkg21 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Bangalore">Bangalore</option>';
        var $ddpkg17 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Chidambaram">Chidambaram</option>';
        var $ddpkg18 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Cuddalore">Cuddalore</option>';
        var $ddpkg19 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Neyveli">Neyveli</option>';
        var $ddpkg1214 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Pondicherry">Pondicherry</option>';
        var $ddpkg16 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Ranipet">Ranipet</option>';
        var $ddpkg22 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Thiruvannamalai">Thiruvannamalai</option>';
        var $ddpkg20 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Trichy">Trichy</option>';
        var $ddpkg15 = '<option value="">From</option><option value="Chennai">Chennai</option><option value="Vellore">Vellore</option>';
        var $ddpkg11 = '<option value="">From</option><option value="Hosur">Hosur</option><option value="Bangalore">Bangalore</option>';
        var $estimate = [];
        $("#estimate-pkg .estamount").html("<img src='images/loading.gif' />");
        $('.lab-pack').css('visibility', 'visible');
        dataTo = $('#pack-to-loc').val();
        
        if(dataTo == 11){
            $('#pack-from-loc').html($ddpkg11);
        } else if (dataTo == 12 || dataTo == 14){
            $('#pack-from-loc').html($ddpkg1214);
        } else if (dataTo == 15){
            $('#pack-from-loc').html($ddpkg15);
        } else if (dataTo == 16){
            $('#pack-from-loc').html($ddpkg16);
        } else if (dataTo == 17){
            $('#pack-from-loc').html($ddpkg17);
        } else if (dataTo == 18){
            $('#pack-from-loc').html($ddpkg18);
        } else if (dataTo == 19){
            $('#pack-from-loc').html($ddpkg19);
        } else if (dataTo == 20){
            $('#pack-from-loc').html($ddpkg20);
        } else if (dataTo == 21){
            $('#pack-from-loc').html($ddpkg21);
        } else if (dataTo == 22){
            $('#pack-from-loc').html($ddpkg22);
        } else {$('#pack-from-loc').html($ddpkg);}
        
        if ($('#pack-from-loc').val() == $('#pack-to-loc').val()) {
            $('#exampleModalCenter').modal('show');
        } else if (dataFrom != 'From' && dataTo != 'To') {
            $('.car-collection-pack, .book-now-pack').show();
        }
        $.ajax({
                type: "POST",
                data: {
                    pid: $('#pack-to-loc').val(),
                    ajax:false
                },
                url: "process/p_getestimate_pkg.php",
                dataType:"json",
                success: function(data)
                {
                    $estimate = data;
                    console.log($estimate);
                    //alert($estimate['estimate']);
                    //$(".booking .booking_form .booking_summary #distance").val($distval);
                 },
                complete: function (data) {
                    if ($('#pack-to-loc').val() == 12) {
                        $('#estimate-pkg').show();
                        $('#estdistancepkg').html("Distance: "+$estimate['kmslimit']+" kms (via ECR)<br>");
                        $('.estamount').html($estimate['price']);
                        $('.estterms').html("<sup>*</sup>Inclusive of Toll. Additional kms - Rs."+$estimate['addlkmsrate']+"/km. Additional hours - Rs. 120/hr.");
                    } else if ($('#pack-to-loc').val() == 14) {
                        $('#estimate-pkg').show();
                        $('#estdistancepkg').html("Distance: "+$estimate['kmslimit']+" kms<br>");
                        $('.estamount').html($estimate['price']);
                        $('.estterms').html("<sup>*</sup>Toll Extra. Additional kms - Rs."+$estimate['addlkmsrate']+"/km. Additional hours - Rs. 120/hr. <span style='color:red;'>This Package is applicable only if Pickup or drop point is around airport with radius of 5 kms. For more details please call our customer care.</span>");
                    } else {
                        $('#estimate-pkg').show();
                        $('#estdistancepkg').html("Distance: "+$estimate['kmslimit']+" kms<br>");
                        $('.estamount').html($estimate['price']);
                        $('.estterms').html("<sup>*</sup>Toll Extra. Additional kms - Rs."+$estimate['addlkmsrate']+"/km. Additional hours - Rs. "+$estimate['addlhrsrate']+"/hr.");
                    }
                }
        });
    });
    
    $('.book-now-pack').on('click', function () {
        $(this).hide();
        $('.date-time-pack, #addressSection-pack').show();
    });
    $('#pack-date').on('focus', function () {
        $('.lab-date-pack').css('visibility', 'visible');
    });
    $('#pack-date').on('change', function () {
        var dtj = $('#pack-date').val();
        if ($('#pack-from-loc').val() == "Chennai"){
            if(dtj=="2019-01-11" || dtj=="2019-01-12" || dtj=="2019-01-13" || dtj=="2019-01-14"){
                alert("Due to heavy one way traffic from Chennai, packages are not available on the date you selected. Contact customer care for more details.");
                $('#pack-date').val("");
            }
        }
    });
    $('#pack-time').on('focus', function () {
        $('.lab-time-pack').css('visibility', 'visible');
    });
    $('#addName-pack').on('keydown', function () {
        $('#addNameLabel-pack').css('visibility', 'visible');
    });
    $('#addTel-pack').on('keydown', function () {
        $('#addTelLabel-pack').css('visibility', 'visible');
    });
    $('#addEmail-pack').on('keydown', function () {
        $('#addEmailLabel-pack').css('visibility', 'visible');
    });
    $('#pickAdd-pack').on('keydown', function () {
        $('#pickAddLabel-pack').css('visibility', 'visible');
    });

    //min date
    var s=new Date();
    var g=s.getFullYear()+"-"+("0"+(s.getMonth()+1)).slice(-2)+"-"+("0"+s.getDate()).slice(-2);
    $('#drop-date').attr("min",g);
    $('#round-date').attr("min",g);
    $('#pack-date').attr("min",g);

    //Model
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus');
    });

    //Time
    var time = ['00 : 00', '00 : 15', '00 : 30', '00 : 45', '01 : 00', '01 : 15', '01 : 30', '01 : 45', '02 : 00', '02 : 15', '02 : 30', '02 : 45', '03 : 00',
        '03 : 15', '03 : 30', '03 : 45', '04 : 00', '04 : 15', '04 : 30', '04 : 45', '05 : 00', '05 : 15', '05 : 30', '05 : 45', '06 : 00',
        '06 : 15', '06 : 30', '06 : 45', '07 : 00', '07 : 15', '07 : 30', '07 : 45', '08 : 00', '08 : 15', '08 : 30', '08 : 45', '09 : 00',
        '09 : 15', '09 : 30', '09 : 45', '10 : 00', '10 : 15', '10 : 30', '10 : 45', '11 : 00', '11 : 15', '11 : 30', '11 : 45', '12 : 00',
        '12 : 15', '12 : 30', '12 : 45', '13 : 00', '13 : 15', '13 : 30', '13 : 45', '14 : 00', '14 : 15', '14 : 30', '14 : 45', '15 : 00',
        '15 : 15', '15 : 30', '15 : 45', '15 : 00', '15 : 15', '15 : 30', '15 : 45', '16 : 00', '16 : 15', '16 : 30', '16 : 45', '17 : 00',
        '17 : 15', '17 : 30', '17 : 45', '18 : 00', '18 : 15', '18 : 30', '18 : 45', '19 : 00', '19 : 15', '19 : 30', '19 : 45', '20 : 00',
        '20 : 15', '20 : 30', '20 : 45', '21 : 00', '21 : 15', '21 : 30', '21 : 45', '22 : 00', '22 : 15', '22 : 30', '22 : 45', '23 : 00',
        '23 : 15', '23 : 30', '23 : 45']
    $.each(time, function (key, value) {
        $('#drop-time').append($("<option/>", { value: value, text: value }));
    });
    $.each(time, function (key, value) {
        $('#round-time').append($("<option/>", { value: value, text: value }));
    });
    $.each(time, function (key, value) {
        $('#pack-time').append($("<option/>", { value: value, text: value }));
    });

$("#dropTrip").on('click', function () {
    $(this).addClass('trip-options-active');
    $(this).next().removeClass('trip-options-active');
    $(this).next().next().removeClass('trip-options-active');
    $('#dropTripStepper').show();
    $('#roundTripStepper').hide();
    $('#packageStepper').hide();
    $('#dSedan').attr('src', "assets/images/sedan_yellow.png");
    $('#dSedan').siblings('p').css('color', 'black');
    resetDrop();
    resetRound();
    resetPack();
});
$("#roundTrip").on('click', function () {
    $(this).addClass('trip-options-active');
    $(this).prev().removeClass('trip-options-active');
    $(this).next().removeClass('trip-options-active');
    $('#dropTripStepper').hide();
    $('#packageStepper').hide();
    $('#roundTripStepper').show();
    $('#dSedanR').attr('src', "assets/images/sedan_yellow.png");
    $('#dSedanR').siblings('p').css('color', 'black');
    resetRound();
    resetDrop();
    resetPack();
});
$("#packages").on('click', function () {
    $(this).addClass('trip-options-active');
    $(this).prev().removeClass('trip-options-active');
    $(this).prev().prev().removeClass('trip-options-active');
    $('#packageStepper').show();
    $('#estimate-pkg').hide();
    $('#roundTripStepper').hide();
    $('#dropTripStepper').hide();
    resetRound();
    resetDrop();
    resetPack();
});
// Image swap
$("#dHatch").on('click', function ()  {
    if ($(this).attr("src") == 'assets/images/hatch_black.png') {
        $("#estimate .estamount").html("<img src='images/loading.gif' />");
        $(this).attr("src", "assets/images/hAtch_yellow.png");
        $('#dSedan').attr("src", "assets/images/sedan_black.png");
        $('#dSuv').attr("src", "assets/images/suv_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_hd').prop('checked', true);
        $('.taxi_sd').prop('checked', false);
        $('.taxi_suvd').prop('checked', false);
        $('#dSedan').siblings('p').css('color', '#a6a6a6');
        $('#dSuv').siblings('p').css('color', '#a6a6a6');
        $('#car_type').val('558784c79fb9c');
        $('#rpkm').val('11');
        dataFrom = $('#drop-from-loc').val(); 
        dataTo = $('#drop-to-loc').val();
        if (dataFrom != '' && dataTo != '') {
            GetEstimate($('#rpkm').val(),$('#trip_mode').val(),1);
        }
    }
});


$("#dSedan").on('click', function ()  {
    if ($(this).attr("src") == 'assets/images/sedan_black.png') {
        $("#estimate .estamount").html("<img src='images/loading.gif' />");
        $(this).attr("src", "assets/images/sedan_yellow.png");
        $('#dHatch').attr("src", "assets/images/hatch_black.png");
        $('#dSuv').attr("src", "assets/images/suv_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_hd').prop('checked', false);
        $('.taxi_sd').prop('checked', true);
        $('.taxi_suvd').prop('checked', false);
        $('#dHatch').siblings('p').css('color', '#a6a6a6');
        $('#dSuv').siblings('p').css('color', '#a6a6a6');
        $('#car_type').val('558784ee2e854');
        $('#rpkm').val('12');
        dataFrom = $('#drop-from-loc').val(); 
        dataTo = $('#drop-to-loc').val();
       
        if (dataFrom != '' && dataTo != '') {
            GetEstimate($('#rpkm').val(),$('#trip_mode').val(),1);
        }
    }
});
$("#dSuv").on('click', function ()  {
    if ($(this).attr("src") == 'assets/images/suv_black.png') {
        $("#estimate .estamount").html("<img src='images/loading.gif' />");
        $(this).attr("src", "assets/images/suv_yellow.png");
        $('#dSedan').attr("src", "assets/images/sedan_black.png");
        $('#dHatch').attr("src", "assets/images/hatch_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_hd').prop('checked', false);
        $('.taxi_sd').prop('checked', false);
        $('.taxi_suvd').prop('checked', true);
        $('#dSedan').siblings('p').css('color', '#a6a6a6');
        $('#dHatch').siblings('p').css('color', '#a6a6a6');
        $('#car_type').val('5587850448ce6');
        $('#rpkm').val('15');
        dataFrom = $('#drop-from-loc').val(); 
        dataTo = $('#drop-to-loc').val();
        if (dataFrom != '' && dataTo != '') {
            GetEstimate($('#rpkm').val(),$('#trip_mode').val(),1);
        }
    }
});

// Image swap Round Trip
$("#dHatchR").click(function () {
    if ($(this).attr("src") == 'assets/images/hatch_black.png') {
        $("#estimate-round .estamount").html("<img src='images/loading.gif' />");
        $(this).attr("src", "assets/images/hAtch_yellow.png");
        $('#dSedanR').attr("src", "assets/images/sedan_black.png");
        $('#dSuvR').attr("src", "assets/images/suv_black.png");
        $('#tempR').attr("src", "assets/images/tempo_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_hr').prop('checked', true);
        $('.taxi_sd').prop('checked', false);
        $('.taxi_suvd').prop('checked', false);
        $('.taxi_tr').prop('checked', false);
        $('#dSedanR').siblings('p').css('color', '#a6a6a6');
        $('#dSuvR').siblings('p').css('color', '#a6a6a6');
        $('#tempR').siblings('p').css('color', '#a6a6a6');
        $('#Rcar_type').val('558784c79fb9c');
        $('#rpkmrt').val('8.25');
        dataFrom = $('#round-from-loc').val();
        dataTo = $('#round-to-loc').val();
        if (dataFrom != '' && dataTo != '') {
            GetEstimateRT($('#rpkmrt').val(),2,$('#round-days').val());
            $('#estimate-round, .book-now-round').show();
        }
    }
});
$("#dSedanR").click(function () {
    if ($(this).attr("src") == 'assets/images/sedan_black.png') {
        $("#estimate-round .estamount").html("<img src='images/loading.gif' />");
        $(this).attr("src", "assets/images/sedan_yellow.png");
        $('#dHatchR').attr("src", "assets/images/hatch_black.png");
        $('#dSuvR').attr("src", "assets/images/suv_black.png");
        $('#tempR').attr("src", "assets/images/tempo_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_hr').prop('checked', false);
        $('.taxi_sd').prop('checked', true);
        $('.taxi_suvd').prop('checked', false);
        $('.taxi_tr').prop('checked', false);
        $('#dHatchR').siblings('p').css('color', '#a6a6a6');
        $('#dSuvR').siblings('p').css('color', '#a6a6a6');
        $('#tempR').siblings('p').css('color', '#a6a6a6');
        $('#Rcar_type').val('558784ee2e854');
        $('#rpkmrt').val('10');
        dataFrom = $('#round-from-loc').val();
        dataTo = $('#round-to-loc').val();
        if (dataFrom != '' && dataTo != '') {
            GetEstimateRT($('#rpkmrt').val(),2,$('#round-days').val());
            $('#estimate-round, .book-now-round').show();
        }
    }
});
$("#dSuvR").click(function () {
    if ($(this).attr("src") == 'assets/images/suv_black.png') {
        $("#estimate-round .estamount").html("<img src='images/loading.gif' />");
        $(this).attr("src", "assets/images/suv_yellow.png")
        $('#dSedanR').attr("src", "assets/images/sedan_black.png");
        $('#dHatchR').attr("src", "assets/images/hatch_black.png");
        $('#tempR').attr("src", "assets/images/tempo_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_hr').prop('checked', false);
        $('.taxi_sd').prop('checked', false);
        $('.taxi_suvd').prop('checked', true);
        $('.taxi_tr').prop('checked', false);
        $('#dSedanR').siblings('p').css('color', '#a6a6a6');
        $('#dHatchR').siblings('p').css('color', '#a6a6a6');
        $('#tempR').siblings('p').css('color', '#a6a6a6');
        $('#Rcar_type').val('5587850448ce6');
        $('#rpkmrt').val('13');
        dataFrom = $('#round-from-loc').val();
        dataTo = $('#round-to-loc').val();
        if (dataFrom != '' && dataTo != '') {
            GetEstimateRT($('#rpkmrt').val(),2,$('#round-days').val());
            $('#estimate-round, .book-now-round').show();
        }
    }
});
$("#tempR").click(function () {
    if ($(this).attr("src") == 'assets/images/tempo_black.png') {
        $("#estimate-round .estamount").html("<img src='images/loading.gif' />");
        $(this).attr("src", "assets/images/tempo_yellow.png")
        $('#dSedanR').attr("src", "assets/images/sedan_black.png");
        $('#dHatchR').attr("src", "assets/images/hatch_black.png");
        $('#dSuvR').attr("src", "assets/images/suv_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_hr').prop('checked', false);
        $('.taxi_sd').prop('checked', false);
        $('.taxi_suvd').prop('checked', false);
        $('.taxi_tr').prop('checked', true);
        $('#dSedanR').siblings('p').css('color', '#a6a6a6');
        $('#dHatchR').siblings('p').css('color', '#a6a6a6');
        $('#Rcar_type').val('5587850448ce6');
        $('#rpkmrt').val('15');
        dataFrom = $('#round-from-loc').val();
        dataTo = $('#round-to-loc').val();
        if (dataFrom != '' && dataTo != '') {
            GetEstimateRT($('#rpkmrt').val(),2,$('#round-days').val());
            $('#estimate-round, .book-now-round').show();
        }
    }
});

//  
$("#dSedanP").click(function () {
    if ($(this).attr("src") == 'assets/images/sedan_black.png') {
        $(this).attr("src", "assets/images/sedan_yellow.png")
        $('#dSuvP').attr("src", "assets/images/suv_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_sp').prop('checked', true);
        $('.taxi_suvp').prop('checked', false);
        $('#dSuvP').siblings('p').css('color', '#a6a6a6');
    }
});
$("#dSuvP").click(function () {
    if ($(this).attr("src") == 'assets/images/suv_black.png') {
        $(this).attr("src", "assets/images/suv_yellow.png")
        $('#dSedanP').attr("src", "assets/images/sedan_black.png");
        $(this).siblings('p').css('color', 'black');
        $('.taxi_sp').prop('checked', false);
        $('.taxi_suvp').prop('checked', true);
        $('#dSedanP').siblings('p').css('color', '#a6a6a6');
    }
});

function resetDrop() {
    $('#drop_trip')[0].reset();
    /*
    $('#dHatch').attr('src', "assets/images/hAtch_yellow.png");
    $('#dHatch').siblings('p').css('color', 'black');
    */
    $('#dSedan').attr("src", "assets/images/sedan_yellow.png");
    $('#dSuv').attr("src", "assets/images/suv_black.png");
    $('#dSedan').siblings('p').css('color', '#a6a6a6');
    $('#dSuv').siblings('p').css('color', '#a6a6a6');
    $('.lab-from, .lab-to, .lab-date, .lab-time').css('visibility', 'hidden');
    $('#addNameLabel, #addTelLabel, #addEmailLabel, #pickAddLabel, #dropAddLabel').css('visibility', 'hidden');
    $('#estimate, .book-now, .date-time, #addressSection, .hktext').hide();
}
function resetRound() {
    $('#round_trip')[0].reset();
    /*
    $('#dHatchR').attr('src', "assets/images/hAtch_yellow.png");
    $('#dHatchR').siblings('p').css('color', 'black');
    */
    $('#dSedanR').attr("src", "assets/images/sedan_yellow.png");
    $('#dSuvR').attr("src", "assets/images/suv_black.png");
    /*$('#tempR').attr("src", "assets/images/tempo_black.png");*/
    $('#dSedanR').siblings('p').css('color', '#a6a6a6');
    $('#dSuvR').siblings('p').css('color', '#a6a6a6');
    /*$('#tempR').siblings('p').css('color', '#a6a6a6');*/
    $('.lab-from, .lab-to, .lab-date-round, .lab-time-round').css('visibility', 'hidden');
    $('#addNameLabel-round, #addTelLabel-round, #addEmailLabel-round, #pickAddLabel-round, #dropAddLabel-round').css('visibility', 'hidden');
    $('.lab-pick, .lab-pack').css('visibility', 'hidden');
    $('#estimate-round, .book-now-round, .date-time-days, #addressSection-round, .hktext').hide();
}
function resetPack() {
    $('#pack_trip')[0].reset();
    $('#dSedanP').attr("src", "assets/images/sedan_yellow.png");
    $('#dSedanP').siblings('p').css('color', 'black');
    $('#dSuvP').attr("src", "assets/images/suv_black.png");
    $('#dSuvP').siblings('p').css('color', '#a6a6a6');
    $('.lab-date-pack, .lab-time-pack').css('visibility', 'hidden');
    $('#addNameLabel-pack, #addTelLabel-pack, #addEmailLabel-pack, #pickAddLabel-pack').css('visibility', 'hidden');
    $('.car-collection-pack, .book-now-pack, .date-time-pack, #addressSection-pack, hktext').hide();
}

//
function sendsendLink() {
    $.post( "", data, function( data ) {
      });
}

$("#confirm_dt").on("click", function(e){
    //alert($(".know-drop").val());
    e.preventDefault();
    var dtj = $('#drop-date').val();
    var typo = true;
    $("#addName").val(($("#addName").val()).trim());
    $("#addEmail").val(($("#addEmail").val()).trim());
    if($("#drop-from-loc").val()==""){
        alert("Please select a value for From city!");
        typo = false;
    } else if ($("#drop-to-loc").val()==""){
        alert("Please select a value for To city!");
        typo = false;
    } else if ($("#drop-date").val()==""){
        alert("Please select a date for journey!");
        typo = false;
    } else if ($("#drop-time").val()==""){
        alert("Please select a time for journey!");
        typo = false;
    } else if (($("#addName").val()).trim()==""){
        alert("Please enter your Name!");
        typo = false;
    } else if ($("#addTel").val()==""|| $("#addTel").val().length != 10){
        alert("Please enter your Mobile No.!");
        typo = false;
    } else if ($("#addEmail").val()==""){
        alert("Please enter your Email ID!");
        typo = false;
    } else if (($("#pickAdd").val()).trim()==""){
        alert("Please enter a Pickup Address!");
        typo = false;
    } else if (($("#dropAdd").val()).trim()==""){
        alert("Please enter a Drop Address!");
        typo = false;
    } else if($(".know-drop").val() == "") {
        alert("Please select an option for 'How do you know Droptaxi'!");	
        typo = false;
    } else if($('#drop-from-loc').val()=="Chennai" && (dtj=="2020-01-13" || dtj=="2020-01-14")){
        alert("Due to very heavy one way traffic from Chennai, unable to confirm online booking. Please contact customer care.");
        typo = false;
    } else {}
    
    if ($("#addTelAlt").val()!=""){
        if($("#addTelAlt").val().length != 10){
            alert("Please enter a valid Alternate Mobile No.!");
            typo = false;
        }
    }
    if ($("#isnewuser").val()==1){
        if ($("#referredby").val()!="" && $("#referredby").val().length != 10){
            alert("Please enter a valid Referrer Mobile No.!");
            typo = false;
        }
    } 
    if($('#redeemlimit').val() < $('#redeemamount').val()){
        alert("Redeem amount is higher than the limit available!");
        typo = false;
    }
    if($(".know-drop").val()=='9' && $(".hktext").val()==""){
        alert("Enter value for Other option...");
        typo = false;
    }
    
    if(typo){
        if($("#drop_trip .check_i_accept").prop("checked")) {
            $("#drop_trip").submit();
        } else {
            alert("Accept the Terms and Conditions!");
        }
    }
});

$("#confirm_rt").on("click", function(e){
    e.preventDefault();
    var typo = true;
    $("#addName-round").val(($("#addName-round").val()).trim());
    $("#addEmail-round").val(($("#addEmail-round").val()).trim());
    if($("#round-from-loc").val()==""){
        alert("Please select a value for From city!");
        typo = false;
    } else if ($("#round-to-loc").val()==""){
        alert("Please select a value for To city!");
        typo = false;
    } else if ($("#round-date").val()==""){
        alert("Please select a date for journey!");
        typo = false;
    } else if ($("#round-time").val()==""){
        alert("Please select a time for journey!");
        typo = false;
    } else if (($("#addName-round").val()).trim()==""){
        alert("Please enter your Name!");
        typo = false;
    } else if ($("#addTel-round").val()==""|| $("#addTel-round").val().length != 10){
        alert("Please enter your Mobile No.!");
        typo = false;
    } else if (($("#addEmail-round").val()).trim()==""){
        alert("Please enter your Email ID!");
        typo = false;
    } else if (($("#pickAdd-round").val()).trim()==""){
        alert("Please enter a Pickup Address!");
        typo = false;
    } else if($(".know-round").val() == "") {
        alert("Please select an option for 'How do you know Droptaxi'!");	
        typo = false;
    } else {}
    
    if ($("#addTelAlt-round").val()!=""){
        if($("#addTelAlt-round").val().length != 10){
            alert("Please enter a valid Alternate Mobile No.!");
            typo = false;
        }
    } 
    if ($("#isnewuser").val()==1){
        if ($("#referredby-round").val()!="" && $("#referredby-round").val().length != 10){
            alert("Please enter a valid Referrer Mobile No.!");
            typo = false;
        }
    } 
    if($('#redeemlimit-round').val() < $('#redeemamount-round').val()){
        alert("Redeem amount is higher than the limit available!");
        typo = false;
    }
    if($(".know-round").val()=='9' && $(".hktext").val()==""){
        alert("Enter value for Other option...");
        typo = false;
    }
    
    if(typo){
        if($("#round_trip .check_i_accept").prop("checked")) {
            $("#round_trip").submit();
        } else {
            alert("Accept the Terms and Conditions!");
        }
    }
});

$("#confirm_pk").on("click", function(e){
    e.preventDefault();
    var typo = true;
    $("#addName-pack").val(($("#addName-pack").val()).trim());
    $("#addEmail-pack").val(($("#addEmail-pack").val()).trim());
    if($("#pack-to-loc").val()==""){
        alert("Please select a Package!");
        typo = false;
    } else if ($("#pack-from-loc").val()==""){
        alert("Please select a value for From city!");
        typo = false;
    }else if ($("#pack-date").val()==""){
        alert("Please select a date for journey!");
        typo = false;
    } else if ($("#pack-time").val()==""){
        alert("Please select a time for journey!");
        typo = false;
    } else if ($("#addTel-pack").val()==""|| $("#addTel-pack").val().length != 10){
        alert("Please enter your Mobile No.!");
        typo = false;
    } else if (($("#addName-pack").val()).trim()==""){
        alert("Please enter your Name!");
        typo = false;
    } else if (($("#addEmail-pack").val()).trim()==""){
        alert("Please enter your Email ID!");
        typo = false;
    } else if (($("#pickAdd-pack").val()).trim()==""){
        alert("Please enter a Pickup Address!");
        typo = false;
    } else if($(".know-pack").val() == "") {
        alert("Please select an option for 'How do you know Droptaxi'!");	
        typo = false;
    } else {}
    
    if ($("#addTelAlt-pack").val()!=""){
        if($("#addTelAlt-pack").val().length != 10){
            alert("Please enter a valid Alternate Mobile No.!");
            typo = false;
        }
    } 
    if ($("#isnewuser").val()==1){
        if ($("#referredby-pack").val()!="" && $("#referredby-pack").val().length != 10){
            alert("Please enter a valid Referrer Mobile No.!");
            typo = false;
        }
    }
    if($('#redeemlimit-pack').val() < $('#redeemamount-pack').val()){
        alert("Redeem amount is higher than the limit available!");
        typo = false;
    }
    if($(".know-pack").val()=='9' && $(".hktext").val()==""){
        alert("Enter value for Other option...");
        typo = false;
    }
    if(typo){
        if($("#pack_trip .check_i_accept").prop("checked")) {
            $("#pack_trip").submit();
        } else {
            alert("Accept the Terms and Conditions!");
        }
    }
});

$("#registerbtn").on("click", function(e){
    e.preventDefault();
    var typo = true;
    if(($("#CustName").val()).trim()==""){
        $("#register_form .emptyName").show();
        typo = false;
    } else {$("#register_form .emptyName").hide();$("#CustName").val(($("#CustName").val()).trim());}
    if($("#CustAltContactNo").val()==""){
        $("#register_form .emptyAltMobile").show();
        typo = false;
    } else {$("#register_form .emptyAltMobile").hide();}
    if($("#CustAltContactNo").val().length != 10){
        $("#register_form .emptyAltMobile").html("Mobile no. should be 10 digits");
        $("#register_form .emptyAltMobile").show();
        typo = false;
    } else {$("#register_form .emptyAltMobile").hide();}
    if(($("#CustEmailId").val()).trim()=="" || ($("#CustEmailId").val()).includes('.')==false || ($("#CustEmailId").val()).includes("@")==false){
        $("#register_form .emptyEmail").show();
        typo = false;
    } else {$("#register_form .emptyEmail").hide();}
    if(($("#CustAddress").val()).trim()==""){
        $("#register_form .emptyAddress").show();
        typo = false;
    } else {$("#register_form .emptyAddress").hide();}
    if($("#CustMobileNo").val()==""){
        $("#register_form .emptyMobile").show();
        typo = false;
    } else {$("#register_form .emptyMobile").hide();}
    if($("#CustMobileNo").val().length != 10){
        $("#register_form .emptyMobile").html("Mobile no. should be 10 digits");
        $("#register_form .emptyMobile").show();
        typo = false;
    } else {$("#register_form .emptyMobile").show();}
    if($("#CustCity").val()==""){
        $("#register_form .emptyCity").show();
        typo = false;
    } else {$("#register_form .emptyCity").hide();}
    if($("#pwd1").val()==""){
        $("#register_form .emptyPassword").show();
        typo = false;
    } else {$("#register_form .emptyPassword").hide();}
    if($("#CustState").val()==""){
        $("#register_form .emptyState").show();
        typo = false;
    } $("#register_form .emptyState").hide();
    if($("#pwd2").val()==""){
        $("#register_form .emptyConfirmPassword").show();
        typo = false;
    } else {$("#register_form .emptyConfirmPassword").hide();}
    if($("#CustPin").val()==""){
        $("#register_form .emptyPin").show();
        typo = false;
    } else {$("#register_form .emptyPin").hide();}
    if($("#pwd1").val()!=$("#pwd2").val()){
        $("#register_form .mismatch").show();
        typo = false;
    } else {$("#register_form .mismatch").hide();}
    if(typo){
        if($("#register_form .check_i_accept").prop("checked")) {
            $("#register_form").submit();
        } else {
            $("#register_form .rd").hide();
            $("#register_form .emptyTerms").show();
        }
    }
});

});