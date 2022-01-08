sound = "";

score_leftWrist = 0;
score_rightWrist = 0;

x_leftWrist = 0;
x_rightWrist = 0;

y_leftWrist = 0;
y_rightWrist = 0;


function preload() {
    sound = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600 , 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

    posenet = ml5.poseNet(video , modelLoaded)
    posenet.on('pose' , gotPoses)
}

function modelLoaded() {
    console.log("Model Loaded !")
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)
        score_leftWrist = results[0].pose.leftWrist.confidence
        score_rightWrist = results[0].pose.rightWrist.confidence
        //console.log(score_leftWrist , score_rightWrist)

        x_leftWrist = results[0].pose.leftWrist.x
        x_rightWrist = results[0].pose.rightWrist.x
        //console.log(x_leftWrist , x_rightWrist)

        y_leftWrist = results[0].pose.leftWrist.y
        y_rightWrist = results[0].pose.rightWrist.y
        //console.log(y_leftWrist , y_rightWrist)
    }
}

function draw() {
    image(video , 0, 0, 600, 500)
    stroke("red")
    fill("red")

    if(score_leftWrist > 0.2) {
        circle(x_leftWrist , y_leftWrist , 20)

        leftWrist_y = Number(y_leftWrist)
        remove_decimals = Math.floor(leftWrist_y)
        volume = remove_decimals/500
        v = 1-volume
        vol = Number(v.toFixed(2))
        document.getElementById("volume").innerHTML = "Volume = " + vol
        sound.setVolume(vol)
    }

    if(score_rightWrist > 0.2) {
        circle(x_rightWrist , y_rightWrist , 20)

        if(y_rightWrist > 0 && y_rightWrist <= 100) {
            document.getElementById("speed").innerHTML =  "Speed = 2.5x"
            sound.rate(2.5)
        }else if(y_rightWrist > 100 && y_rightWrist <= 200) {
            document.getElementById("speed").innerHTML =  "Speed = 2x"
            sound.rate(2)
        }else if(y_rightWrist > 200 && y_rightWrist <= 300) {
            document.getElementById("speed").innerHTML =  "Speed = 1.5x"
            sound.rate(1.5)
        }else if(y_rightWrist > 300 && y_rightWrist <= 400) {
            document.getElementById("speed").innerHTML =  "Speed = 1x"
            sound.rate(1)
        }else if(y_rightWrist > 400) {
            document.getElementById("speed").innerHTML =  "Speed = 0.5x"
            sound.rate(0.5)
        }
    }

}

function play() {
    sound.play()
    sound.setVolume(1)
    sound.rate(1)
}

function stop() {
    sound.stop()
    sound.setVolume(1)
    sound.rate(1)
    document.getElementById("volume").innerHTML = "Volume"
    document.getElementById("speed").innerHTML = "Speed"
}