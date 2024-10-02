import type { IShop } from '@/types'
import type { IList, IPaginate } from '@/types/list'
import axios from './base'

export function fetchShopList({ _page, _limit }: IPaginate) {
  return axios.get<IList<IShop>, IList<IShop>>('shop_list', {
    params: { _page, _limit },
  })
}
