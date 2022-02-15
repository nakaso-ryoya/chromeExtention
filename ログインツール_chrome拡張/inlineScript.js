let loginInfo = {
    label:'',
    userId:'',
    password:''
};

chrome.storage.local.get('url', function (item){
    document.getElementById('url').value = item.url;
});

chrome.storage.local.get('loginInfoList',function (item) {
    if (typeof item.loginInfoList !== 'undefined') {
        for (let i = 0; i < item.loginInfoList.length; i++) {
            let tr = document.createElement('tr');
            let labelTd = document.createElement('td');
            let listItem = document.createElement('a');
            listItem.text = item.loginInfoList[i].label;
            labelTd.appendChild(listItem);
            tr.appendChild(labelTd);
            let deleteTd = document.createElement('td');
            let deleteLink = document.createElement('a');
            deleteLink.text = '✖';
            deleteTd.appendChild(deleteLink);
            tr.appendChild(deleteTd);
            document.getElementById('loginInfoList').appendChild(tr);

            labelTd.addEventListener('click', function () {
                chrome.storage.local.set({
                    'loginInfo': {
                        'userId': item.loginInfoList[i].userId,
                        'password': item.loginInfoList[i].password
                    }
                });
                let url = document.getElementById('url').value;
                chrome.storage.local.set({'url': url});
                window.open(url, '_blank')
            });

            deleteLink.addEventListener('click', function () {
                chrome.storage.local.get('loginInfoList', function (value){
                    let loginInfoList = value.loginInfoList;
                    loginInfoList.splice(i,1);
                    chrome.storage.local.set({'loginInfoList':loginInfoList})
                    window.location.reload();
                })
            });
        }
    }
});



// 追加ボタン押下
let addBtn = document.getElementById('add');
addBtn.addEventListener("click",function (){
    let registerDiv = document.getElementById('register');
    registerDiv.hidden = false;
    let homeDiv = document.getElementById('home');
    homeDiv.hidden = true;
});

// キャンセルボタン押下
let cancelBtn = document.getElementById('cancel');
cancelBtn.addEventListener('click', function () {
    window.location.reload();
})

// 登録ボタン押下
let registerBtn = document.getElementById('doRegister');
registerBtn.addEventListener('click', function (){
    loginInfo.label = document.getElementById('label').value;
    loginInfo.userId = document.getElementById('userId').value;
    loginInfo.password = document.getElementById('password').value;
    chrome.storage.local.get('loginInfoList',function (item) {
        let loginInfoList = [];
        if (typeof item.loginInfoList !== 'undefined') {
            loginInfoList = item.loginInfoList;
        }
        loginInfoList.push(loginInfo);
        chrome.storage.local.set({'loginInfoList': loginInfoList});
        window.location.reload();
    });
})