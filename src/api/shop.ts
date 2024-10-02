import type { IList, IPaginate, IShop } from '@/types'
import axios from './base'

export function fetchShopList({ _page, _limit }: IPaginate) {
  return axios.get<IList<IShop>, IList<IShop>>('shop_list', {
    params: { _page, _limit },
  })
}
