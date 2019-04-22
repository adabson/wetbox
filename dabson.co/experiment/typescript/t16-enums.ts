enum Emotion {
	Happy = 99, // 0 by default, this is basically the starting index
	Sad,
	Angry
}

var myFeeling = Emotion.Happy;

//myFeeling = 1;

writeLn( myFeeling ); // = Happy + 0
writeLn( Emotion.Sad ); // = Happy + 1
writeLn( Emotion.Angry ); // = Happy + 2