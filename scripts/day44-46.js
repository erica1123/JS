// #44
const show = getElemt('.show')
function btn (i){
    return getElemt(`#btn${i}`)
}
function func (item, title, method){
    item.addEventListener('click', (e) => {
        e.preventDefault()
        show.innerHTML = `${title}：<span>${method}</span>`
    })
}

func(btn(1), '完整網址', location.href)
func(btn(2), '主機名稱', location.host)
func(btn(3), '網域名稱', location.hostname)
func(btn(4), '路徑名稱', location.pathname)
func(btn(5), '網址後的query值', location.search || '無')

// 重新整理
btn(6).addEventListener('click', (e) => {
    e.preventDefault()
    window.location.reload()
    // history.go(0)
    // location=location
    // location.assign(location)
    // location.replace(location)
})
// 上一頁
btn(7).addEventListener('click', (e) => {
    e.preventDefault()
    // history.go(-1) == window.history.go(-1)
    window.history.back()
})

// 下一頁
btn(8).addEventListener('click', (e) => {
    e.preventDefault()
    // window.history.go(1)
    window.history.forward()
})

// #45
getElemt('.google').addEventListener('click', (e) => {
    let url = 'https://www.google.com/'
    // window.open(url) // 另開新分頁
    location.assign(url)
})
getElemt('.yahoo').addEventListener('click', (e) => {
    let url = 'https://tw.yahoo.com/'
    location.assign(url)
})

// #46-1
const hexSchool = 'https://www.hexschool.com/'
const Tom = getElemt('.Tom')
const John = getElemt('.John')
function getDataId (item){
    return item.getAttribute('data-id')
}
Tom.addEventListener('click', function(){
    location.href = `${hexSchool}?recommend=${getDataId(Tom)}`
})
John.addEventListener('click', function(){
    location.href = `${hexSchool}?recommend=${getDataId(John)}`
})

// #46-2
getElemt('#addCmd').addEventListener('click', () => {
    location.href = location.pathname + `?recommend=Erica`
})
getElemt('#getValue').addEventListener('click', () => {
   const str = location.search.split('?recommend=')[1]
   getElemt('.ans46').innerHTML = str
})
