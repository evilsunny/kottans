$(document).ready(function() {
    $('#errorLogin').hide();
    $('#errorSignUp').hide();
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

        switch (requestType){
            case "LOGIN":
                requestData = {
                    login: params[0],
                    password:params[1]
                }
                requestAddress = 'login';
                break;
            case "SIGNUP":
                requestData = {
                    login:params[0],
                    password:params[1],
                    passwordConfirmation:params[2]
                }
                requestAddress = 'signup';
                break;
        }

        $.post("http://api.sudodoki.name:8888/"+requestAddress, {
            data: requestData
        }).done(success).error(failure);
    }


    function readValue(valueForm,nameInput) {
        var value = valueForm.find('input[name = '+nameInput+']').val();
        console.log(value);
        return value;
    }
});