<template>
	<view class="content">
		<!-- 编辑按钮模块 -->
		<view class="top" v-if="mode === 'buy'"><text @click="exchangeMode">编辑</text></view>
		<view class="top" v-else><text @click="exchangeMode">完成</text></view>
		<!-- 购物车列表模块 -->
		
		<view class="shopCarList">
		<checkbox-group>
			<view class="shopVendor" v-for="(Item , index) in shopItem" :key="Item.vendorId">
				<!-- 商品全选模块 -->
				<view class="VendorTitle">
					<checkbox class="checkedAll" 
					:checked="JSON.stringify(goodsSelected).indexOf(JSON.stringify(Item)) !== -1"
					@click="goodsSelecteAll(Item)"/>
					<text>{{Item.vendorName}}</text>
				 </view>
				 <!-- 选择商品模块 -->
				 <checkbox-group>
					<view class="goodsList" v-for="goodsItem in Item.goods" :key="goodsItem.goodsId">
						<view class="goodsItem">
							<checkbox class="checkGoods" 
							:checked="JSON.stringify(goodsSelected).indexOf(JSON.stringify(goodsItem)) !== -1"
							@click="goodsSelecte(Item,goodsItem)"/>
							<image :src="goodsItem.thumb"></image>
							<view class="goodsContent">
								<text>{{ goodsItem.name }}...</text>
								<text>{{ goodsItem.details }}</text>
							</view>
						</view>
						<view class="chioceNum">
							<text class="goodsPrice">￥{{ goodsItem.price }}</text>
							<wm-numberBox class="goodsNum" :value="goodsItem.num" model="1" @change="change($event,goodsItem)"></wm-numberBox>
						</view>
					</view>
					</checkbox-group>
				 </view>
			</checkbox-group>
		</view>
		<!-- 结算/删除按钮模块 -->
		<view class="footerbtn">
			<view class="hendleGoods" v-if="mode === 'buy'">
				<checkbox class="checkAll" :checked="JSON.stringify(goodsSelected).indexOf(JSON.stringify(shopItem)) !== -1 && shopItem.length !== 0" @click="SelectAllvendor">
					<text>全选</text>
				</checkbox>
				<view class="totalPrice">
					<text>总价</text><text>￥{{ totalPrice.toFixed(2) }}</text>
				</view>
				<button type="default" class="handleBtn1">结算</button>
			</view>
			<view class="hendleGoods" v-else>
				<checkbox class="checkAll" :checked="JSON.stringify(goodsSelected).indexOf(JSON.stringify(shopItem)) !== -1 && shopItem.length !== 0" @click="SelectAllvendor">
					<text>全选</text>
				</checkbox>
				<button type="default" class="handleBtn2" @click="removeGoods">删除</button>
			</view>
		</view>
	</view>
</template>

<script>
 import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue"
	
	export default {
		components: { wmNumberBox },
		data() {
			return {
				shopItem: [
					{
						vendorId: 1,
						vendorName: "法国 banrock红酒庄",
						goods: [
							{
								goodsId: 1,
								thumb:
								"https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg",
								name: "好喝高颜值 MEOW莫斯卡托气泡葡萄酒甜型香槟少女粉猫起泡酒", details: "芭诺斯时光之约气泡酒 试饮装50ml",
								price: 25,
								num: 1
							},
							{
								goodsId: 2, 
								thumb:
								"https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg",
								name: "好喝高颜值 MEOW莫斯卡托气泡葡萄酒甜型香槟少女粉猫起泡酒", details: "芭诺斯晚霞气泡酒 250ml",
								price: 88,
								num: 1
							},
						]
					},
					{
						vendorId: 2,
						vendorName: "小西瓜之家",
						goods: [
							{
								goodsId: 3,
								thumb:
								"https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg",
								name: "上海南汇8424西瓜 1个 2.8kg以上/个正宗 8424脆甜皮薄当季新鲜", details: "小瓜（约 3斤/个）整箱（一箱 4个）",
								price: 25,
								num: 1
							}
						]
					}
				],
				totalPrice: 0,
				goodsSelected: [],
				mode: 'buy'
			}
		},
		onLoad () {
			
		},
		methods: {
			//结算界面和编辑界面的转换
			exchangeMode () {
				if (this.mode === 'buy') {
					this.mode = 'edit'
				} else {
					this.mode = 'buy'
				}
			},
			
			// 各个商家商品全选
			goodsSelecteAll (item) {
				let vendorItem = {...item}
				if (this.goodsSelected.find( Item => Item.vendorId === item.vendorId ) === undefined) {
					this.goodsSelected.push(vendorItem)
				} else if (JSON.stringify(this.goodsSelected.find( Item => Item.vendorId === item.vendorId ).goods).includes(JSON.stringify(item.goods))) {
					this.goodsSelected = this.goodsSelected.filter( Item => Item.vendorId !== item.vendorId )
				} else {
					this.goodsSelected.find( Item => Item.vendorId === item.vendorId ).goods = item.goods
				}
				this.getTotalPrice()
			},
			// 商品数量选中处理
			change (e,goodsItem) {
				goodsItem.num = e.value
				this.getTotalPrice()
			},
			// 每个商品选中事件处理
			goodsSelecte (vendorItem,goodsItem) {
				let vendor = this.goodsSelected.find( Item => Item.vendorId === vendorItem.vendorId )
				if (vendor === undefined) {
					let newVendor = {...vendorItem}
					newVendor.goods = [goodsItem]
					this.goodsSelected.push( newVendor )
				} else if (vendor.goods.find(Item => Item.goodsId === goodsItem.goodsId ) === undefined) {
					vendor.goods.push(goodsItem)
					vendor.goods.sort(this.sortGoods("goodsId"))
				} else {
					vendor.goods = vendor.goods.filter( item => item.goodsId !== goodsItem.goodsId)
					if (vendor.goods.length === 0) {
						this.goodsSelected = this.goodsSelected.filter( item => item.vendorId !== vendorItem.vendorId)
					}
				}
				this.getTotalPrice()
			},
			// 按Id排序商品，便于全选状态的识别
			sortGoods (keyWords) {
				return (a,b) => {
					let valueA = a[keyWords]
					let valueB = b[keyWords]
					return valueA - valueB
				}
			},
			// 选择所有商品
			SelectAllvendor () {
				if ( JSON.stringify(this.goodsSelected).indexOf(JSON.stringify(this.shopItem)) !== -1 ) {
					this.goodsSelected = []
				} else {
					let newGoodsSelected = []
					this.shopItem.forEach( item => newGoodsSelected.push({...item}))
					this.goodsSelected = newGoodsSelected
				}
				this.getTotalPrice()
			},
			// 计算总价
			getTotalPrice () {
				this.totalPrice = 0
				this.goodsSelected.forEach( item => item.goods.forEach( Item => this.totalPrice += Item.price*Item.num))
			},
			// 移除购物车
			removeGoods () {
				this.goodsSelected.forEach( item1 => {
					let vendorItem = this.shopItem.find( item => item.vendorId === item1.vendorId )
					item1.goods.forEach( item2 => {
						vendorItem.goods = vendorItem.goods.filter( item => item.goodsId !== item2.goodsId )
						})
					if(vendorItem.goods.length === 0) {
						this.shopItem = this.shopItem.filter( item => item.vendorId !== item1.vendorId )
					}
				})
				this.totalPrice = 0
				this.goodsSelected = []
			}
		}
	}	
</script>

<style lang="scss">
	// 复选框的样式
	checkbox {
		transform:scale(0.7);
		margin-right: 10rpx;
	}
	//顶部模块样式
	.top {
		position: fixed;
		width: 690rpx;
		top: 80rpx;
		/* #ifdef MP-WEIXIN */
		top: 0;
		/* #endif */
		height: 60rpx;
		background-color: #FFFFFF;
		z-index: 1;
		border-bottom: 5rpx solid #e8e8ee;
		padding: 20rpx 30rpx;
		text {
			float: right;
			line-height: 60rpx;
		}
	}
	// 购物车列表样式
	.shopCarList {
		width: 750rpx;
		padding-top: 10rpx;
		margin-bottom: 150rpx;
		margin-top: 100rpx;
		.shopVendor {
			width: 700rpx;
			margin: 20rpx auto;
			box-shadow: 0 0 10rpx -4rpx;
			border-radius: 20rpx;
			.VendorTitle {
				padding: 10rpx 20rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
			}
			.goodsList {
				padding: 10rpx 20rpx;
				border-top: 2rpx solid #dfdfe6 ;
				.goodsItem {
					display: flex;
					align-items: center;
					image {
						margin: 5rpx 10rpx;
						width: 160rpx;
						height: 160rpx;
					}
					.goodsContent{
						margin-left: 10rpx;
						height: 170rpx;
						text {
							display: block;
							font-size: 25rpx;
							width: 380rpx;
							padding: 10rpx 10rpx;
						}
						:nth-child(2) {
							background-color: #efefef;
							color: #8a8a8a;
							border-radius: 10rpx;
						}
					}
				}
				.chioceNum {
					position: relative;
					width: 350rpx;
					left: 37%;
					height: 80rpx;
					display: flex;
					align-items: center;
					text {
						font-size: 30rpx;
						color: $shop-car-color;
					}
					.goodsNum {
						padding-bottom: 5rpx;
						margin-left: 150rpx;
					}
				}
			}
		}
	}
	
	// 底部结算/管理按钮样式
	.footerbtn {
		border-top: 1rpx solid #c6c6c6;
		position: fixed;
		width: 750rpx;
		height: 80rpx;
		bottom: 100rpx;
		/* #ifdef MP-WEIXIN */
		bottom: 0;
		height: 110rpx;
		/* #endif */
		z-index: 1;
		background-color: #FFFFFF;
		.hendleGoods {
			display: flex;
			align-items: center;
			.checkAll {
				flex-grow: 4;
				text {
					font-size: 45rpx;
				}
			}
			.totalPrice {
				flex-grow: 1;
				color: #848484;
				:nth-child(2) {
					color: $shop-car-color;
				}
			}
			.handleBtn1 {
				flex-grow: 2.5;
				background-color: $shop-car-color;
				color: #FFFFFF;
				border-radius: 50rpx;
				transform: scale(0.8);
			}
			.handleBtn2 {
				flex-grow: 1;
				background-color: $shop-car-color;
				color: #FFFFFF;
				border-radius: 50rpx;
				transform: scale(0.8);
			}
		}
	}
</style>
