<?php
	$name = $_POST['name'];
	$email = $_POST['email'];

	$msg = $name.",\r\n". $_POST['message'];
	$to = "diaslinoh@gmail.com";
	$subject = "Mensagem Portfolio";
	$headers = "From: ". $email;

	mail($to,$subject,$msg,$headers);

	echo "Hello, I'm sendmail.php"
?>

