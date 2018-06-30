(function () {
    var base_url = "http://172.19.5.53:8080/";
    var loggedInUserId;
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log("received msg back");
            if( request.message === "SAVE_DATA" ) {
                console.log(request.data);
                //postData(request.data);
                getCategory(request.data);
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
                description : data.description,
                siteRank : data.siteRank
            }),
            dataType:"json",
            contentType: "application/json",
            success : function(msg){
                console.log(msg);
                if(msg.successFlag){
                  showSuccessMsg("Article posted successfully.");
                }
                else{
                  showErrorMsg(msg.errorMsg);
                }

            },
            error : function (error) {
                console.log(error);
                showErrorMsg("Oops something went wrong");
            }
        });
    }

    function getCategory(data){
      console.log("getting category", data.url);
      var auth = "Basic " + btoa("qaGM2Sh3cNqitx9uJrfp:umjeDX3ymHc34jjklHXs");
      $.ajax({
        type : 'GET',
        url : "https://api.webshrinker.com/categories/v3/"+ btoa(data.url),
        headers : {
          "Authorization" : auth
        },
        dataType:"json",
        contentType: "application/json",
        success : function(result){
          console.log(result);
          if(result.data[0].categories[0].id == "IAB19"){
            getSiteRank(data);
            //postData(data);
          }
          else{
            showErrorMsg("Non technical articles are not allowed.");
          }
        },
        error : function (error) {
          console.log(error);
        }
      });
    }

    function getSiteRank(data){
      console.log("Getting site rank");
      $.ajax({
        type : 'GET',
        url : "http://data.alexa.com/data?cli=10&dat=s&url="+ data.origin,
        dataType:"json",
        contentType: "application/json",
        success : function(result){
          r = /<REACH RANK="(\d+)"/g;
          n = r.exec(result.responseText);
          data.siteRank = n[1];
          postData(data);
        },
        error : function (result) {
          r = /<REACH RANK="(\d+)"/g;
          n = r.exec(result.responseText);
          data.siteRank = n[1];
          postData(data);
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
