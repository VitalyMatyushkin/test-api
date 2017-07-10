$('body').append('<input type="text" id="sessionKeyInput" value="sozot87h9pizj2et7zvfcha0j4iyhihufsww7ikq">');
$('body').append('<input type="submit" id="sessionKeySubmit" value="Login" onClick="checkData()">');
$('body').append('<div id="result">');


function checkData(){
    getProfile();
    getRoles();
}

function getProfile() {
    var usid = $("#sessionKeyInput").val();
    $.ajax({
        type: "GET",
        headers: {"usid": usid},
        url: "http://api.stage1.squadintouch.com/i/profile?filter=%22%22",
        statusCode: {
            200: function (response) {
                $('#result').append('<div id="profile">');
                $('#profile').html('Name: '+response.firstName + ' ' + response.lastName);
            },
        },
        dataType: "json"
    });
}

function getRoles() {
    var usid = $("#sessionKeyInput").val();
    var a = $.ajax({
        type: "GET",
        headers: {"usid": usid},
        url: "http://api.stage1.squadintouch.com/i/roles?filter=%22%22",
        statusCode: {
            200: function (response) {
                response.forEach(function(item) {
                    $('#result').append('<ul id="roles">');
                    $('#roles').append("<li>"+item.name+"</li>");
                });
                switchRoles(response); //вызов функции переключения ролей
            },
        },
        dataType: "json"
    });
}

function switchRoles(roles) {
    roles.forEach(function (item) {
        setRole(item.name);
    })
}

function setRole(role) {
    var usid = $("#sessionKeyInput").val();
    var roles;
    $.ajax({
        type: "POST",
        headers: {"usid": usid},
        url: "http://api.stage1.squadintouch.com/i/roles/" + role + "/become?filter=%22%22",
        statusCode: {
            201: function (response) {
                console.log(response);
            },
        },
        dataType: "json"
    });
}

