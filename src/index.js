import * as Tonal from "@tonaljs/tonal";
import * as Tone from "tone";

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// console.log(Tonal.Key.minorKey("Ab"));
// console.log(';yo')

var piano = new Tone.Sampler({
    "A0" : "A0.[mp3|ogg]",
    "C1" : "C1.[mp3|ogg]",
    "D#1" : "Ds1.[mp3|ogg]",
    "F#1" : "Fs1.[mp3|ogg]",
    "A1" : "A1.[mp3|ogg]",
    "C2" : "C2.[mp3|ogg]",
    "D#2" : "Ds2.[mp3|ogg]",
    "F#2" : "Fs2.[mp3|ogg]",
    "A2" : "A2.[mp3|ogg]",
    "C3" : "C3.[mp3|ogg]",
    "D#3" : "Ds3.[mp3|ogg]",
    "F#3" : "Fs3.[mp3|ogg]",
    "A3" : "A3.[mp3|ogg]",
    "C4" : "C4.[mp3|ogg]",
    "D#4" : "Ds4.[mp3|ogg]",
    "F#4" : "Fs4.[mp3|ogg]",
    "A4" : "A4.[mp3|ogg]",
    "C5" : "C5.[mp3|ogg]",
    "D#5" : "Ds5.[mp3|ogg]",
    "F#5" : "Fs5.[mp3|ogg]",
    "A5" : "A5.[mp3|ogg]",
    "C6" : "C6.[mp3|ogg]",
    "D#6" : "Ds6.[mp3|ogg]",
    "F#6" : "Fs6.[mp3|ogg]",
    "A6" : "A6.[mp3|ogg]",
    "C7" : "C7.[mp3|ogg]",
    "D#7" : "Ds7.[mp3|ogg]",
    "F#7" : "Fs7.[mp3|ogg]",
    "A7" : "A7.[mp3|ogg]",
    "C8" : "C8.[mp3|ogg]"
}, {
    "release" : 1,
    "baseUrl" : "audio/"
}).toMaster();

var started = false;

document.addEventListener('keydown', async () => {
    if (started) return;
    started = true;

    await Tone.start()
    console.log('audio is ready')

    console.log(piano);
    // piano.triggerAttack("D4")


    // const loop = new Tone.Loop(time => {
    //     piano.triggerAttackRelease("D4", "8n", time);
    // }, "4n");

    // loop.start("1m").stop("4m");

    // Tone.Transport.scheduleRepeat(time => {
    //     piano.triggerAttack("D4", "8n", time);
    // }, "4n", '1m');

    var chordOneNotes = Tonal.Chord.get("Am").notes.map(note => note + "3");
    var chordTwoNotes = Tonal.Chord.get("G").notes.map(note => note + "3");
    var chordThreeNotes = Tonal.Chord.get("F").notes.map(note => note + "3");
    var myChords = [['0', chordOneNotes], ['1m', chordTwoNotes], ['2m', chordThreeNotes], ['3m', chordTwoNotes]];

    console.log*(myChords);

    var chordPart = new Tone.Part(function(time, chord){
		piano.triggerAttackRelease(chord, "2n", time);
	}, myChords ).start(0);

	chordPart.loop = true;
	chordPart.loopStart = "0:0";
	chordPart.loopEnd = "4:0";



    var scale = Tonal.Scale.get("c5 major").notes;
    var scalePerfect = ['A3', 'G3', 'F3', 'A4', 'G4', 'F4'];

    var note = new Tone.Event(function(time, pitch){
        // console.log(time, pitch);

        var x = Math.round(time*2)/2;
        console.log(x);

        var strategy = scale;

        if(x % 1  === 0) {
            strategy = scalePerfect;
        }

        var index = Math.round(Math.random() * (strategy.length - 1))
        var note = strategy[index];
        piano.triggerAttackRelease(note, "16n", time);
    });

    //set the note to loop every half measure
    note.set({
        "loop" : true,
        "loopEnd" : "4n"
    });
    // note.probability = 0.5;

    //start the note at the beginning of the Transport timeline
    // uncomment
    // note.start(0);

    //stop the note on the 4th measure
    // note.stop("4m");

    // var scale = shuffle(Tonal.Scale.get("c5 major").notes);
    // // console.log(scale, shuffle(scale))
    // var pattern = new Tone.Pattern(function(time, note){
    //     piano.triggerAttackRelease(note, 0.25);
    // }, scale, 'up');
    // pattern.start(0);

    function diff(context) {
        var cMajor = Tonal.Scale.get("C major").notes;
        // return context.transpose
        var transposeUp = !!Math.round(Math.random());

        var index = cMajor.indexOf(context[0]);
        var number = context[1];

        if(transposeUp) {
            if(index === cMajor.length - 1) { // note last in scale case
                number = number + 1;
            }
            return cMajor[(index + 1) % cMajor.length] + number;
        } else {
            if(index === 0) { // note first in scale
                index = cMajor.length;
                number = number - 1;
            }
            return cMajor[(index - 1)] + number;
        }

    }

    function firstLine(context, itemsLeft) {
        var result = [];

        while(itemsLeft > 0) {
            var note = diff(context);
            while(Tonal.distance(note, 'E5')[0] === '-') {// || isNaN(+Tonal.distance(note, 'F4')[0])) { // _ or is smaller than E4 (has positive number as first char) // risky
                note = diff(context);
            }
            result.push(note);
            context = note;

            itemsLeft--;
        }

        return result;
    }

    var melody = [
        'A4', 'E5', ...firstLine('E5', 2), 
        'D5', ...firstLine('D5', 3), 
        'A4', ...firstLine('A4', 3), 
        'D5', ...firstLine('D5', 3)
    ];

    console.log(melody);

    var seq = new Tone.Sequence(function(time, note){
        console.log(note);
        piano.triggerAttackRelease(note, "16n", time);
    }, melody);
    seq.start(0)
    seq.humanize = true;

    // Tone.Transport.start();
	Tone.Transport.start(0);

    // console.log(Tonal.distance('F5', 'E4'))

    // const synth = new Tone.Synth().toMaster();    // synth.triggerAttackRelease("C4", "8n");
    // const synth = new Tone.Synth().toDestination();
    //play a note every quarter-note
    // const loop = new Tone.Loop(time => {
    //     piano.triggerAttackRelease("C2", "8n", time);
    // }, "4n");
    // //loop between the first and fourth measures of the Transport's timeline
    // loop.start("1m").stop("4m");

    // Tone.Transport.start();

})
