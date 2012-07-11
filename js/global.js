$(document).ready(function() {
    $('a#send-post').click(function(){
        var text = $('textarea[name="message"]').val();
        postMessage(text)
        return false;
    }) 
    $('a#send-photo').click(function(){
        var file = $('input[type="file"]').val().replace(/.+[\\\/]/, "");
        createAlbum();
    }) 
    function postMessage(text) {
        VK.init({
            apiId: 3031984
        });
        VK.api('wall.post',{
            message: text
        }, function(data) {
            if (data.response) {
                alert('Message is sent. message id: ' + data.response.post_id);
                window.location.href = '/photo.php';
            } else {
                alert('Error: ' + data.error.error_code + ' ' + data.error.error_msg);
            }
        });
        VK.UI.button('login_button');
    }
    
    function createAlbum() {
        VK.init({
            apiId: 3031984
        });
        
        VK.Api.call('photos.getUploadServer', {'aid':150802604}, function(data){
            console.log(data)
        })
        
//        VK.api('photos.createAlbum',{
//            title: 'Море 2012'
//        }, function(data) {
//            if (data.response) {
//                console.log(data.response);
//            } else {
//                alert('Error: ' + data.error.error_code + ' ' + data.error.error_msg);
//            }
//        });
    }
})