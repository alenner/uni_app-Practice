<template>
	<view class="goodsList">
		<view class="goodsItem" v-for="(item,index) in goodsList" :key="index">
			<view class="goodsImg"><image :src="item.imageUrl"></image></view>
			<view class="goodsPrice">
				<view class="newPrice">￥{{ item.newPrice }}</view>
				<view class="oldPrice">￥{{ item.oldPrice }}</view>
			</view>
			<view class="goodsContent"><text>{{ item.scriptText}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: [
			'goodsList'
		]
	}
</script>

<style lang="scss">
	.goodsList {
		display: flex;
		flex-wrap: wrap;
		background-color: #eeeeee;
		overflow: hidden;
		justify-content: space-between;
		padding: 10rpx 10rpx;
		.goodsItem {
			background-color: #FFFFFF;
			width: 355rpx;
			margin: 10rpx 0;
			.goodsImg {
				width: 100%;
				image {
					width: 100%;
				}
			}
			.goodsPrice {
				display: flex;
				margin: 10rpx 5rpx;
				color: $shop-color;
				.oldPrice{
					color: #C0C0C0;
					font-size: 28rpx;
					margin-left: 10rpx;
					line-height: 55rpx;
					text-decoration: line-through;
				}
			}
			.goodsContent {
				margin: 5rpx 10rpx;
				font-size: 30rpx;
				line-height: 45rpx;
			}
		}
	}
</style>
