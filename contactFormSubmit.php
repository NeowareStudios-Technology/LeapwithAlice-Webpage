<?php

$contactError="";

//check the form is actually filled again.
  if(!$_POST["name"]) {
      $contactError .= "A name is required <br />";
  }
  if(!$_POST["email"]) {
    $contactError .= "An email is required <br />";
  }
  if(!$_POST["message"]) {
    $contactError .= "Message is required <br />";
  }

// Ensure the user is submitting a valid email
if ($_POST['email'] && filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) === false) {
          echo "The email address is not valid <br>";
          return false; // Because AJAX just plows through PHP we must break it here
      }

// If we accumulated errors, display them.
if ($contactError != "") {
 $contactError = 'errors with form: <br />'.$contactError;
  echo $contactError;
  return false;
  
  
// Otherwise, errorfree, we continue to fill out our email with
// the necessary information
} else {
 $emailTo;
 $subject;
 $content;
 $headers;

// fill in content with the info we want.
 $emailTo .= "starlimeweb@gmail.com";
 $subject .= "New Website Contact!";
 $content .= "Contact Name: ".$_POST['name']."\r\n";
 $content .= "Contact Message: ".$_POST['message']."\r\n";
 $content .= "Contact Email: ".$_POST['email']."\r\n";
 $headers = 'From: WebFormContact@leapwithalice.io'. "\r\n" .
      'Reply-To: '. $_POST['email'] . "\r\n" .
      'X-Mailer: PHP/' . phpversion();
}

// If everything has passed so far
// and there is content in all fields, 
// we accept the email and give success message.
// Otherwise, if some other error, be it server or otherwise, send error message
   
 if(mail($emailTo, $subject, $content, $headers)) {
   // You can replace these echoes to update the page instead, ie. setting success to changing div content instead of alert
   echo 'Successful Contact! We will get back with you as soon as possible!';
   return true;
} else {
   echo 'Unsuccessful, please try again later';
} 


?>
