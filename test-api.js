$('body').append('<input type="text" id="sessionKeyInput" value="wx9f1ap2mmvwlx9hatp2xol5j6sqw7lyfhm2if3p">');
$('body').append('<input type="submit" id="sessionKeySubmit" value="Login" onClick="sendsessionKey()">');
$('body').append('<ul id="result">');


function sendsessionKey() {
    var usid = $("#sessionKeyInput").val();
    var roles;
    $.ajax({
        type: "GET",
        headers: {"usid": usid},
        url: "http://api.stage1.squadintouch.com/i/roles?filter=%22%22",
        statusCode: {
            200: function (response) {
                roles = response;
                roles.forEach(function(item) {
                    console.log(item.name);
                    $('#result').append("<li>"+item.name+"</li>");
                });
            },
        },
        dataType: "json"
    });

}

