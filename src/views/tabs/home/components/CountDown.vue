<script setup lang="ts">
import type { ICountdown } from '@/types'
import { useCountDown } from '@/use/useCountDown'

interface IProps {
  data: ICountdown
}
const props = defineProps<IProps>()

const countDown = useCountDown({
  time: props.data.time,
})
// 开始计时
countDown.start()
const { current } = countDown

function padStart(num: number) {
  return num.toString().padStart(2, '0')
}
</script>

<template>
  <div class="home-countdown">
    <div class="home-countdown__info">
      <img class="logo" src="@/assets/imgs/index_page/count-down.png">
      <span class="number">{{ padStart(current.hours) }}</span>
      <span class="colon">:</span>
      <span class="number">{{ padStart(current.minutes) }}</span>
      <span class="colon">:</span>
      <span class="number">{{ padStart(current.seconds) }}</span>
    </div>
    <div class="home-countdown__goods">
      <img class="goods-img" :src="data.goods.imgUrl">
      <div class="goods-name op-ellipsis">
        {{ data.goods.name }}
      </div>
      <div class="goods-price">
        <span class="goods-price__now">
          ￥<span>{{ data.goods.price }}</span>
        </span>
        <span class="goods-price__old">￥{{ data.goods.oldPrice }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-countdown {
  box-sizing: border-box;
  justify-content: flex-end;
  width: 180px;
  height: 170px;
  padding: 15px 10px;
  background: linear-gradient(to bottom, rgb(252 202 202), white, white, white);
  border-radius: 8px;

  &__info {
    display: flex;
    align-items: center;

    .logo {
      width: 80px;
      margin-right: 8px;
    }

    .number {
      width: 16px;
      padding: 2px;
      font-size: 12px;
      font-weight: bold;
      color: white;
      background: rgb(252 78 78);
      border-radius: 2px;
    }

    .colon {
      margin: 0 1px;
      color: red;
    }
  }

  &__goods {
    margin-top: 8px;

    .goods-img {
      width: 160px;
      height: 74px;
      margin-bottom: 4px;
    }

    .goods-price {
      align-items: baseline;
      font-size: 12px;

      &__now {
        margin-right: 4px;
        color: red;

        span {
          font-size: 16px;
          font-weight: bold;
        }
      }

      &__old {
        text-decoration: line-through;
      }
    }
  }
}
</style>
