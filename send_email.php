<?php
		header('Access-Control-Allow-Origin: *');
		header('Content-Type: text/html; charset=utf-8');

		$frmNome = 		$_POST["frmNome"];
		$frmEmail = 	$_POST["frmEmail"];
		$frmMensagem = 	$_POST["frmMensagem"];

		echo "$frmNome".", ";
		echo "$frmEmail" . ", ";
		echo "$frmMensagem";



		$to 		= "diaslinoh@gmail.com";
		$subject 	= "Contato Site G4Virtual";
		$txt 		= "$frmNome"."\r\n"."$frmMensagem";
		$headers 	= "From: $frmEmail" . "\r\n";

		mail($to,$subject,$txt,$headers);

?> 