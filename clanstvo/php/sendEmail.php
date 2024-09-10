<?php

// Replace this with your own email address
$to = 'pametanulog@gmail.com';

function url(){
  return sprintf(
    "%s://%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME']
  );
}

if($_POST) {

   $name = trim(stripslashes($_POST['name']));
   $email = trim(stripslashes($_POST['email']));
   $phone = trim(stripslashes($_POST['phone']));

   
	if ($phone == '') { $phone = "Nema broja telefona"; }

   // Set Message
   $message = ""; // Dodaj ovu liniju za inicijalizaciju
   $message .= "Ime novog clana: " . $name . "<br />";
	$message .= "Email addresa: " . $email . "<br />";
   $message .= "Broj telefona: " . $phone . "<br />";
   $message .= "<br /> ----- <br /> This email was sent from your site " . url() . " contact form. <br />";

   // Set From: header
   $from =  $name . " <" . $email . ">";

   // Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

   ini_set("sendmail_from", $to); // for windows server
   $mail = mail($to, "Nova prijava za clanstvo", $message, $headers);

	if ($mail) { echo "OK"; }
   else { echo "Dogodila se greska, molimo vas pokusajte ponovo."; }

}

?>