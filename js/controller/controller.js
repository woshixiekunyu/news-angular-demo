//控制器
;(function(){
	var controllers = angular.module('controllers',[]);

	//主页
	controllers.controller('footerCtrl',['$scope','$location','$window',function($scope,$location,$window){
		$scope.name = 'xie';
		$scope.item = function(items){
			$scope.items = items;
		}
		$scope.isShowTips = true;
		$scope.showTip = function(){
			$scope.isShowTips = false;
		}
		$scope.back = function(){
			$scope.ifs();
			$window.history.back();
		}
		$scope.to = function(){
			$scope.ifs();
			$window.history.forward();
		}
		$scope.ifs = function(){
			if($location.$$url == '/index'){
				$scope.isShowTips = true;
			}
			if($location.$$url == '/index/tuijian'){
				$scope.items = 0;
				$scope.isShowTips = false;
			}else if($location.$$url == '/index/yule'){
				$scope.items = 1;
				$scope.isShowTips = false;
			}else if($location.$$url == '/index/shehui'){
				$scope.items = 2;
				$scope.isShowTips = false;
			}else if($location.$$url == '/index/junshi'){
				$scope.items = 3;
				$scope.isShowTips = false;
			}
		}
		$scope.ifs();

	}])


	controllers.controller('tuijianCtrl',['$scope','$http','$timeout','$document',function($scope,$http,$timeout,$document){
		$scope.name = '成语查询';
		$scope.isShowLoad = false;

		$scope.chengyuVal = '',
		$scope.ischengyuList = false;
		$scope.errchengyuList = false;
		$scope.searchChengyu = function(){
			$scope.isShowLoad = true;
			$timeout(function(){
				$http({
					url:'http://route.showapi.com/1196-2',
					method:'GET',
					params: {
						"showapi_appid":'36277',
						"showapi_sign": '56141c58028f4c41ae3977092aef073e',
						"keyword" : $scope.chengyuVal
					}
				}).then(function(data){
					
					if(data.data.showapi_res_body.data == undefined){
						$scope.ischengyuList = false;
						$scope.isShowLoad = false;
						$scope.errchengyuList = true;
						$scope.errBack = '成语搜索不到，请重新输入'
						return;
					}
						$scope.ischengyuList = true;
						$scope.isShowLoad = false;
						$scope.errchengyuList = false;
						console.log(data.data.showapi_res_body.data)
						$scope.content = data.data.showapi_res_body.data.content;
						$scope.derivation = data.data.showapi_res_body.data.derivation;
						$scope.samples = data.data.showapi_res_body.data.samples;
						$scope.spell = data.data.showapi_res_body.data.spell;

					
					
				},function(err){
					console.log(err,666)
				})
			},1500)
		}

		
	}])
	controllers.controller('yuleCtrl',['$scope','$http',function($scope,$http){
		$scope.name = '新闻娱乐';
		$scope.isShowLoad = false;
		$scope.issort = false;
		$scope.sort = function(){
			$scope.issort = !$scope.issort;
		}
		$scope.loadMore = function(){
			$scope.isShowLoad = true;
			function formatterDateTime() {
				var date=new Date()
				var month=date.getMonth() + 1
				var datetime = date.getFullYear()
		            + ""// "年"
		            + (month >= 10 ? month : "0"+ month)
		            + ""// "月"
		            + (date.getDate() < 10 ? "0" + date.getDate() : date
		                    .getDate())
		            + ""
		            + (date.getHours() < 10 ? "0" + date.getHours() : date
		                    .getHours())
		            + ""
		            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
		                    .getMinutes())
		            + ""
		            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
		                    .getSeconds());
				return datetime;
			}
			$http({
				url:'http://route.showapi.com/109-35',
				method:'GET',
				params: {
					"showapi_timestamp":formatterDateTime(),
					"showapi_appid":'26916',
					"showapi_sign": '72fa78be4c2045138d456456fb9a3a90' 
				}
			}).then(function(data){
				$scope.isShowLoad = false;
				// console.log(data.data.showapi_res_body.pagebean.contentlist)
				$scope.news = data.data.showapi_res_body.pagebean.contentlist.concat($scope.news)
			})
		}
		$scope.loadMore();
	}])
	controllers.controller('shehuiCtrl',['$scope','$http',function($scope,$http){
		$scope.name = '美女图片';
		$scope.page = 1;
		$scope.joke = []
		$scope.loadMore = function(){
			$http({
				url:'http://route.showapi.com/197-1',
				method:'GET',
				params:{
					"showapi_appid":'36277',
					"showapi_sign": '56141c58028f4c41ae3977092aef073e',
					"num":10,
					"page":$scope.page

				}
			}).then(function(data){
				console.log(data)
				console.log($scope.page)
				$scope.joke = $scope.joke.concat(data.data.showapi_res_body.newslist)
				$scope.page++
			})
			
		}
		$scope.loadMore()
	}])
	controllers.controller('junshiCtrl',['$scope',"$http",function($scope,$http){
		$scope.name = '电影排行';
		$scope.page = 1;
		$http({
			url:'http://route.showapi.com/341-3',
			method:'GET',
			params:{
				"showapi_appid":'36277',
				"showapi_sign": '56141c58028f4c41ae3977092aef073e',
				"page":$scope.page,
				"maxResult":10
			}
		}).then(function(data){
			console.log(data)
		})
		
	}])
	controllers.controller('tuijian-detailCtrl',['$scope','$state','$http',function($scope,$state,$http){

		$http({
			url:'data/detail.json',
			method:'GET'
			// params: {
			// 	id:$state.params.id
			// }
		}).then(function(data){
			for(var i=0;i<data.data.news_list.length;i++){
				if(data.data.news_list[i].id == $state.params.id){
					$scope.newsdata = data.data.news_list[i];
					break;
				}
			}
		})
	}])
	controllers.controller('shehui-detailCtrl',['$scope','$state','$http',function($scope,$state,$http){

		$http({
			url:'http://route.showapi.com/255-1',
			method:'GET',
			params: {
				"showapi_appid": '26916', 
				"showapi_sign": '72fa78be4c2045138d456456fb9a3a90'
			}
		}).then(function(data){
			// console.log(data)
			for(var i=0;i<data.data.showapi_res_body.pagebean.contentlist.length;i++){
				if(data.data.showapi_res_body.pagebean.contentlist[i].id == $state.params.id){
					$scope.newsdata = data.data.showapi_res_body.pagebean.contentlist[i];
					console.log($scope.newsdata)
					break;
				}
			}
		})
	}])
	
})();