$(document).ready(function(){
    let id = 1;
    let userData = "";
    let supporterData = "";
    let messageBoxIsShow = false;
    let newMassageSoun = "<audio id='new-massage'><source src='assets/audio/new-message.mp3' type='audio/mpeg'></audio>";
    let soundPosted = "<audio id='send-massage'><source src='assets/audio/send.mp3' type='audio/mpeg'></audio>";
    $("body").append(newMassageSoun);
    $("body").append(soundPosted);
   
    setInterval(() => {
        if (messageBoxIsShow) {
            fetchSupporterMessage();
            console.log("fetch data in server")
        }
    }, 5000);

    $(".online-chat").click(function () {
        console.log("this");
        messageBoxIsShow = true;
        $(this).fadeOut(200);
        $(".online-chat-section").fadeIn(500)
        console.log();
    })
    $(".chat-close-btn").click(function () {
        messageBoxIsShow = false;
        $(".online-chat-section").fadeOut(500)
        $(".online-chat").fadeIn(300)
    })
    $(".chat-btn").on("click", function () {
        let userMessage;
        $(".chat-input-text").val(function (index, value) {

            console.log(index, value)
            userMessage = value;
            // $(this).val = ""
            return "";
        });
        console.log(userMessage)
        if (userMessage != "") {

           $('.chat-message-box').animate({
               scrollTop: `${$(this).offset().top * 1000}px`
           }, 500);
            
            fetchUserDataHistory(userMessage);
            createUserMessage(userMessage)
        }
    })
    $(".chat-input-text").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        var value = event.target.value;
        if (keycode == '13' && value != "") {
            $('.chat-message-box').animate({
                scrollTop: `${$(this).offset().top * 1000}px`
            }, 500);
            createUserMessage(event.target.value)
            event.target.value = "";

        }
    });

    function createUserMessage(message) {
        let messageID = "mes_" + (++id)
        let messageDiv = "<div class='user-message'><div class='chat-avatar-img'><i class='fa fa-user' ></i></div><div class='text-chat'>"
        messageDiv += message + "</div><div class='chack-reserved " + messageID + "'><span>&#10004;</span></div></div>"
        $(".chat-message-box").append(messageDiv);
        $('audio#new-massage')[0].play()
        setTimeout(() => {
            $('audio#send-massage')[0].play()
            $(`.${messageID}`).append("<span>&#10004;</span>");
        }, 2000);
    }

    function createSupporterMessage(message) {
        let messageDiv = "<div class='chat-supporter-message'><div class='chat-avatar-img'><i class='fa fa-user' ></i></div><div class='chat-text-supporter'>"
        messageDiv += message + "</div></div>"
    }

    function fetchSupporterMessage() {
        $.ajax({
            url: "api url",
            method: "post & get",
            async: true,
            success: function () {
                createSupporterMessage(data)
            }
        })
    }

    function fetchUserDataHistory(userData) {
        $.ajax({
            url: "api url",
            method: "post & get",
            data: userData,
            async: true,
            success: function () {
                $("mes_" + id).append("<span>&#10004;</span>");
            }
        })
    }
    
})