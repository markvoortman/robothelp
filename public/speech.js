(function(){
  var recognition, speakIt,listening=true, hasResponded =false;
  return speech ={ speech: function(btnId, resul,audioStart, soundEnd,audioEnd,recognitionEnd, audioError,said,talking,doneSpeaking){
    //speech

    speakIt = new SpeechSynthesisUtterance();
    speakIt.voice = speechSynthesis.getVoices()[32];

    speakIt.lang= "en-US";
    speakIt.rate=1;
    speakIt.onend= function(){
      //console.log("speech ended");
      doneSpeaking();
    }
    //recognition
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.msSpeechRecognition)();//webkitSpeechRecognition();
    // var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = yuma;';
    // var speechRecognitionList = new SpeechGrammarList();
    // speechRecognitionList.addFromString(grammar, 1);
    // recognition.grammars = speechRecognitionList;
    recognition.lang ='en-US';//'en-US';'fr-FR'
    recognition.interimResults = true;

    recognition.onresult = function(event) {
      result(event);
      hasResponded = true;
    }
    recognition.onboundary = function(event) {
       //console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.');
    }
    recognition.onaudiostart = function(event){
       audioStart();
       hasResponded = false;
    }
    recognition.onsoundend = function(event){
       soundEnd(event);
    }
    recognition.onaudioend = function(event) {

        audioEnd(hasResponded,listening);
    }

    recognition.onerror = function(event){
      audioError(event);
    }

    recognition.onend = function(event) {
       recognitionEnd(event);
    }
    recognition.onspeechstart = function(e) {
      console.log('Speech has been detected');
    }
   recognition.onspeechend = function() {
     console.log('Speech has stopped being detected');
   }
   recognition.onnomatch = function() {
  console.log('Speech not recognised');
  }
  },
  stopRec:function(){
    try {
      recognition.abort();
      //console.log("abort");
    } catch (e) {
       console.log("Error aborting.......");
    }

  },
   listen: function(){
     try {
       recognition.start();
       //console.log("listening");
     } catch (e) {
        console.log("Error try listening.......");
     }

   },
   speak: function(text,callback){
         recognition.abort();
         talking();
         speakIt.voice = speechSynthesis.getVoices()[32];
         speakIt.text= text;
         said(text);
         speechSynthesis.speak(speakIt);

   },

  }
})();
