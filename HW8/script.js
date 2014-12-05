$(document).ready(function() {
    $('#errorLogin').hide();
    $('#errorSignUp').hide();

    if(token === undefined){
        $('#list').hide();
        $('#show-full').hide();
    }else{
        $('#login').hide();
        $('#signup').hide();
    }
    var token;

    $('#signUpForm').on('submit',function (event) {
        event.preventDefault();
        var signUpForm = $('#signup');
        var userId = readValue(signUpForm,'login');
        var userPassword = readValue(signUpForm,'password');
        var userPasswordConfirmation = readValue(signUpForm,'passwordConfirmation');
        var params = [];
        params.push(userId,userPassword,userPasswordConfirmation);
        console.log(userId,userPassword,userPasswordConfirmation);
        var successSignUp = function(data){
            console.log('SUCCESS!');
            console.log(data);
            $('#list').show("slow");
            token = data["token"];
        }

        var failureSignUp = function(err){
            console.log('ERROR!');
            console.log(err);
            $('#errorSignUp').show("slow");
        }
        sendRequest(params,"SIGNUP", successSignUp,failureSignUp);
    });

    $('#loginForm').on('submit',function (event) {
        event.preventDefault();
        var loginForm = $('#loginForm');
        var userId = readValue(loginForm,'login');
        var userPassword = readValue(loginForm,'password');
        var params = [];
        params.push(userId,userPassword);
        var successLogin = function(data){
            console.log('SUCCESS!');
            console.log(data);
            $('#login').hide();
            $('#signup').hide();
            $('#list').show("slow");
            token = data["token"];
            var successGetUsers = function(data){
                console.log(data);
                data.forEach(function(item){
                    var  html = '<li><div class="person '+item.user.gender+' " id = " '+item["id"]+' " ><a class="url n" href="#show-full"><i>'+ item.user.name.title ;
                    html += '</i> '+'  '+item.user.name.first +'  '+ item.user.name.last+'</a> </div> </li>';
                    $("#usersList").append(html);
                })


            }
            sendRequest(token,"GETUSERS",successGetUsers,null);

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
                requestAddress = "users"
                break;
        }

        if(TYPE === "POST") {
            $.post(
                "http://api.sudodoki.name:8888/" + requestAddress,
                {
                data: requestData
                }).
                done(success).error(failure);
        }else{
            $.get(
                "http://api.sudodoki.name:8888/" + requestAddress,
                {},
                success
            );
        }
    }


    function readValue(valueForm,nameInput) {
        var value = valueForm.find('input[name = '+nameInput+']').val();
        console.log(value);
        return value;
    }
});