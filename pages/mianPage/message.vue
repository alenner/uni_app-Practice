<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{msg}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				msg: 'msgPage'
			}
		},
		onTabItemTap : function(e) {
		    console.log(e);
		    // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
