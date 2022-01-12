$(document).ready(function () {
    // Login Raido Btn 기능
    let inputRadio = $('input[name=group]');

    $('.menu-item').click(function () {
        $(this).children(inputRadio).prop("checked", true);
        $('.menu-item').removeClass('on');
        $(this).children(inputRadio).parent('li').addClass('on');
    });

    inputRadio.click(function () {
        let groupVal = $('input[name=group]:checked').val();
        let loginForm = $('#frm_login');

        if (groupVal === "main") {
            loginForm.attr("action", "./main.html");
        } else if (groupVal === "service") {
            loginForm.attr("action", "./service.html");
        } else if (groupVal === "userPay") {
            loginForm.attr("action", "./userPay.html");
        };
    });

    // login info delete btn 기능
    $('#group_delete').click(function (e) {
        e.preventDefault();
        $('#group').val('');
    });
    $('#company_delete').click(function (e) {
        e.preventDefault();
        $('#company').val('');
    });
    $('#id_delete').click(function (e) {
        e.preventDefault();
        $('#id').val('');
    });
    $('#pw_delete').click(function (e) {
        e.preventDefault();
        $('#pw').val('');
    });

    // login 기능
    let userInputGroup = getCookie("userInputGroup");
    let userInputCompany = getCookie("userInputCompany");
    let userInputId = getCookie("userInputId");

    $('#group').val(userInputGroup);
    $('#company').val(userInputCompany);
    $('#id').val(userInputId);

    // 그 전에 ID를 저장해서 처음 페이지 로딩
    if ($('#group').val() != "" && $('#company').val() != "" && $('#id').val() != "") {
        $("#keep_id").attr("checked", true);
    }

    $("#keep_id").change(function () {
        if ($("#keep_id").is(":checked")) {
            let userInputGroup = $('#group').val();
            let userInputCompany = $('#company').val();
            let userInputId = $('#id').val();
            setCookie("userInputGroup", userInputGroup, 7);
            setCookie("userInputCompany", userInputCompany, 7);
            setCookie("userInputId", userInputId, 7);
        } else {
            deleteCookie("userInputGroup");
            deleteCookie("userInputCompany");
            deleteCookie("userInputId");
        }
    });

    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
    $("input[name='group'], input[name='company'], input[name='id']").keyup(function () {
        if ($("#keep_id").is(":checked")) {
            let userInputGroup = $('#group').val();
            let userInputCompany = $('#company').val();
            let userInputId = $('#id').val();
            setCookie("userInputGroup", userInputGroup, 7);
            setCookie("userInputCompany", userInputCompany, 7);
            setCookie("userInputId", userInputId, 7);
        }
    });

    $('#login_submit').click(function () {
        if ($('#group').val() == '') {
            alert('그룹을 입력하시오.')
            return false;
        } else if ($('#company').val() == '') {
            alert('회사를 입력하시오.')
            return false;
        } else if ($('#id').val() == '') {
            alert('아이디를 입력하시오.')
            return false;
        } else if ($('#pw').val() == '') {
            alert('패스워드를 입력하시오.')
            return false;
        } else {
            document.frmLogin.submit();
        }
    });

    function enterkey() {
        if (window.event.keyCode == 13) {
            submit();
        }
    }

    // login 정보 서버로 보내기
    let queryString = $("#frm_login").serialize();
    console.log(queryString);

    // function to_ajax() {

    //     $.ajax({
    //         type: 'post',
    //         url: '/test.jsp',
    //         data: queryString,
    //         dataType: 'json',
    //         error: function (xhr, status, error) {
    //             alert(error);
    //         },
    //         success: function (json) {
    //             alert(json)
    //         }
    //     });
    // }
});

function setCookie(cookieName, value, exdays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    let cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName) {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
    cookieName = cookieName + '=';
    let cookieData = document.cookie;
    let start = cookieData.indexOf(cookieName);
    let cookieValue = '';
    if (start != -1) {
        start += cookieName.length;
        let end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}