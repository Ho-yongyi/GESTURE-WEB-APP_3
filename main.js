// https://teachablemachine.withgoogle.com/models/knnghNW0h/
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='m' src='"+data_uri+"'>";
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/knnghNW0h/model.json',modelLoaded);
function modelLoaded()
{
    console.log('Model Loaded!');
}
prediction="";
function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is "+ prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById("m");
    classifier.classify(img, gotResults);
}
function gotResults(error, result)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(result);
        document.getElementById("result_gesture_name").innerHTML = result.label;
        prediction1 = result.label;
        speak();
        if(result.label == "amazing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(result.label == "best")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if(result.label == "victory")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
    }
}