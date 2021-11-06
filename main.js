video = "";
status = "";
objects = [];
var synth = window.speechSynthesis;

function setup() {
          canvas = createCanvas(350, 300);
          canvas.center();

          video = createCapture(VIDEO);
          video.size(380, 380);
          video.hide();

          objectDetector = ml5.objectDetector('cocossd', modelLoaded);
          document.getElementById("status").innerHTML = "Wait, we are Detecting object";

          msg2 = new SpeechSynthesisUtterance('Wait While We are Detecting the object');
          window.speechSynthesis.speak(msg2);
}

function modelLoaded() {
          console.log("The model has been initialized");
          status = true;
          objectDetector.detect(img, gotResults);
          msg = new SpeechSynthesisUtterance('The model has been successfully initialized');
          window.speechSynthesis.speak(msg);
}

function draw() {
          image(video, 0, 0, 350, 350);
          if (status != "") {
                    objectDetector.detect(video, gotResults);
                    for (var i = 0; i < objects.length; i++) {
                              document.getElementById("status").innerHTML = "Status: Object Has Been Detected";
                              document.getElementById("number_of_objects_found").innerHTML = "Number of Objects Found: " + objects.length;

                              fill("black");
                              percent = floor(objects[i].confidence * 100);
                              text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                              noFill();
                              stroke("black");
                              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    }
          }
}