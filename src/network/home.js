import {request ,request1} from "./request";

export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request1({
    url: '/api/m5/home/data',
    params: {
      type,
      page
    }
  })
}
