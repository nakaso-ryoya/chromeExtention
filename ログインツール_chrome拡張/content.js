if (document.getElementById('im_user') !== null) {
    let loginInfo = {
        userId: "",
        password: ""
    };

    chrome.storage.local.get("loginInfo", function (value) {
        let loginInfo = value.loginInfo;
        if (loginInfo.userId !== '' && loginInfo.userId !== null) {
            let userId = document.getElementById("im_user");
            userId.value = loginInfo.userId;
            let pass = document.getElementById("im_password");
            pass.value = loginInfo.password;
            let form = document.forms['login_form'];
            chrome.storage.local.set({
                'loginInfo': {
                    'userId': '',
                    'password': ''
                }
            })
            form.submit();
        }
    });
}