// #48
const signUpBtn = getElemt('#signUpBtn')
const signInBtn = getElemt('#signInBtn')
const mail = getElemt('.email')
const psw = getElemt('.password')
const msg = getElemt('.alert')
const ints = document.querySelectorAll('input')
const signupURL = 'https://hexschool-tutorial.herokuapp.com/api/signup'
const signinURL = 'https://hexschool-tutorial.herokuapp.com/api/signin'

function postAjax (url){
    axios.post(url, {
        email: mail.value,
        password: psw.value
    }).then(res => {
        if ( res.data.success ){
            if (url === signupURL) {
                msg.classList.add('alert-success')
            } else {
                msg.classList.add('alert-info')
            }
            msg.innerHTML = res.data.message
            ints.forEach( item => {
                item.value = ''
            })
        } else {
            msg.classList.add('alert-danger')
            msg.innerHTML = res.data.message
        }
    }).catch(err => {
        console.log(err.data)
    })
}

function checkFunc(e) {
    chkmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    chkpsw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,20}$/
    isMail = mail.value.trim()
    isPsw = psw.value.trim()
    chk = true
    str = []
    
    // Email 驗證
    if( isMail == '' || !chkmail.exec(isMail) ) {
        str.push('Email 格式錯誤') 
        chk = false
        mail.classList.add('is-invalid')
    } else {
        chk = true
        mail.classList.remove('is-invalid')
    }
    
    // Password 驗證
    if ( isPsw == '' || !chkpsw.exec(isPsw) ) {
        str.push('須包含數字和英文字母')
        chk = false
        psw.classList.add('is-invalid')
    } else {
        chk = true
        psw.classList.remove('is-invalid')
    }
    
    // 切換狀態
    if (!chk) {
        msg.classList.add('alert-danger')
        msg.innerHTML = str.join('<br>')
    } else {
        msg.classList.remove('alert-danger')
        msg.innerHTML = ''
        msg.classList = 'alert'

        // 判斷按鈕
        if (e.target == signUpBtn) {
            postAjax(signupURL)
        } else if (e.target == signInBtn) {
            postAjax(signinURL)
        }
    }
}

signUpBtn.addEventListener('click', checkFunc)
signInBtn.addEventListener('click', checkFunc)



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
