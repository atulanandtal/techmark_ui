(function () {
    var base_url = "http://172.19.5.53:8080/";
    var loggedInUserId;
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log("received msg back");
            if( request.message === "SAVE_DATA" ) {
                console.log(request.data);
                postData(request.data);
            }
        }
    );

    document.getElementById("loginBtn").addEventListener("click", function(){
      console.log("Login Clicked");
      doLogin();
    });

    document.getElementById("open_techmark").addEventListener("click", function(){
      window.open("http://localhost:4200/#/user/home?userId="+loggedInUserId);
    });

    init();

    function init(){
      chrome.storage.local.get(['userObj'], function(result) {
        console.log('Value currently is ' + JSON.stringify(result));
        if(result.userObj){
          loggedInUserId = result.userObj.userId;
          onLoginSuccess();
        }
        else{
          onLoginFailure();
        }
      });
    }

    function onLoginSuccess(){
      $("#open_techmark").show();
      $("#login_container").hide();
      callClickAction();
    }

    function onLoginFailure(){
      $("#open_techmark").hide();
      $("#login_container").show();
    }

    function callClickAction(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        console.log("Sending msg");
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
      });
    }

    function setStorage(obj){
      chrome.storage.local.set({userObj : obj}, function() {
        console.log('Value is set to ' + value);
      });
    }

    function doLogin(){
      var emailId = $("#emailId").val();
      var password = $("#password").val();
      $.ajax({
        type : 'POST',
        url : base_url+'user/login',
        data : JSON.stringify({
          username : emailId,
          password : password
        }),
        dataType:"json",
        contentType: "application/json",
        success : function(result){
          console.log(result);
          loggedInUserId = result.userId;
          setStorage(result);
          onLoginSuccess();
          showSuccessMsg("Welcome" + result.username);
        },
        error : function (error) {
          console.log(error);
          onLoginFailure();
          showErrorMsg("Invalid Credentials");
        }
      });
    }

    function postData(data){
        $.ajax({
            type : 'POST',
            url : base_url+'post/'+loggedInUserId,
            data : JSON.stringify({
                url : data.url,
                imageUrl : data.image,
                title : data.title,
                description : data.description
            }),
            dataType:"json",
            contentType: "application/json",
            success : function(msg){
                console.log(msg);
                showSuccessMsg("Article posted successfully.");

            },
            error : function (error) {
                console.log(error);
                showErrorMsg("Oops something went wrong");
            }
        });
    }

    function showErrorMsg(msg){
      $("#success_msg").hide();
      $("#error_msg").show();
      $("#error_msg").text(msg);
    }

    function showSuccessMsg(msg){
      $("#success_msg").show();
      $("#error_msg").hide();
      $("#success_msg").text(msg);
    }
})();
