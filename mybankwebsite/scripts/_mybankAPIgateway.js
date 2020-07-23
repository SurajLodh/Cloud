	var _mybankAPIgateway = angular.module('_mybankAPIgateway', []); 

	_mybankAPIgateway.controller('_mybankAPIgatewayController', function ($scope, $http) {
	
	$scope.customer = {};
	$scope.account = {};
	$scope.moneytransfer = {};

	$scope.data = {
	
						query:"SELECT CONCAT( " + 
								" '[', " + 
							" GROUP_CONCAT(JSON_OBJECT(%fields%)), " +
								"']'" + 
								") as jsonresult from %TABLE_NAME%;" 
								 ,
						querytype:0,
						queryresponse:""
						};
						
	$scope.data.querytemplate = {
									"create": "INSERT INTO %TABLE_NAME% (%fields%) VALUES (%values%);", 
									"delete":"DELETE FROM %TABLE_NAME% WHERE _ID in ( %ID_LIST% );",
									"update":"UPDATE %TABLE_NAME% SET %fields% WHERE _id = %_ID%;",
									"read":"SELECT CONCAT( '[', GROUP_CONCAT(JSON_OBJECT(%fields%)),']') as jsonresult from  %TABLE_NAME% ;"
								};
	
	$scope.data.customer = {
								"tablename":"tCustomer",
								"insertfields":"customername,customeraddress,customerphone",
								"selectfields":"'_ID',_ID,'customername',customername,'customeraddress',customeraddress,'customerphone',customerphone"
							};
	
	$scope.data.account = {
								"tablename":"tAccount",
								"insertfields":"accountname,accountbalance",
								"selectfields":"'_ID',_ID,'accountname',accountname,'accountbalance',accountbalance"
							};

	$scope.data.moneytransfer = {
								"tablename":"tMoneytransfer",
								"insertfields":"from_account,to_account,amount",
								"selectfields":"'_ID',_ID,'from_account',from_account,'to_account',to_account,'amount',amount"
							};		
							
		$scope.customer.executequery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'POST',
						url: 'http://localhost:8081/mybank/customer/executequery/',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Customer Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //executequery function
		
		$scope.account.executequery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'POST',
						url: 'http://localhost:8082/mybank/account/executequery/',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Account service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //executequery function

        $scope.moneytransfer.executequery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'POST',
						url: 'http://localhost:8083/mybank/moneytransfer/executequery/',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Moneytransfer Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //executequery function

		
		$scope.data.customer.insertquery = function () 
		{
			var fieldvalues = "";
			$scope.data.query = $scope.data.querytemplate.create;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.customer.insertfields);
			
			fieldvalues = "'" + $scope.form.customer.name + "','" + $scope.form.customer.address + "','" + $scope.form.customer.phone + "'";
			
			$scope.data.query  = $scope.data.query.replace(/%values%/, fieldvalues);
			
			$scope.customer.executequery(); 
			
			
		}; //insertquery function
		
		$scope.data.customer.deletequery = function () 
		{
			
			$scope.data.query = $scope.data.querytemplate.delete;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%ID_LIST%/, $scope.form.customer._ID);
			
			$scope.customer.executequery(); 
			
			
		}; //deletequery function
		
		$scope.data.customer.updatequery = function () 
		{
			
			
			$scope.data.query = $scope.data.querytemplate.update;
			$scope.data.querytype = 1;
			
			$scope.data.customer.updatefields = "customername='" + $scope.form.customer.name + "',customeraddress='" + $scope.form.customer.address + "',customerphone='" + $scope.form.customer.phone + "'"; 
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.customer.updatefields);
			
			$scope.data.query  = $scope.data.query.replace(/%_ID%/, $scope.form.customer._ID);
			
			$scope.customer.executequery(); 
			
		}; //updatequery function
		
		$scope.data.customer.selectquery = function () 
		{
			
			//alert("select query called");
			
			$scope.data.query = $scope.data.querytemplate.read;
			
			$scope.data.querytype = 0;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.customer.selectfields);
			
			$scope.customer.executequery(); 
						
		}; //selectquery function


$scope.data.account.insertquery = function () 
		{
			var fieldvalues = "";
			$scope.data.query = $scope.data.querytemplate.create;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.account.insertfields);
			
			fieldvalues = "'" + $scope.form.account.name + "','" + $scope.form.account.balance + "'";
			
			$scope.data.query  = $scope.data.query.replace(/%values%/, fieldvalues);
			
			$scope.account.executequery(); 
			
			
		}; //insertquery function
		
		$scope.data.account.deletequery = function () 
		{
			
			$scope.data.query = $scope.data.querytemplate.delete;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%ID_LIST%/, $scope.form.account._ID);
			
			$scope.account.executequery(); 
			
			
		}; //deletequery function
		
		$scope.data.account.updatequery = function () 
		{
			
			
			$scope.data.query = $scope.data.querytemplate.update;
			$scope.data.querytype = 1;
			$scope.data.account.updatefields = "accountname='" + $scope.form.account.name + "',accountbalance='" + $scope.form.account.balance +"'";
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.account.updatefields);
			
			$scope.data.query  = $scope.data.query.replace(/%_ID%/, $scope.form.account._ID);
			
			$scope.account.executequery(); 
			
		}; //updatequery function
		
		$scope.data.account.selectquery = function () 
		{
			
			//alert("select query called");
			
			$scope.data.query = $scope.data.querytemplate.read;
			
			$scope.data.querytype = 0;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.account.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.account.selectfields);
			
			$scope.account.executequery(); 
						
		}; //selectquery function
$scope.data.moneytransfer.insertquery = function () 
		{
			var fieldvalues = "";
			$scope.data.query = $scope.data.querytemplate.create;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.moneytransfer.insertfields);
			
			fieldvalues = "'" + $scope.form.moneytransfer.from_account + "','" + $scope.form.moneytransfer.to_account + "','" + $scope.form.moneytransfer.amount + "'";
			
			$scope.data.query  = $scope.data.query.replace(/%values%/, fieldvalues);
			
			$scope.moneytransfer.executequery(); 
			
			
		}; //insertquery function
		
		$scope.data.moneytransfer.deletequery = function () 
		{
			
			$scope.data.query = $scope.data.querytemplate.delete;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%ID_LIST%/, $scope.form.moneytransfer._ID);
			
			$scope.moneytransfer.executequery(); 
			
			
		};


		$scope.data.moneytransfer.updatequery = function () 
		{
			
			
			$scope.data.query = $scope.data.querytemplate.update;
			$scope.data.querytype = 1;
			
			$scope.data.moneytransfer.updatefields = " amount = " + "'" + $scope.form.moneytransfer.amount + "'"; 
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.moneytransfer.updatefields);
			
			$scope.data.query  = $scope.data.query.replace(/%_ID%/, $scope.form.moneytransfer._ID);
			
			$scope.moneytransfer.executequery(); 
			
		}; //updatequery function
		
		$scope.data.moneytransfer.selectquery = function () 
		{
			
			//alert("select query called");
			
			$scope.data.query = $scope.data.querytemplate.read;
			
			$scope.data.querytype = 0;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.moneytransfer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.moneytransfer.selectfields);
			
			$scope.moneytransfer.executequery(); 
						
		}; //selectquery function

	}); /*mainApp.dataController*/
