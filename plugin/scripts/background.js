(function () {
    chrome.runtime.onInstalled.addListener(function() {
        console.log("on add");
    });

    chrome.browserAction.onClicked.addListener(function(tab) {
        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
        });
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
            data : {
                url : data.url,
                imageUrl : data.image,
                title : data.title,
                description : data.description
            },
            dataType:"json",
            success : function(msg){
                console.log(msg);
            }
        });
    }

})();