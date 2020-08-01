<template>
	<view class="content">
		<goods-list :goodsList = "goodsList"></goods-list>
		<view class="overText" v-if="onGoods">---亲，没有更多的商品了---</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods_list/goods_list.vue'
	
	export default {
		components: { "goods-list": goodsList },
		data() {
			return {
				goodsList: [],
				pageIndex: 1,
				onGoods: false
			}
		},
		onLoad () {
			this.getShopList()
		},
		onReachBottom() {
			if (this.goodsList.length < 7*this.pageIndex) {
				this.onGoods = true
			} else {
				this.pageIndex++
				this.getShopList()
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.goodsList = []
				this.pageIndex = 1
				this.onGoods = false
				this.getShopList()
				uni.stopPullDownRefresh()
			}, 2000);
		},
		methods: {
			async getShopList () {
				let res = await this.$myRequest({
					url: `/indexShopGoods?pageIndex=${ this.pageIndex }`
				})
				this.goodsList = [...this.goodsList,...res.data.result]
			}
		}
	}
</script>

<style lang="scss">
	.overText {
		background-color: #eee;
		text-align: center;
		padding: 20rpx 0;
	}
	
</style>
