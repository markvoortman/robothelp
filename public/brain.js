(function(){
  return engine = {
    name:"angela",
    // find_name: function(x){
    //   if( x.indexOf(engine.name)!==-1){
    //     return true;
    //   }else {
    //     return false;
    //   }
    // },
    context:{
      context:"normal",
      data:false,
      current_page:false,
      current_context:false,
      flash_message:" ",
      example:'',
    }
    ,
    beep: function(){
      $(".audioDemo").trigger('play');
    },
    speak: function(x,after, callback){
      var that = this;
      function afterSpeech(){
      // //  console.log("after speech");
      //   try {
      //     that.beep();
      //   } catch (e) {
      //     //console.log(e);
      //   }
      }
      //console.log("call back", callback);
        speech.speak(x,after,afterSpeech,callback);
    },
    listen: function(x,after, callback){

        speech.listen();
    },
    analyze: function(x){

    }
  }
})();
