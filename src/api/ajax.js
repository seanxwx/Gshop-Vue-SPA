//ajax request function module
// return value: promise object(response.data)

import axios from 'axios'

export default function ajax(url, data={}, type='GET') {

	return new Promise(function (resolve, reject){
		//执行async request
		let promise
		if(type === 'GET') {
			//propare url query param
			let dataStr = ''
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&'
			})
			if(dataStr !== '') {
				dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
				url = url + '?' + dataStr
			}
			// send get request
			promise = axios.get(url)
		} else{
			//send post request
			promise = axios.post(url, data)
		}

		promise.then(function(response){
			//success: use resolve
			resolve(response.data)
		})
		.catch(function (error){
			//failed: use reject
			reject(error)
		})
		
		
	})
	

	
}
