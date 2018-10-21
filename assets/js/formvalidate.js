function formCheck(){
  var checkName = $("#name").val();
  var checkMessage = $("#message").val();
  var patt = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;

  if( patt.test(checkName) == false && patt.test(checkMessage) == false ){
     // alert("Form Submitting...");
    //$(".preloader").show(); // if successful, show a "loader"
    $("#btn_submit").html("Sending...");
    return true;
  } else {
      $(".error").show().html("Please correct your form and try again.");
      return false;
  }
}


  $("#btn_submit").click(function(e){
    e.preventDefault(); // don't allow to submit on default
    if (formCheck() == false){
     // alert("correct your form and try again");
    return false;
    } else {
      //$(".loader").show();
    //var frm = document.getElementsByName('contact-form')[0];
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var error = "";
    // Returns successful data submission message when the entered information is stored in database.
    var dataString = 'name='+ name + '&email='+ email + '&message='+ message;
    if(name==''||email==''||message=='') {
      $(".error").show().html("Please fill in all of the fields!");
      $(".success").hide();
      $("#btn_submit").html("Submit");
      //$(".loader").hide();
      return false;
    } else {
      // AJAX Code To Submit Form.
      $.ajax({
        type: "POST",
        url: "https://www.starlimeweb.com/leapwithalice.io/",
        data: dataString,
        cache: false,
        crossDomain:true,
        success: function(result){
        //$("#successText").html(result);
          setTimeout(function(){
            if (result == "-2"){
              $("#btn_submit").html("Submit");
              $(".error").show().html("The Email Address is not valid");
              $(".success").hide();
              //$(".loader").hide();
            }
            if (result == "-1") {
              $("#btn_submit").html("Submit");
              $(".error").show().html("Unable to send, please try again later");
              $(".success").hide();
              //$(".loader").hide();
            }
            if (result == "1"){
              //$(".loader").hide();
              $("#btn_submit").html("Sent!");
              $(".error").hide();
              $(".success").show();
              $("#successText").html("Message Sent!");
            //  frm.reset(); // reset form to not allow multiple submissions
            }
          }, 500);
      }
      });
    }
    return false;
    }
    });
