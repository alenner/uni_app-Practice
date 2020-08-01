
// #ifdef MP-WEIXIN
let baseUrl = 'http://127.0.0.1:3000'
// #endif
// #ifdef H5
let baseUrl = '/api'
// #endif
exports.myRequest = (options) => {
	return new Promise ((resolve,reject) => {
		uni.request({
			url: baseUrl+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if( res.data.status === 0) {
					return uni.showToast({
						title: '数据请求失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					title: '数据请求出错'
				})
				reject(err)
			}
		})
	})
}