$(function () {
    $("#translate-button").on("click", function (event) {
        event.preventDefault();
        var inputText = document.getElementById("text").value;
        var lang = document.getElementById("select-language").value
        var translateData = { "text": inputText, "to": lang };

        $.ajax({
            url: "/text-translate",
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            dataType: "json",
            data: JSON.stringify(translateData),
            success: function (data) {
                var translatedText = data[0].translations[0].text;
                outputArea = document.getElementById("output-text");
                outputArea.textContent = translatedText;
            }
        })
    })
});

var phraseDiv;
var startRecognizeOnceAsyncButton;

var subscriptionKey, serviceRegion;
var SpeechSDK;
var recognizer;

document.addEventListener("DOMContentLoaded", function () {
    startRecognizeOnceAsyncButton = document.getElementById("translate-speech");
    //Enter your speech or cognitive services subscription key and region
    subscriptionKey = "";
    serviceRegion = "";
    phraseDiv = document.getElementById("speech-translated-text");

    $("#translate-speech").on("click", (event) => {
        console.log("Hello");
        startRecognizeOnceAsyncButton.disabled = true;
        phraseDiv.innerHTML = "";
        var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        speechConfig.speechRecognitionLanguage = "en-US";
        var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(
            function (result) {
                startRecognizeOnceAsyncButton.disabled = false;
                window.console.log(result);
                fromLanguage = document.getElementById("select-from-language").value;
                toLanguage = document.getElementById("select-to-language").value;
                requestData = { "text": result.text, "to": toLanguage };
                $.ajax({
                    url: "/text-translate",
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    dataType: "json",
                    data: JSON.stringify(requestData),
                    success: function (data) {
                        document.getElementById("speech-translated-text").textContent = data[0].translations[0].text;
                    }
                })
                recognizer.close();
                recognizer = undefined;
            });
    });
});

