(function () {
    console.log("Content script : page load");
    //alert("Content script : page load");

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log("msg received");
            if( request.message === "clicked_browser_action" ) {
                onExtIconClick();
            }
        }
    );

    function onExtIconClick(){
        var url = $('meta[property="og:url"]').attr('content');
        var image = $('meta[property="og:image"]').attr('content');
        var title = $('meta[property="og:title"]').attr('content');
        var description = $('meta[property="og:description"]').attr('content');
        var obj = {
            message: "SAVE_DATA",
            data : {
                url : url || document.location.href,
                origin : document.location.origin,
                image : image,
                title : title,
                description : description
            }
        };
        chrome.runtime.sendMessage(obj);
    }
})();
