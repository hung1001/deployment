
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=235684560514250&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function() {
    new ClipboardJS('#btnCopy');
    $('#backTop').click(function(e) {
        $('html,body').animate({
            scrollTop: 0
        }, 800);
        return false;
        e.preventDefault();
    });

    placebackTopBackground();
    $(window).scroll(function() {
        (($(window).scrollTop() > 100) ? $('.backTop').stop().css('display', 'block').animate({
            'bottom': '20px'
        }, 100) : $('.backTop').stop().animate({
            'bottom': '20px'
        }, 100, function() {
            $(this).css('display', 'none');
        }));
        placebackTopBackground();
    });

    function placebackTopBackground() {
        var d = $(document).height(),
            c = $(window).height(),
            s = $(window).scrollTop();
        var position = (1 - (s / (d - c))) * 100;
        $('#backTopBackground').css('top', position + '%');
    }
});

$("#clear").click(function() {
    document.getElementById('code').innerHTML = "";
});

$('#btnCopy').tooltip({
    trigger: 'click',
    placement: 'top'
});

function setTooltip(message) {
    $('#btnCopy').tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
}

function hideTooltip() {
    setTimeout(function() {
        $('#btnCopy').tooltip('hide');
    }, 1000);
}

var clipboard = new ClipboardJS('#btnCopy');

clipboard.on('success', function(e) {
    setTooltip('Copied');
    hideTooltip();
});

clipboard.on('error', function(e) {
    setTooltip('Failed');
    hideTooltip();
});

function getText(file) {
    $.ajax({
        url: "assests/ajax/" + file + ".txt",
        success: function(data) {
            document.getElementById('code').innerHTML = data;
        }
    });
}