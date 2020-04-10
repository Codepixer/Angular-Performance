<?php
session_start();
include 'includes/functions.php';
	 
		//This snippet is to get cities for dropdown
		$link = mysqli_connect(DB_SERVER, DB_SERVER_USERNAME, DB_SERVER_PASSWORD, DB_DATABASE);

		if (!$link) {
			die('Could not connect: ' . mysqli_connect_error());
		}

		if(isset($_REQUEST['dropmetaxi'])){
			//Process hit counts here.
			RecordHits("dropmetaxi");
			setcookie("hitsfrom", "dropmetaxi", time() + (86400 * 30), "/");
		}
		
		if(isset($_REQUEST['vikatan'])){
			//Process hit counts here.
			RecordHits("Vikatan");
			setcookie("hitsfrom", "Vikatan", time() + (86400 * 30), "/");
		}
		if(isset($_REQUEST['dinamalar'])){
			//Process hit counts here.
			RecordHits("Dinamalar");
			setcookie("hitsfrom", "Dinamalar", time() + (86400 * 30), "/");
		}
		if(isset($_REQUEST['tnm'])){
			//Process hit counts here.
			RecordHits("The News Minute");
			setcookie("hitsfrom", "tnm", time() + (86400 * 30), "/");
		}
		if(isset($_REQUEST['dailyhunt'])){
			//Process hit counts here.
			RecordHits("Daily Hunt");
			setcookie("hitsfrom", "DailyHunt", time() + (86400 * 30), "/");
		}
		if(isset($_REQUEST['facebook'])){
			//Process hit counts here.
			RecordHits("Facebook");
			setcookie("hitsfrom", "Facebook", time() + (86400 * 30), "/");
		}
		if(isset($_REQUEST['twitter'])){
			//Process hit counts here.
			RecordHits("Twitter");
			setcookie("hitsfrom", "Twitter", time() + (86400 * 30), "/");
		}
		if(isset($_REQUEST['instagram'])){
			//Process hit counts here.
			RecordHits("Instagram");
			setcookie("hitsfrom", "Instagram", time() + (86400 * 30), "/");
		}
		
		$referredby = $_REQUEST['refby'];
	if($link){
		// gets the FROM cities for the dropdown
		$sqlselectfrom = "SELECT CM_CITY_CODE, CM_CITY_NAME ".
					 "FROM CITY_MASTER ".
					 "WHERE CM_DT_PICKUP_CITY = 1 ORDER BY CM_CITY_NAME ASC ;";

		$resultfrom = mysqli_query($link, $sqlselectfrom);
		if(!$resultfrom)
		{
		  die('Could not select data: ' . mysqli_error($link));
		} else{
			$fromcityhtml = '<option value="">From</option>';
		   while($rowfrom = mysqli_fetch_array($resultfrom)){
			  $fromcityhtml .= '<option value="'.$rowfrom['CM_CITY_NAME'].'">'.$rowfrom['CM_CITY_NAME'].'</option>';
		   }
		}
		
		// gets the TO cities for the dropdown
		$sqlselectrt = "SELECT CM_CITY_CODE, CM_CITY_NAME ".
					 "FROM CITY_MASTER ".
					 "WHERE CM_DROP_CITY = 1 ORDER BY CM_CITY_NAME ASC ;";

		$resultrt = mysqli_query($link, $sqlselectrt);
		if(!$resultrt)
		{
		  die('Could not select data: ' . mysqli_error($link));
		} else{
			$tocityhtml = '<option value="">To</option>';
		   while($row = mysqli_fetch_array($resultrt)){
			  $tocityhtml .= '<option value="'.$row['CM_CITY_NAME'].'">'.$row['CM_CITY_NAME'].'</option>';
		   }
		}
		
		//gets package trip details
		$sqlpkg = "SELECT P_ID, P_NAME, P_KMS_LIMIT, P_HRS_LIMIT, P_PRICE, VTM_VEHICLE_TYPE "
				. "FROM PACKAGES "
				. "INNER JOIN VEHICLE_TYPE_MASTER VTM ON VTM.VTM_VEHICLE_TYPEID = P_VEHICLE_TYPE_ID "
				. "WHERE P_ISACTIVE = 1 AND P_TYPE = 'Outstation' ORDER BY P_NAME;";
		$resultpkg = mysqli_query($link, $sqlpkg);
		if(!$resultpkg)
		{
		  die('Could not select data: ' . mysqli_error($link));
		} else {
			$typepkghtml = '<option value="">Select Outstation Package</option>';
			while($rowpkg = mysqli_fetch_array($resultpkg)){
				if($rowpkg['P_ID']==7 || $rowpkg['P_ID']==8 || $rowpkg['P_ID']==9 || $rowpkg['P_ID']==10){
					$typepkghtml .= '<option class="pkgoptions" value="'.$rowpkg['P_ID'].'">'.$rowpkg['P_NAME'].' - '.$rowpkg['VTM_VEHICLE_TYPE'].' -  '.$rowpkg['P_KMS_LIMIT'].' kms - '.$rowpkg['P_HRS_LIMIT'].' hrs - Rs. '.$rowpkg['P_PRICE'].'</option>';
				} else {
					$typepkghtml .= '<option class="pkgoptions" value="'.$rowpkg['P_ID'].'">'.$rowpkg['P_NAME'].' - '.$rowpkg['VTM_VEHICLE_TYPE'].' -  Rs. '.$rowpkg['P_PRICE'].'</option>';
				}
			}
		}
		
		//gets local package trip details
		$sqllocalpkg = "SELECT P_ID, P_NAME, P_KMS_LIMIT, P_HRS_LIMIT, P_PRICE, VTM_VEHICLE_TYPE "
				. "FROM PACKAGES "
				. "INNER JOIN VEHICLE_TYPE_MASTER VTM ON VTM.VTM_VEHICLE_TYPEID = P_VEHICLE_TYPE_ID "
				. "WHERE P_TYPE = 'Local' ORDER BY P_HRS_LIMIT,P_ID;";
		$resultlocalpkg = mysqli_query($link, $sqllocalpkg);
		if(!$resultlocalpkg)
		{
		  die('Could not select data: ' . mysqli_error($link));
		} else {
			$localpkghtml = '<option value="">Select Local Package</option>';
			while($rowlocalpkg = mysqli_fetch_array($resultlocalpkg)){
					$localpkghtml .= '<option class="pkgoptions" value="'.$rowlocalpkg['P_ID'].'">'.$rowlocalpkg['P_NAME'].' -  Rs. '.$rowlocalpkg['P_PRICE'].'</option>';
			}
		}
		
		
		
		$dthatchrate = GetRPKM("558784c79fb9c","Drop Trip");
		$dtsedrate = GetRPKM("558784ee2e854","Drop Trip");
		$dtsuvrate = GetRPKM("5587850448ce6","Drop Trip");
		$rthatchrate = GetRPKM("558784c79fb9c","Round Trip");
		$rtsedrate = GetRPKM("558784ee2e854","Round Trip");
		$rtsuvrate = GetRPKM("5587850448ce6","Round Trip");
		$rttemprate = GetRPKM("58c902fd2ad15","Round Trip");
	}
	
	$fnews = GetFlashNews();
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="description" content="Drop taxi provides one way and round trip outstation taxi service at affordable price."/>
	<meta name='keywords' content="Drop taxi, Drop Trips, One way Taxi ,One way Cabs,Intercity Drop Cabs, Drop Taxi Chennai, Online Cab Booking, Intercity Drop taxi Services, Online Taxi Booking, Airport Taxi Services, One way and Round Trips, Chennai to Bangalore Drop taxi, Chennai to Vellore Drop taxi, Chennai to Pondicherry Drop taxi, Chennai to Bangalore Taxi, Chennai to Bangalore Cab, Chennai to Vellore Taxi, Chennai to Pondicherry Taxi, Chennai to Bangalore Cabs, Chennai to Vellore Cabs, Chennai to Pondi Cabs, Chennai to Coimbatore Drop taxi, Chennai to Trichy Taxi, Chennai to Salem Taxi, Chennai to Neyveli Taxi, Chennai to Neyveli Cabs, Out Station Taxi service, Chennai to  Trichy Cab, chennai to  Neyveli cab, Chennai to  Trichy taxi, Chennai to  Neyveli taxi, Chennai to  Madurai Taxi, Chennai to  Madurai Cab, droptaxi trichy, drop taxi, drop taxi coimbatore" />
	
	<title>Drop taxi - Inter City One Way Taxi Service @ One Way Fare</title>
	<link rel="stylesheet" href="css/fontawesome-all.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/slick.min.css">
	<link rel="stylesheet" href="css/style.min.css">
	<style>
		.pkgoptions {color:black;font-size:20px;}
		#outstationtext, #localtext {
			padding:4px;
			padding-left: 10px;
			padding-right: 10px;
			border: 1px solid orange; border-radius:15px;
			cursor: pointer;
			font-weight: bold;

		}
		#outstationtext.active{background-color:orange;}
		#localtext.active{background-color:orange;}
	</style>
        <?php require_once("includes/ldjson.php"); ?>
</head>

<body>
<?php 
require_once("includes/header_new.php"); 
?>
	<?php if($fnews['flashnewsdisp']=='T'){?>
	<div class="container-fluid" style="z-index: 6000;/*position: fixed;*/padding-top: 6.5%;padding-bottom:0;padding-left:0;padding-right:0;">
					<div class="row">
						<div class="col-12 col-md-12">
							<div id="flashnews" class="col-xs-12" style="background-color: #fbfbfb; width:100%;padding:5px; font-weight: bold; font-size: 14px; text-align: center; border: 1px solid #fab217; color: #<?php echo $fnews['flashnewsclr'];?>;">
								<?php echo $fnews['flashnews'];?>
							</div>
						</div>
					</div>
	</div>
	<?php } ?>
	<div class="container-fluid section">
		<div class="row justify-content-sm-center trip-options">
			<div class="col-12 col-md-6 trips">
				<span id="dropTrip">Drop Trip</span>
				<span id="roundTrip">Round Trip</span>
				<span id="packages">Packages</span>
			</div>
		</div>
		<div id="dropTripStepper">
			<form id="drop_trip" name="main_booking_form" action="processing_payment.php" method="POST">
				<div class="row">
					<input type="hidden" value="1" id="trip_mode" name="trip_mode" />
					<div class="col">
						<label for="drop-from-loc" class="lab-from">From</label>
					</div>
					<div class="col">
						<label for="drop-to-loc" class="lab-to">To</label>
					</div>
				</div>
				<div class="row justify-content-sm-center ">
					<div class="col-6 text-right">
						<select id="drop-from-loc" name="fromplace" class="drop-from" required>
							<?php echo $fromcityhtml; ?>
						</select>
					</div>
					<div class="col-6">
						<select id="drop-to-loc" name="toplace" class="drop-to" required>
							<?php echo $tocityhtml; ?>
						</select>
					</div>

				</div>
				<div class="row justify-content-md-center car-collection">
					<!--
					<div class="col-12 col-md-2 car-img-group">
						<img src="assets/images/hatch_black.png" alt="" id="dHatch">
						<p class="hatch">Hatchback</p>
						<p>&#8377;<?php echo number_format($dthatchrate);?>/km</p>
					</div>
					<div class="col-md-1"></div>
					-->
					<div class=" col-12 col-md-2 car-img-group" style="text-align:center;">
						<img src="assets/images/sedan_black.png" alt="Droptaxi Sedan (4+1)" id="dSedan">
						<p class="sedan">Sedan</p>
						<p>&#8377;<?php echo number_format($dtsedrate);?>/km</p>
					</div>
					<div class="col-md-1"></div>
					<div class=" col-12 col-md-2 car-img-group" style="text-align:center;">
						<img src="assets/images/suv_black.png" alt="Droptaxi MUV (7+1)" id="dSuv">
						<p class="suv">SUV/MUV</p>
						<p>&#8377;<?php echo number_format($dtsuvrate);?>/km</p>
					</div>
					<!-- Hidden Input -->
					<input type="hidden" name="vehicletypeid" value="558784ee2e854" id="car_type"/>
					<input type="hidden" name="journeytype" value="Drop Trip" id="journey_type"/>
					<input type="hidden" name="rpkm" value="<?php echo $dtsedrate;?>" id="rpkm"/>
					<input type="hidden" name="tripamount" id="tripamount"/>
				</div>
				<div class="row justify-content-sm-center" id="estimate">
					<div class="estim-wrap estimate-fullview">
						<div class="text-center">
							<span id="estdistancedt"></span>
							<h5>Estimate: &#8377;<span class="estamount" style="font-weight:bold;font-size:24px;padding:10px;"></span>
								<sup>*</sup>
							</h5>
							<span class="estdtbreakup"></span>
							<p class="estterms">
								<sup>*</sup>Inclusive of GST. The actual bill might differ based on actual distance travelled,
								waiting time (for droptrips), hill-station charges &#38; inter-state permits.
								<span class="hardrouteterms"></span>
							</p>
							<span class="mesgpkg"></span>
						</div>
					</div>
				</div>
				<div class="row justify-content-center book-now">
					<input type="button" value="Book Now" class="nxt-btn" id="">
				</div>
				<div class="row">
					<div class="col">
						<label for="drop-date" class="lab-date">Date</label>
					</div>
					<div class="col">
						<label for="drop-time" class="lab-time">Time</label>
					</div>
				</div>
				<div class="row justify-content-center date-time">
					<input type="text" name="doj" id="drop-date" placeholder="Date" onfocus="(this.type='date')" class="choose-date" onkeydown="return false" required>
					<!-- <input type="text" name="" id="drop-time" placeholder="Time" onfocus="(this.type='Time')" class="choose-time" step="1800"> -->
					<select name="time" id="drop-time" class="drop-time-select" required>
						<option value="" selected>Time</option>
					</select>
				</div>
				<div class="row justify-content-center address-section" id="addressSection">
					<div class="col-md-8">
						<div class="col-md-12 add-label">
							<label for="addTel" id="addTelLabel">Mobile Number</label>
							<label for="addTelAlt" id="addTelAltLabel">Alternate Mobile Number</label>
						</div>
						<div class="col-md-12 text-center form-basic-det">
							<input type="tel" name="custMobile" id="addTel" placeholder="Mobile Number" maxlength="10" pattern="[6789][0-9]{9}" required>
							<input type="hidden" name="isnewuser" id="isnewuser" value="0" />
							<input type="tel" name="custAltMobile" id="addTelAlt" placeholder="Alternate Mobile Number" maxlength="10" pattern="[6789][0-9]{9}" required>
						</div>
						<div class="col-md-12 add-label">
							<label for="addName" id="addNameLabel">Name</label>                            
							<label for="addEmail" id="addEmailLabel">E-mail</label>
						</div>
						<div class="col-md-12 text-center form-basic-det">
							<input type="text" name="custName" id="addName" placeholder="Name" required>                                              <input type="email" name="custEmailId" id="addEmail" placeholder="E-mail" required>
						</div>
						<div class="row text-center textar-wrap">
							<div class="col-md-5 pick-add">
								<label for="pickAdd" id="pickAddLabel">Pick-up Address</label>
								<textarea placeholder="Pick-up Address" id="pickAdd" class="drop-textarea" name="pptaddr" required></textarea>
							</div>
							<div class="col-md-2"></div>
							<div class="col-md-5 drop-add">
								<label for="dropAdd" id="dropAddLabel">Drop Address</label>
								<textarea placeholder="Drop Address" id="dropAdd" class="drop-textarea" name="dptaddr" required></textarea>
							</div>
						</div>
						  <div class="row text-center textar-wrap">
							 <div class="col-md-4 text-center">
							 </div>
							<div class="col-md-4 text-left Remarks">
								<label for="Remarks" id="remarksAddLabel">Remarks</label>
								<textarea placeholder="We will pass it on to Admin team " id="Remarks" class="drop-textarea" name="customercomments" required></textarea>
							</div>
							<div class="col-md-4 text-center">
							 </div>
						</div>
						<div class="row text-center textar-wrap">
							<div id="referredbyblock" class="col-md-12 form-basic-det">
								<label for="referredby" id="referredbyLabel">Referred By</label>
								<input type="tel" name="referredby" id="referredby" value="<?php echo $referredby;?>" placeholder="Referrer Mobile No." maxlength="10"><br/>
								<span class="refmesg" style="display:none;color:red;">(Customer doesn't exist. Register this customer to get referral benefits.)</span>
							</div>
							<div id="redeemblock" class="col-md-12 form-basic-det">
								[Redeem Amount Available: <span id="redeemavailable"></span>]&nbsp;&nbsp;&nbsp;
								<label for="redeemamount" id="referredbyLabel">Redeem Amount</label>
								<input type="text" name="redeemamount" id="redeemamount" value="0" placeholder="Amount to be Redeemed">
								<input type="hidden" name="redeemlimit" id="redeemlimit" value="0"/>
							</div>
						</div>
					</div>
					<div class="col-md-12 text-center hkdiv">
						<span class="how-drop">How did you come to know about Droptaxi?</span>
						<select class="know-drop" name="howknow" required>
							<?php include 'includes/howdoyouknowoptions.php';?>
						</select>
						<input type="text" class="hktext" name="hktext" placeholder="Enter Other option..."/>
						<div class="checkbox-wrapper" style="margin-left:20px;">
							<input type="checkbox" name="i_accept" class="check_i_accept" value="yes">
							<span>I accept the Terms and Conditions.</span>
						</div>
					</div>
					<div class="col-md-12 text-center" style="margin-top: 3%; padding-bottom: 1%;">
						<input type="submit" value="Confirm" class="nxt-btn" id="confirm_dt">
					</div>
				</div>
			</form>
		</div>
		<!-- Round Trip Section -->
		<div id="roundTripStepper">
			<form id="round_trip" name="main_booking_form" action="processing_payment.php" method="POST">
				<div class="row">
					<div class="col">
						<label for="round-days" class="lab-days-round">No. of Days</label>
					</div>
				</div>
				<div class="row justify-content-center rt-days">
					<!--
					<input type="number" name="rtdays" id="round-days" pattern="[0-9]" onkeypress="return !(event.charCode == 46)" step="1" value="1" min="1" max="15" placeholder="No. of Days" class="choose-days">
					-->
					<select id="round-days" name="rtdays" class="choose-days" style="width:160px;" required>
						   <option value="1">1</option> 
						   <option value="2">2</option>
						   <option value="3">3</option>
						   <option value="4">4</option>
						   <option value="5">5</option>
						   <option value="6">6</option>
						   <option value="7">7</option>
						   <option value="8">8</option>
						   <option value="9">9</option>
						   <option value="10">10</option>
						   <option value="11">11</option>
						   <option value="12">12</option>
						   <option value="13">13</option>
						   <option value="14">14</option>
						   <option value="15">15</option>
					</select>
				</div>
				<div class="row" style="margin-top:15px;">
					<input type="hidden" value="2" id="trip_mode" name="trip_mode" />
					<div class="col">
						<label for="round-from-loc" class="lab-from">From</label>
					</div>
					<div class="col">
						<label for="round-to-loc" class="lab-to">To</label>
					</div>
				</div>
				<div class="row justify-content-sm-center ">
					<div class="col-6 text-right">
						<select id="round-from-loc" name="fromplace" class="drop-from" required>
							<?php echo $fromcityhtml; ?>
						</select>
					</div>
					<div class="col-6 text-left">
						<select id="round-to-loc" name="toplace" class="drop-to" required>
							<?php echo $tocityhtml; ?>
						</select>
					</div>
				</div>
				
				<div class="row justify-content-center car-collection-round">
					<!--
					<div class="car-img-group-round" style="cursor:pointer;">
						<img src="assets/images/hatch_black.png" alt="" id="dHatchR">
						<p class="hatch-R">Hatchback</p>
						<p>&#8377;<?php echo number_format($rthatchrate,2);?>/km</p>
					</div>
					-->
					<div class="car-img-group-round" style="cursor:pointer;">
						<img src="assets/images/sedan_black.png" alt="Droptaxi Sedan (4+1)" id="dSedanR">
						<p class="sedan-R">Sedan</p>
						<p>&#8377;<?php echo number_format($rtsedrate,2);?>/km</p>
					</div>
					<div class="car-img-group-round" style="cursor:pointer;">
						<img src="assets/images/suv_black.png" alt="Droptaxi MUV (7+1)" id="dSuvR">
						<p class="suv-R">SUV/MUV</p>
						<p>&#8377;<?php echo number_format($rtsuvrate,2);?>/km</p>
					</div>
					<!--
					<div class="car-img-group-round" style="cursor:pointer;">
						<img src="assets/images/tempo_black.png" alt="" id="tempR">
						<p class="tempo-R">Tempo Traveller</p>
						<p>&#8377;<?php echo number_format($rttemprate,2);?>/km</p>
					</div>
					-->
					<!-- Hidden Input -->
					<input type="hidden" name="vehicletypeid" value="558784ee2e854" id="Rcar_type"/>
					<input type="hidden" name="journeytype" value="Round Trip" id="journey_type"/>
					<input type="hidden" name="rpkmrt" value="<?php echo number_format($rtsedrate,2);?>" id="rpkmrt"/>
				</div>
				<div class="row justify-content-sm-center" id="estimate-round">
					<div class="estim-wrap-round estimate-fullview">
						<div class="text-center">
							<span id="estdistancert"></span>
							<h5>Estimate: &#8377;<span class="estamount" style="font-weight:bold;font-size:24px;padding:10px;"></span>
								<sup>*</sup>
							</h5>
							<span class="estrtbreakup"></span>
							<p class="estterms">
								<sup>*</sup>Inclusive of GST. The actual bill might differ based on actual distance travelled,
								hill-station charges &#38; inter-state permits.
							</p>
						</div>
					</div>
				</div>
				<div class="row justify-content-center book-now-round">
					<input type="button" value="Book Now" class="nxt-btn" id="">
				</div>
				<div class="row">
					<div class="col">
						<label for="round-date" class="lab-date-round">Date</label>
					</div>
					<div class="col">
						<label for="round-time" class="lab-time-round">Time</label>
					</div>
					<div class="col">
						
					</div>
				</div>
				<div class="row justify-content-center date-time-days">
					<input type="text" name="doj" id="round-date" placeholder="Date" onfocus="(this.type='date')" class="choose-date" onkeydown="return false" required>
					<select name="time" id="round-time" class="drop-time-select" required>
						<option value="" selected>Time</option>
					</select>
				</div>
				<div class="row justify-content-md-center address-section" id="addressSection-round">
					<div class="col-md-8">
						<div class="col-md-12 add-label">
							<label for="addTel-round" id="addTelLabel-round">Mobile Number</label>
							<label for="addTelAlt-round" id="addTelAltLabel-round">Alternate Mobile Number</label>
						</div>
						<div class="col-md-12 text-center form-basic-det">
							<input type="tel" name="custMobile" id="addTel-round" placeholder="Mobile Number" maxlength="10" pattern="[6789][0-9]{9}" required>
							<input type="hidden" name="isnewuser" id="isnewuser" value="0" />
							<input type="tel" name="custAltMobile" id="addTelAlt-round" placeholder="Alternate Mobile Number" maxlength="10" pattern="[6789][0-9]{9}" required>
						</div>
						<div class="col-md-12 add-label">
							<label for="addName" id="addNameLabel-round">Name</label>                            
							<label for="addEmail" id="addEmailLabel-round">E-mail</label>
						</div>
						<div class="col-md-12 text-center form-basic-det">
							<input type="text" name="custName" id="addName-round" placeholder="Name" required>
							<input type="email" name="custEmailId" id="addEmail-round" placeholder="E-mail" required>
						</div>
						<div class="row text-center textar-wrap">
							<div class="col-md-5 pick-add">
								<label for="pickAdd" id="pickAddLabel-round">Pick-up Address</label>
								<textarea placeholder="Pick-up Address" id="pickAdd-round" class="drop-textarea" name="pptaddr" required></textarea>
							</div>
							<div class="col-md-2"></div>
							<div class="col-md-5 drop-add">
								<label for="dropAdd" id="dropAddLabel-round">Drop Address</label>
								<textarea placeholder="Drop Address" id="dropAdd-round" class="drop-textarea" name="dptaddr"></textarea>
							</div>
						</div>
						<div class="row text-center textar-wrap">
							 <div class="col-md-4 text-center">
							 </div>
							<div class="col-md-4 text-left Remarks">
								<label for="Remarks" id="remarksAddLabel">Remarks</label>
								<textarea placeholder="Enter the visting places.We will pass it on to Admin team " id="Remarks" class="drop-textarea" name="customercomments" required></textarea>
							</div>
							<div class="col-md-4 text-center">
							 </div>
						</div>

						<div class="row text-center textar-wrap">
							<div id="referredbyblock-round" class="col-md-12 form-basic-det">
								<label for="referredby" id="referredbyLabel">Referred By</label>
								<input type="tel" name="referredby" id="referredby-round" value="<?php echo $referredby;?>" placeholder="Referrer Mobile No." maxlength="10"><br/>
								<span class="refmesg" style="display:none;color:red;">(Customer doesn't exist. Register this customer to get referral benefits.)</span>
							</div>
							<div id="redeemblock-round" class="col-md-12 form-basic-det">
								[Redeem Amount Available: <span id="redeemavailable-round"></span>]&nbsp;&nbsp;&nbsp;
								<label for="redeemamount" id="referredbyLabel">Redeem Amount</label>
								<input type="text" name="redeemamount" id="redeemamount-round" value="0" placeholder="Amount to be Redeemed">
								<input type="hidden" name="redeemlimit-round" id="redeemlimit-round" value="0"/>
							</div>
						</div>
					</div>
					
					<div class="col-md-12 text-center hkdiv">
						<span class="how-drop">How did you come to know about Droptaxi?</span>
						<select class="know-round" name="howknow" required>
							<?php include 'includes/howdoyouknowoptions.php';?>
						</select>
						<input type="text" class="hktext" name="hktext" placeholder="Enter Other option..."/>
						<div class="checkbox-wrapper" style="margin-left:20px;">
							<input type="checkbox" name="i_accept" class="check_i_accept" value="yes">
							<span>I accept the Terms and Conditions.</span>
						</div>
					</div>
					<div class="col-md-12 text-center" style="margin-top: 3%; padding-bottom: 1%">
						<input type="submit" value="Confirm" class="nxt-btn" id="confirm_rt">
					</div>
				</div>
			</form>
		</div>
		<!-- Package steps -->
		<div id="packageStepper">
					
			<form id="pack_trip" name="main_booking_form" action="processing_payment.php" method="POST">
				<div class="row justify-content-center">
					<span id="outstationtext" class="phone-send" class="active">OUT-STATION</span>&nbsp;&nbsp;&nbsp;
					<span id="localtext" class="phone-send">LOCAL</span>
				</div>
				<div class="row">
					<div class="col">
						<label for="pack-to-loc" class="lab-pack">Package Type</label>
					<input type="hidden" value="3" id="trip_mode" name="trip_mode">
					</div>
					<div class="col">
						<label for="pack-from-loc" class="lab-pick">Pick-up City</label>
					</div>
				</div>
				<div class="row justify-content-center ">
					<select id="localpkghtml" name="localpkghtml" hidden>
							<?php echo $localpkghtml; ?>
					</select>
					<div class="col-6 text-right" style="">
						<select id="pack-to-loc" name="packagetype" required>
							<?php echo $typepkghtml; ?>
						</select>                        
					</div>
					<div class="col-6 text-left" style="">
						<select id="pack-from-loc" style="" name="fromplace" required>
							<?php echo $fromcityhtml; ?>
						</select>
					</div>
				</div>
				<!--
				<div class="row justify-content-center car-collection-pack">
					<div class="col-md-2 car-img-group">
						<img src="assets/images/sedan_black.png" alt="" id="dSedanP">
						<p class="car-type sedan sedan-P">Sedan</p>
						<p id="pack-sedan-price" class="sedan-P">&#8377;2300</p>
					</div>
					<div class="col-md-1"></div>
					<div class="col-md-2 car-img-group">
						<img src="assets/images/suv_black.png" alt="" id="dSuvP">
						<p class="car-type suv">SUV/MUV</p>
						<p id="pack-suv-price">&#8377;2800</p>
					</div>

					<input type="radio" name="car_type_pkg" class="taxi_sp" value="558784ee2e854" style="display: none;" />
					<input type="radio" name="car_type_pkg" class="taxi_suvp" value="5587850448ce6" style="display: none;" />
				</div>
				-->
				<div class="row justify-content-sm-center" id="estimate-pkg" style="margin-top:20px;">
					<div class="estim-wrap-round estimate-fullview">
						<div class="text-center">
							<span id="estdistancepkg"></span>
							<h5>Estimate: &#8377;<span class="estamount" style="font-weight:bold;font-size:24px;padding:10px;"></span>
								<sup>*</sup>
							</h5>
							<span class="estpkgbreakup"></span>
							<p class="estterms" style="font-size: 14px; color: #002752;">
								<sup>*</sup>Inclusive of GST. The actual bill might differ based on actual distance travelled,
								hill-station charges &#38; inter-state permits.
							</p>
						</div>
					</div>
				</div>
				<div class="row justify-content-center book-now-pack">
					<input type="button" value="Book Now" class="nxt-btn" id="">
				</div>
				<div class="row">
					<div class="col">
						<label for="pack-date" class="lab-date-pack">Date</label>
					</div>
					<div class="col">
						<label for="pack-time" class="lab-time-pack">Time</label>
					</div>
				</div>
				<div class="row justify-content-center date-time-pack">
					<input type="text" name="doj" id="pack-date" placeholder="Date" onfocus="(this.type='date')" class="choose-date" onkeydown="return false" required>
					<!-- <input type="text" name="" id="drop-time" placeholder="Time" onfocus="(this.type='Time')" class="choose-time" step="1800"> -->
					<select name="time" id="pack-time" class="drop-time-select" required>
						<option value="" selected>Time</option>
					</select>
				</div>
				<div class="row justify-content-md-center address-section" id="addressSection-pack">
					<div class="col-md-8">
						<div class="col-md-12 add-label">
							<label for="addTel-pack" id="addTelLabel-pack">Mobile Number</label>
							<label for="addTelAlt-pack" id="addTelAltLabel-pack">Alternate Mobile Number</label>
						</div>
						<div class="col-md-12 text-center form-basic-det">
							<input type="tel" name="custMobile" id="addTel-pack" placeholder="Mobile Number" maxlength="10" pattern="[6789][0-9]{9}" required>
							<input type="tel" name="custAltMobile" id="addTelAlt-pack" placeholder="Alternate Mobile Number" maxlength="10" pattern="[6789][0-9]{9}" required>
							<input type="hidden" name="isnewuser" id="isnewuser" value="0" />
						</div>
						<div class="col-md-12 add-label">
							<label for="addName-pack" id="addNameLabel-pack">Name</label>
							<label for="addEmail-pack" id="addEmailLabel-pack">E-mail</label>
						</div>
						<div class="col-md-12 text-center form-basic-det">
							<input type="text" name="custName" id="addName-pack" placeholder="Name" required>
							<input type="email" name="custEmailId" id="addEmail-pack" placeholder="E-mail" required>
						</div>
						<div class="row justify-content-md-center textar-wrap">
							<div class="pick-add">
								<label for="pickAdd" id="pickAddLabel-pack" style="padding-left: 13%;">Pick-up Address</label>
								<textarea placeholder="Pick-up Address" id="pickAdd-pack" class="pack-textarea" name="pptaddr"></textarea>
							</div>
						</div>
						<div class="row text-center textar-wrap">
							<div id="referredbyblock-pack" class="col-md-12 form-basic-det">
								<label for="referredby" id="referredbyLabel">Referred By</label>
								<input type="tel" name="referredby" id="referredby-pack" value="<?php echo $referredby;?>" placeholder="Referrer Mobile No." maxlength="10"><br/>
								<span class="refmesg" style="display:none;color:red;">(Customer doesn't exist. Register this customer to get referral benefits.)</span>
							</div>
							<div id="redeemblock-pack" class="col-md-12 form-basic-det">
								[Redeem Amount Available: <span id="redeemavailable-pack"></span>]&nbsp;&nbsp;&nbsp;
								<label for="redeemamount" id="referredbyLabel">Redeem Amount</label>
								<input type="text" name="redeemamount" id="redeemamount-pack" value="0" placeholder="Amount to be Redeemed">
								<input type="hidden" name="redeemlimit-pack" id="redeemlimit-pack" value="0"/>
							</div>
						</div>
					</div>
					<div class="col-md-12 text-center hkdiv">
						<span class="how-drop">How did you come to know about Droptaxi?</span>
						<select class="know-pack" name="howknow" required>
							<?php include 'includes/howdoyouknowoptions.php';?>
						</select>
						<input type="text" class="hktext" name="hktext" placeholder="Enter Other option..."/>
						<div class="checkbox-wrapper" style="margin-left:20px;">
							<input type="checkbox" name="i_accept" class="check_i_accept" value="yes">
							<span>I accept the Terms and Conditions.</span>
						</div>
					</div>
					<div class="col-md-12 text-center" style="margin-top: 3%; padding-bottom: 1%;">
						<input type="submit" value="Confirm" class="nxt-btn" id="confirm_pk">
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- end of forms -->
	<div class="container-fluid">
		<div class="row justify-content-center img-list">
			<div class="col-12 col-md-2 img-wrapper">
				<div>
					<img src="assets/images/dep time.png" alt="Departure time of your choice" class="image-fluid">
				</div>
			</div>
			<div class="col-12 col-md-2 img-wrapper">
				<div>
					<img src="assets/images/door.png" alt="Door-step pickup and drop" class="image-fluid">
				</div>
			</div>
			<div class="col-12 col-md-2 img-wrapper">
				<div>
					<img src="assets/images/across tn.png" alt="Service across Tamilnadu" class="image-fluid">
				</div>
			</div>
			<div class="col-12 col-md-2 img-wrapper">
				<div>
					<img src="assets/images/airport.png" alt="Airport pickup and drop" class="image-fluid">
				</div>
			</div>
			<div class="col-12 col-md-2 img-wrapper">
				<div>
					<img src="assets/images/transparent.png" alt="Transparent pricing" class="image-fluid">
				</div>
			</div>
		</div>
	</div>
	<div class="row app-down">
		<div class="col-md-6 app-downlft">
			<div>
				<h2>DOWNLOAD OUR APP NOW!</h2>
				<p>Enter the mobile number. We'll send you the link of our app.</p>
			</div>
			<div class="app-req">
				<form name="appform" id="appform"  action="process/p_sendapplink.php" method="POST" style="display: inline;">
					<input type="text" value="+91">
					<input type="tel" name="appmobile"  placeholder="Mobile Number" size="10" maxlength="10" pattern="[6-9][0-9]{9}"
						required/>
					<input type="submit" value="Send me the link" class="phone-send" style="cursor:pointer;">
				</form>
				<span class="or">or</span>
				<a href="https://play.google.com/store/apps/details?id=com.droptaxi.clientappnew" target="_blank">
					<img src="assets/images/google_play.png" alt="Droptaxi Google Play">
				</a>
			</div>
		</div>
		<div class="col-md-1 top-quote">
			<img src="assets/images/comma.png" alt="comma">
		</div>
				<div class="col-md-3 terminal" id="slick-content" style="padding-top: 1%;">
			<?php
			/*
			$len = 10;  // total number of numbers
			$min = 1; // minimum
			$max = 25; // maximum
			foreach (range(0, $len - 1) as $i) {
				while(in_array($num = mt_rand($min, $max), $range)){
				$range[] = $num;
				}
			}
			$IDS = implode(",", $range);
			 * 
			 */
			$link = mysqli_connect(DB_SERVER, DB_SERVER_USERNAME, DB_SERVER_PASSWORD, DB_DATABASE);
			if ($link) {
				$sql = "SELECT T_ID, T_CUST_NAME, T_CUST_MESG FROM TESTIMONIAL "
						. "WHERE T_ISACTIVE = 1 AND T_ID IN (FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1,
FLOOR(RAND()*(25-1+1))+1); ";
				$result = mysqli_query($link, $sql);
			}
			?>
			<?php  while($row = mysqli_fetch_array($result)){ ?>
			<div>
				<p class="text-justify quote"><?php echo $row['T_CUST_MESG'];  ?></p>
				<p class="quote-title">- <?php echo $row['T_CUST_NAME']; ?></p>
			</div>
			<?php } mysqli_close($link); ?>

		</div>
		<div class="col-md-1 btm-quote">
			<img src="assets/images/comma2.png" alt="comma">
		</div>
	</div>
	 <div style="margin-left:1050px;">
		<form action="testimonials.php">
		<button class="phone-send" style="border-radius: 15px;cursor: pointer;" type="submit"> More</button>
		</form>

	</div>
	<form method="POST" action="process/p_feedbackpopup.php" >
	<div class="row justify-content-md-center feedbck">
		<div class="col-md-12 text-center fed-text">
			<h2>WE VALUE YOUR FEEDBACK</h2>
		</div>
		<div class="col-md-12 form-two">
			<input type="text" name="fb_name" id="fb_name" placeholder="Name" required>
			<input type="tel" name="fb_mobile" id="fb_mobile" placeholder="Mobile Number" maxlength="10" pattern="[6-9][0-9]{9}" required>
			<input type="email" name="fb_email" id="fb_email" placeholder="E-mail" required style="margin-right: 0; width: 20%;">
		</div>
		<div class="col-md-2"></div>
		<div class="col-md-8 txt-area">
			<textarea name="fb_comment" id="fb_comment" placeholder="Your valuable feedback." class="drop-textarea feedback-textarea" required></textarea>
		</div>
		<div class="col-md-2"></div>
		<div class="col-md-2"></div>
		<div class="col-md-8" id="feedbackrecaptcha" style="text-align: center;"></div>
		<div class="col-md-2"></div>
		<div class="row submit-btn justify-content-center">
			<input type="submit" value="Submit" class="submit-btn" style="cursor:pointer;">
		</div>
	</div>
	</form>
	</div>
	<!-- Model -->
	<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalCenterTitle">Invalid Entry</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					From and To location should not be same
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<footer>
		<?php 
			require_once("includes/footer_new.php"); 
		?>
	</footer>
	<script defer src="js/fontawesome-all.min.js"></script>
	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/popper.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/slick.min.js"></script>
	<script src="js/script.min.js?20200316"></script>
	<!--<script src="js/script.js"></script>-->
	<script src="https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit" async defer></script>
	<script type="text/javascript">
	var CaptchaCallback = function() {
		grecaptcha.render('feedbackrecaptcha', {'sitekey' : '6LcQrxAUAAAAANMD4O3ZCcld0JpanbbeZbiBQcKo'});
	};
	</script>
	<!-- Google Analytics -->
<script> (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore( a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-82511404-1', 'auto'); ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
<script>
$(document).ready(function(){
	$(".hktext").hide();
	$( ".hkdiv" ).on( "change", ".know-drop", function() {
			if($(".know-drop").val()=='9'){
				$(".hktext").show();
			} else {
				$(".hktext").hide();
			}
	});
	$( ".hkdiv" ).on( "change", ".know-round", function() {
			if($(".know-round").val()=='9'){
				$(".hktext").show();
			} else {
				$(".hktext").hide();
			}
	});
	$( ".hkdiv" ).on( "change", ".know-pack", function() {
			if($(".know-pack").val()=='9'){
				$(".hktext").show();
			} else {
				$(".hktext").hide();
			}
	});
});
</script> 	
</body>

</html>
