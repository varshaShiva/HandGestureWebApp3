

Webcam.set(
    {
        width:350,
        height:300,
        Image_format:'.png',
        png_quality:100
    }
);
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GN74tX2RV/model.json',modelLoaded)

function modelLoaded(){
    console.log('model loaded');
}

prediction_1="";
prediction_2="";

function speak(){
    var synth = window.speechSynthesis;
    speak_data1="The first prediction is "+prediction_1;
    speak_data2="The second prediction is "+prediction_2
    var utterThis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);

    function gotResult(error,results){
        if (error){
            console.error(error);
        }
        else{
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;

        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if (results[0].label=="Amazing"){
            document.getElementById("emoji1").innerHTML="&#128076;";
        }
        if (results[0].label=="Ok"){
            document.getElementById("emoji1").innerHTML="&#128077;";
        }
        if (results[0].label=="Victory"){
            document.getElementById("emoji1").innerHTML="&#9996;";
        }
        if (results[1].label=="Amazing"){
            document.getElementById("emoji2").innerHTML="&#128076;";
        }
        if (results[1].label=="Ok"){
            document.getElementById("emoji2").innerHTML="&#128077;";
        }
        if (results[1].label=="Victory"){
            document.getElementById("emoji2").innerHTML="&#9996;";
        }
        }
    }
}