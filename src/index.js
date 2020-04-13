import * as Tonal from "@tonaljs/tonal";
import * as Tone from "tone";


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

document.addEventListener('keydown', async () => {
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

    var chord = Tonal.Chord.get("C");
    console.log(chord);
    var chordPattern = new Tone.Pattern(function(time, note){
        chord.notes.forEach(note => {
            piano.triggerAttackRelease(note + "3", 0.25);
        })
    }, scale, 'up');
    chordPattern.start(0).stop(3);
    
    var scale = Tonal.Scale.get("c5 major").notes;
    var pattern = new Tone.Pattern(function(time, note){
        piano.triggerAttackRelease(note, 0.25);
    }, scale, 'up');
    pattern.start(0);


    Tone.Transport.start();

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
