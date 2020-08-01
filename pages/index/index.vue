<template>
	<view class="content">
		<swiper class="swiper" autoplay="true" interval="2000" duration="1000" indicator-dots="true" circular="true">
			<swiper-item class="swiper-item" v-for="(item,index) in swiperImg"><image class="lunbo" :src="item.src"></image></swiper-item>
		</swiper>
		<view class="uni-flex uni-row">
			<view class="flex-item" v-for="(item,index) in navs" :key= "index" @click="navigationTo(item.url)">
				<view class="icons"><uni-icons :type="item.iconType" size="30" color="#ffffff"></uni-icons></view>
				<view class="fonts">{{ item.text }}</view>
			</view>
		</view>
		<view class="titlebox">
			<view class="hotTitle">推荐商品</view>
		</view>
		<goods-list :goodsList = "goodsList"></goods-list>
	</view>
</template>

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	import goodsList from '../../components/goods_list/goods_list.vue'
	
	export default {
		components: { uniIcons,"goods-list": goodsList },
		data() {
			return {
				swiperImg: [
					{
						src: '../../static/shopGoods/lunbo1.jpg'
					},
					{
						src: '../../static/shopGoods/lunbo2.jpg'
					},
					{
						src: '../../static/shopGoods/lunbo3.jpg'
					},
					{
						src: '../../static/shopGoods/lunbo4.jpg'
					}
				],
				navs: [
					{
						text: 'XX商城',
						url: '/pages/shop_goods/shop_goods',
						iconType: 'shop'
					},
					{
						text: '联系我们',
						url: '/pages/call_us/call-us',
						iconType: 'chat'
					},
					{
						text: '社区图片',
						url: '/pages/pics/pics',
						iconType: 'image'
					},
					{
						text: '学习视频',
						url: '/pages/study_video/study_video',
						iconType: 'videocam'
					},
				],
				goodsList: [],
				pageIndex: 1
			}
		},
		onShareAppMessage() {
			
		},
		onLoad() {
			this.getShopList()
			this.test()
		},
		methods: {
			async getShopList () {
				let res = await this.$myRequest({
					url: '/indexShopGoods',
					data: { pageIndex: this.pageIndex }
				})
				this.goodsList = res.data.result
			},
			navigationTo (url) {
				uni.navigateTo({
				       url
				})
			},
			test () {
				for (let i=0;i<5;i++){
					setTimeout(() => {
						console.log(i)
					},100)
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 400rpx;
		.swiper-item {
			display: block;
			height: 400rpx;
			line-height: 300rpx;
			text-align: center;
		}
	}
	
	.lunbo {
		height: 400rpx;
		width: 750rpx;
	}
	
	.uni-flex {
		display: flex;
		padding: 20rpx 20rpx;
		.flex-item {
			margin: 0 auto;
			width: 120rpx;
			.icons {
				height: 120rpx;
				border-radius: 60rpx;
				background-color: $shop-color;
				text-align: center;
				line-height: 120rpx;
			}
			.fonts {
				font-size: 28rpx;
				text-align: center;
				margin: 20rpx 0;
			}
		}
	}
	
	.titlebox {
		background-color: #eeeeee;
		overflow: hidden;
		.hotTitle {
			height: 90rpx;
			line-height: 90rpx;
			color: $shop-color;
			text-align: center;
			background-color: #FFFFFF;
			margin: 7rpx 0;
			letter-spacing: 30rpx;
		}
	}
</style>
