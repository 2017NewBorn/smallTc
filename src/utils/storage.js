export function getStorage(value){
     return new Promise((resolve, reject) => {
          wx.getStorage({
              key: value,
              success: (result) => {
                  resolve(result.data)
              },
              fail: (err) => {
                  reject(err)
              },
          });
            
     });
}
export function showToast(icon,title){
   wx.showToast({
       title: title,
       icon: icon,
       duration: 1500
   });
     
}
const host2 = 'http://localhost:8080'
export function request(url, method, data) {
  wx.showToast({
    icon:'loading',
    title:'加载中...'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url:host2+url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json"
      },
      success: res => {
        wx.hideToast()
        resolve(res)
      },
      fail: err => {
        console.log(err)
        wx.hideToast()
        reject(err)
      }
    });
  });
}
export function get(url, data) {
    return request(url, 'GET', data)
  }
  export function post(url, data) {
    return request(url, 'POST', data)
  }