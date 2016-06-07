        function validateForm()
            {
             "use strict";  
                var title = $("#name").val();
                var err=true;
                if (title=="" || title==null) {  
                  $("#name").addClass("validation");
                
                  var err= false;
                } else {  $("#name").removeClass("validation");}
                var email = $("#email").val();
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
                 $("#email").addClass("validation"); 
                 
                   var err= false;
                } else {  $("#email").removeClass("validation"); }
                var title = $("#message").val();
                if (title=="" || title==null) { 
                  $("#message").addClass("validation"); 
                   var err= false;
                } else{ $("#message").removeClass("validation"); }
              return err;
            }
            $(document).ready(function(){
				"use strict"; 
              $("#button").click(function(e){
                if(validateForm()){
                  $("#successmsg").html("<i class=\"fa fa-spinner fa-spin\"></i> Sending message...");  
                 e.preventDefault();
                  $.ajax({type: "POST",
                          url: "/SendMail",
                          data:$("#form1").serialize(),
                          success:function(result){
                          $("#successmsg").html(result);
                          
                        }}); 
                  $("#name").val('');
                  $("#email").val('');
                  $("#message").val('');
                 // $("#successmsg").remove();
               }
               else
               {
                return false;
               }
              });
            });
        