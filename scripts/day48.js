// #48
const signUp = getElemt('#signUp')
const signIn = getElemt('#signIn')
const ints = document.querySelectorAll('input')
const url = 'https://hexschool-tutorial.herokuapp.com/api/'
let data = {}
let chk = []
let str = []
let msg = ''

function postAjax (act){
    axios.post(`${url + act}`, {
        email: data.mail,
        password: data.psw
    }).then(res => {
        let info = data.msg
        if ( res.data.success ){
            info.innerHTML += res.data.message
            info.classList.add('alert-success')
            ints.forEach( item => {
                item.value = ''
            })
        } else {
            info.innerHTML += res.data.message
            info.classList.add('alert-danger')
        }
    }).catch(err => {
        console.log(err.data)
    })
}

// Email 驗證
function chkmail (item){
    let rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    let isValue = item.value.trim()
    if( isValue == '' || !rule.exec(isValue) ) {
        str.push('Email 格式錯誤') 
        chk[0] = false
        item.classList.add('is-invalid')
    } else {
        chk[0] = true
        item.classList.remove('is-invalid')
    }
}

// Password 驗證
function chkpsw (item){
    let rule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,20}$/
    let isValue = item.value.trim()
    if ( isValue == '' || !rule.exec(isValue) ) {
        str.push('密碼須包含數字和英文字母')
        chk[1] = false
        item.classList.add('is-invalid')
    } else {
        chk[1] = true
        item.classList.remove('is-invalid')
    }
}

// 切換狀態
function check(btn) {
    let p = btn.parentElement.parentElement
    let isMail = p.querySelector("input[type='email']")
    let isPsw = p.querySelector("input[type='password']")
    let isMsg = p.querySelector('.alert')
    let res
    chkmail(isMail)
    chkpsw(isPsw)

    if ( !chk[0] || !chk[1] ) {
        isMsg.classList.add('alert-danger')
        isMsg.innerHTML = str.join('<br>') // 加入br換行
        res = false
    } else {
        isMsg.classList.remove('alert-danger')
        isMsg.innerHTML = ''
        isMsg.classList = 'alert'
        res = true
    }
    data = {
        result: res,
        mail: isMail.value,
        psw: isPsw.value,
        msg: isMsg
    }
    console.log(data)
}

// 啟動驗證並送出資料
function active (e){
    let t = e.target
    str = []
    if ( t == getElemt('#signUpBtn') ){
        check(t)
        if ( data.result ){
            postAjax('signup')
        } else {
            return
        }
    } else if ( t == getElemt('#signInBtn') ){
        check(t)
        if ( data.result ){
            postAjax('signin')
        } else {
            return
        }
    } else { return } 
}

signUp.addEventListener('click', active)
signIn.addEventListener('click', active)



// Email 驗證
// chkmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
// ^\w+：@ 之前必須以一個以上的文字&數字開頭，例如 abc
// ((-\w+)：@ 之前可以出現 1 個以上的文字、數字或「-」的組合，例如 -abc-
// (\.\w+))：@ 之前可以出現 1 個以上的文字、數字或「.」的組合，例如 .abc.
// ((-\w+)|(\.\w+))*：以上兩個規則以 or 的關係出現，並且出現 0 次以上 (所以不能 –. 同時出現)
// @：中間一定要出現一個 @
// [A-Za-z0-9]+：@ 之後出現 1 個以上的大小寫英文及數字的組合
// (\.|-)：@ 之後只能出現「.」或是「-」，但這兩個字元不能連續時出現
// ((\.|-)[A-Za-z0-9]+)*：@ 之後出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
// \.[A-Za-z]+$/：@ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文


// Password 驗證
// chkpsw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,20}$/
// ^：開頭位置
// (?![0-9]+$)：該位置後不全是數字
// (?![a-zA-Z]+$)：該位置後不全是字母
// [0-9A-Za-z] {0,20} 由0-20位數字或这字母组成 
// $：結尾位置
