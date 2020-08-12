const getElemt = (el) => {
    return document.querySelector(el)
}
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