// intra-martのログイン画面以外のWebページでは実行しない
if (document.getElementById('im_user') !== null) {
    // ログイン情報取得
    chrome.storage.local.get("loginInfo", function (value) {
        if (value.loginInfo.userId !== '' && value.loginInfo.userId !== null) {
            // ユーザコードとパスワードを入力
            let userId = document.getElementById("im_user");
            userId.value = value.loginInfo.userId;
            let pass = document.getElementById("im_password");
            pass.value = value.loginInfo.password;

            // ログイン情報をブランクに更新(本拡張機能以外からログイン画面にアクセスした際に勝手にフォーム送信されるのを防ぐため)
            chrome.storage.local.set({
                'loginInfo': {
                    'userId': '',
                    'password': ''
                }
            })

            // フォーム送信
            let form = document.forms['login_form'];
            form.submit();
        }
    });
}