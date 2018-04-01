(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=466632713668792&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
$(function() {

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
$(document).ready(function() {
    new ClipboardJS('#btnCopy');
});

function target(element) {
    var htmlString = document.getElementById(element).innerHTML;
    document.getElementById('code').innerHTML = htmlString;
}

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

var clipboard = new Clipboard('#btnCopy');

clipboard.on('success', function(e) {
    setTooltip('Copied');
    hideTooltip();
});

clipboard.on('error', function(e) {
    setTooltip('Failed');
    hideTooltip();
});