$(document).ready(function() {
    $('#errorLogin').hide();
    $('#errorSignUp').hide();
    $('#show-full').hide();

    var token;

    $('#signUpForm').on('submit',function (event) {
        event.preventDefault();
        var signUpForm = $('#signup');
        var userId = readValue(signUpForm,'login');
        var userPassword = readValue(signUpForm,'password');
        var userPasswordConfirmation = readValue(signUpForm,'passwordConfirmation');
        var params = [];
        params.push(userId,userPassword,userPasswordConfirmation);
        //console.log(userId,userPassword,userPasswordConfirmation);
        var successSignUp = function(data){
            console.log('SUCCESS!');
            console.log(data["token"]);
            token = data["token"];
            $('#list').show("slow");


        }

        var failureSignUp = function(err){
            console.log('ERROR!');
            console.log(err);
            $('#errorSignUp').show("slow");
        }
        sendRequest(params,"SIGNUP", successSignUp,failureSignUp);
    });

    $('#list div').on("click",function(){
        console.log("CLICKED!");
        console.log($(this).id());
    })

    var successGetUser = function(data){
        console.log(data);
        $("#list").hide();
        var data = jQuery.parseJSON(data);
        var user = data[0].user;

                var html ="<div>";
                html+='<h2>'+ user.name.title+" "+ user.name.first+" "+user.name.last+'</h2>';
                html+='<section>';
                html+='<h3>Location</h3>';
                html+= 'Street: '+user.location.street+" "+user.location.city+" "+user.location.state+" "+user.location.zip ;
                html+='</section>';

                html+='<section>';
                html+='<h3>Connect with him!</h3>';
                html+='<a href="mailto:'+ user.email + '">'+user.email+'</a>';
                html+='<br/>';
                html+='<a href="tel:'+ user.cell +'">'+user.cell+'</a>';
                html+='</section>';
                html+='</div>';



            $("#show-full").html(html);
            $("#show-full").show("slow");


    }

    var errorGetUser = function(err){
        console.log(err);
    }


    $('#loginForm').on('submit',function (event) {
        event.preventDefault();
        var loginForm = $('#loginForm');
        var userId = readValue(loginForm,'login');
        var userPassword = readValue(loginForm,'password');
        var params = [];
        params.push(userId,userPassword);
        var successLogin = function(data){
            console.log(data);
            $('#login').hide();
            $('#signup').hide();
            $('#list').show("slow");
            token = getToken(data);
            console.log('SUCCESS!');
            var successGetUsers = function(data){
                //console.log(data);
                data.forEach(function(item){
                    var  html = '<li><div class="person '+item.user.gender+'" id="'+item["id"]+'"><a class="url n" href="#show-full"><i>'+ item.user.name.title ;
                    html += '</i> '+'  '+item.user.name.first +'  '+ item.user.name.last+'</a> </div> </li>';
                    $("#usersList").append(html);
                    var  s = (item.id).toString();
                    $("#"+s).on('click',function(){
                        sendRequest([item.id],"GETUSER",successGetUser,errorGetUser);
                    });
                })

            }



            var errorGetUsers = function(err){
                console.log(err);
            }
            sendRequest(null,"GETUSERS",successGetUsers,errorGetUsers);

        }

        var failureLogin = function(err){
            console.log('ERROR!');
            console.log(err);
            $('#errorLogin').show("slow");

        }
        console.log(userId,userPassword);
        sendRequest(params,'LOGIN',successLogin,failureLogin);

    });


    function sendRequest(params,requestType,success,failure) {
        var requestData;
        var requestAddress;
        var TYPE;
        switch (requestType){
            case "LOGIN":
                requestData = {
                    login: params[0],
                    password:params[1]
                }
                requestAddress = 'login';
                TYPE="POST";
                break;
            case "SIGNUP":
                requestData = {
                    login:params[0],
                    password:params[1],
                    passwordConfirmation:params[2]
                }
                requestAddress = 'signup';
                TYPE="POST";
                break;
            case "GETUSERS":

                TYPE = "GET";
                requestAddress = "users";
                $.get("http://api.sudodoki.name:8888/" + requestAddress,{},success);
                //console.log("USERS");

                break;
            case "GETUSER":
                TYPE = "GET";
                requestAddress  = "user/"+ params[0];
                $.ajax({
                        type: "GET",
                        url: "http://api.sudodoki.name:8888/" + requestAddress,
                        headers:{"SECRET-TOKEN":token }
                        //error: failure,
                        //success:success
                     }
                ).done(success).error(failure);
                break;
        }

        if(TYPE === "POST") {
            $.post(
                "http://api.sudodoki.name:8888/" + requestAddress,
                {
                data: requestData
                }).
                done(success).error(failure);
        }
        //}else{
        //        $.ajax({
        //            type:"GET",
        //            url : "http://api.sudodoki.name:8888/" + requestAddress ,
        //            headers: {"SECRET-TOKEN":params[1]}});
        //    }
       // }
   }


    function readValue(valueForm,nameInput) {
        var value = valueForm.find('input[name = '+nameInput+']').val();
       // console.log(value);
        return value;
    }

    function getToken(string){
        var ind = string.indexOf("token");
        return string.substr(ind+8, 24);
    }
});