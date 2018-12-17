$(document).ready(function () {

    $( "#send-data" ).submit(function (event) {
        var data = {
            email: $('#email').val(),
            username: $('#username').val()
        };

        if (data.email && data.username) {
            axios.post('/api/records', {
                email: data.email,
                username: data.username
            }).then(function (res) {
                console.log(res);
            });
            window.location = '/thanks';
        } else {
            console.log('Error');
        }

        event.preventDefault();
    });

});

