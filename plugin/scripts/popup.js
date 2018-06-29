(function () {
    console.log("Loaded");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log("received msg back");
            if( request.message === "SAVE_DATA" ) {
                console.log(request.data);
                postData(request.data);
            }
        }
    );

    function postData(data){
        $.ajax({
            type : 'POST',
            url : 'http://172.19.6.150:8080/post',
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
                $("#success_msg").show();

            },
            error : function (error) {
                console.log(error);
                $("#error_msg").show();
            }
        });
    }

    function sendMessage(){

    }
})();