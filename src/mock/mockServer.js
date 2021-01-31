//use mock js to provide mock data api


import Mock from 'mockjs'
import data from './data.json'

//return goods list
Mock.mock('/goods', { code: 0, data: data.goods })
//return ratings
Mock.mock('/ratings', { code: 0, data: data.ratings })
//return info
Mock.mock('/info', { code: 0, data: data.info })



