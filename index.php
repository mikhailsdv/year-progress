<?php
	//begin actually unnecessary code
	if (!$argv || $argv[1] !== "") {
		header("HTTP/1.1 404 OK");
		exit();
	};
	//end actually unnecessary code

	define("IFTTT_KEY", ""); //paste your ifttt key between ""

	function ifttt_webhook($action, $data) {
		return file_get_contents("https://maker.ifttt.com/trigger/" . $action . "/with/key/" . IFTTT_KEY . "/?" . http_build_query($data));
	};
	
	$last_percent = (int)file_get_contents(__DIR__ . "/last_percent.txt"); //read last percent from file
	$today = time();
	$current_year = mktime(0, 0, 0, 1, 0, date("Y"));
	$days_in_year = floor(($current_year - mktime(0, 0, 0, 12, 31, date("Y"))) / 86400) * -1; //count days in year. 365 or 366
	$days_passed = floor(($today - $current_year) / 86400); //count how many days have passed
	$percent = $days_passed / $days_in_year; //count percent 0-1
	$percentFloor = (int)floor($percent * 100); //round down 0-100
	$fill = floor(20 * $percent); //symbol repeat

	if ($percentFloor !== $last_percent) {
		file_put_contents(__DIR__ . "/last_percent.txt", $percentFloor); //write new percent
		echo ifttt_webhook("yearprogress", array(
			"value1" => str_repeat("▓", $fill) . str_repeat("░", 20 - $fill) . " " . $percentFloor . "%"
		));
	}