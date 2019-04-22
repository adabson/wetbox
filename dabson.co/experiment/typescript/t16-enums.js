var Emotion;
(function (Emotion) {
    Emotion[Emotion["Happy"] = 99] = "Happy";
    Emotion[Emotion["Sad"] = 100] = "Sad";
    Emotion[Emotion["Angry"] = 101] = "Angry";
})(Emotion || (Emotion = {}));
var myFeeling = Emotion.Happy;
//myFeeling = 1;
writeLn(myFeeling); // = Happy + 0
writeLn(Emotion.Sad); // = Happy + 1
writeLn(Emotion.Angry); // = Happy + 2
