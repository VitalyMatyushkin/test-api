$('body').append('<input type="text" id="sessionKeyInput" value="e4mc48qmxb7vsps3e5y0lv00jjtax02722exjn0v">');
$('body').append('<input type="submit" id="sessionKeySubmit" value="Login" onClick="checkData()">');
$('body').append('<div id="result">');


function checkData(){
    getProfile()
        .then(function () {
        return getRoles()
    })
        .then(function (roles) {
            roles.forEach(function (item) {
                setRole(item.name)
                    .then(function (role) {
                    getSchools(role.key).then();
                    if (role.role === 'ADMIN' || role.role === 'MANAGER' || role.role === 'TRAINER'){
                        getStudentList(role.key);
                        getHouseList(role.key);
                        getFormList(role.key);
                    }
                })
            });
        });
}

function getProfile() {
    var usid = $("#sessionKeyInput").val();
    return $.ajax({
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
    return $.ajax({
        type: "GET",
        headers: {"usid": usid},
        url: "http://api.stage1.squadintouch.com/i/roles?filter=%22%22",
        statusCode: {
            200: function (response) {
                response.forEach(function(item) {
                    $('#result').append('<ul id="roles">');
                    $('#roles').append("<li>"+item.name+"</li>");
                });
            },
        },
        dataType: "json"
    });
}

function setRole(role) {
    var usid = $("#sessionKeyInput").val();
    return $.ajax({
        type: "POST",
        headers: {"usid": usid},
        url: "http://api.stage1.squadintouch.com/i/roles/" + role + "/become?filter=%22%22",
        statusCode: {
            201: function (response) {
                // console.log(response);
            },
        },
        dataType: "json"
    });
}

function getSchools(sessionKey) {
    return $.ajax({
        type: "GET",
        headers: {"usid": sessionKey},
        url: "http://api.stage1.squadintouch.com/i/schools?filter=%22%22",
        statusCode: {
            200: function (response) {
                // console.log(response);
            },
        },
        dataType: "json"
    });
}



function getStudentList(sessionKey) {
    return $.ajax({
        type: "GET",
        headers: {"usid": sessionKey},
        url: "http://api.stage1.squadintouch.com/i/schools/57b6c9a6dd69264b6c5ba82f/students?filter=%7B%22limit%22%3A20%2C%22skip%22%3A20%7D&{}",
        statusCode: {
            200: function (response) {
                console.log(response);
            },
        },
        dataType: "json"
    });
}

function getHouseList(sessionKey) {
    return $.ajax({
        type: "GET",
        headers: {"usid": sessionKey},
        url: "http://api.stage1.squadintouch.com/i/schools/57b6c9a6dd69264b6c5ba82d/houses?filter=%7B%22limit%22%3A20%7D&{}",
        statusCode: {
            200: function (response) {
                console.log(response);
            },
        },
        dataType: "json"
    });
}

function getFormList(sessionKey) {
    return $.ajax({
        type: "GET",
        headers: {"usid": sessionKey},
        url: "http://api.stage1.squadintouch.com/i/schools/57b6c9a6dd69264b6c5ba82d/forms?filter=%7B%22limit%22%3A30%7D&{}",
        statusCode: {
            200: function (response) {
                console.log(response);
            },
        },
        dataType: "json"
    });
}