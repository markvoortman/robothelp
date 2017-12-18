(function(){
  var functions=[];
  return myProcess ={
      engine_name_pronounce:["you might","you Mom","uma"],


      greetings:{
        "hey":{reply:"hey"},
        "hello":{reply:"hello dear!"},
        "hi":{reply:"hello!"},
        "how's everything":{reply:"everything is going great!"},
        "how are things":{reply:"everything is going great!"},
        "how's it going":{reply:"everything is going great!"},
        "how are you doing":{reply:"doing very good!"},
        "what's up":{reply:"the sky"},
        "what's new":{reply:"nothing"},
        "what's going on":{reply:"everything is going great!"},
        "how's life":{reply:"life is going great!"},
        "how's your day":{reply:"my day is going great so far!"},
        "how's your day going":{reply:"my day going great so far!"},
        "good to see you" :{reply:"good to see you too!"},
        "nice to see you":{reply:"nice to see you too!"},
        "long time no see" :{reply:"good to see you again"},
        "it's been a while":{reply:" good to see you again"},
        "good morning, Good afternoon":{reply:"morning!"},
        "good evening":{reply:"good evening!"},
        "it's nice to meet you":{reply:"mee too"},
        "pleased to meet you":{reply:"me too"},
        "how have you been":{reply:"I have been very good"},
        "how do you do":{reply:"good"},
        "yo":{reply:"yo"},
      },
      auxiliary_verbs:{
        "hasn't":{state:"negative"},
        "hadn't":{state:"negative"},
        "aren't":{state:"negative"},
        "haven't":{state:"negative"},
        "won't":{state:"negative"},
        "will":{state:"positive"},
        "might":{state:"positive"},
        "can":{state:"positive"},
        "would":{state:"positive"},
        "could":{state:"positive"},
        "are":{state:"positive"},
        "have":{state:"positive"},
        "has":{state:"positive"},
        "had":{state:"positive"},
        "dont't":{state:"negative"},
        "is":{state:"positive"},
        "does":{state:"positive"},
        "did":{state:"positive"},
        "am":{state:"positive"},
        "were":{state:"positive"},
        "was":{state:"positive"},
        "doesn't":{state:"negative"}
      },
      persons:{
        i:{referred:"user"},
        he:{referred:"he"},
        she:{referred:"her"},
        we: {referred:"us"},
        you: {referred:"system"},
        they: {referred:"them"},
      },
      question_helper:{
        "what":{referred:"something"},
        "where":{referred:"location"},
        "why":{referred:"reason"},
        "when":{referred:"moment"},
        "which":{referred:"choose"},
        "who":{referred:"person"},
        "how":{referred:"state"},
      },
      functions:{

      },
     questions:{
      "what,what's&your&name": {func:"speak",param:"my name is #"},
      "how&can&i&call&you": {func:"speak",param:"you can call me #"},
      "what&you&do": { func:"speak",param:"., I can help you find a location here at point park. I can help you find your teacher. I can tell you about some event on campus. Also, if you want another task for me, you can tell me, i will think about it for the future, just say, i have a suggestion, yuma",  },
      "have,has&suggestion,advice": {func:"analyze",param_x:"suggestion",},
      "suggestion,advice": {func:"analyze",param_x:"suggestion",},
      "angela": {func:"speak",param:"hi, how can I help",},
      "go&to&homepage": {func:"change_location",param:"home",},
      "go&home": {func:"change_location",param:"home",},
      "show&homepage": { func:"change_location",param:"home",},
      "show&home&screen": {  func:"change_location",param:"home",},
      "home&screen": { func:"change_location",param:"home",},
      "office&hours,hour,time,schedules,schedule": {  func:"analyze",param_x:"office_hours"  },
      "teacher,teachers&hours,hour,time,schedules,schedule": {  func:"analyze",param_x:"office_hours"  },
      "some&where,place,area,building": {  func:"analyze",param_x:"location"},
      "list,show&location,locations": {func:"analyze",param_x:"location"},
      "show,find&location,locations": {func:"analyze",param_x:"location"},
      "list,show&course,classes": {func:"analyze",param_x:"courses"},
      "someplace,somewhere": {func:"analyze",param_x:"location"},
      "event,events&today": {func:"analyze",param_x:"events"},
      "event,events&now": {func:"analyze",param_x:"events"},
      "event,events": {func:"change_location",param:"events?time=all",speak:"ok, i am showing at least 20 upcoming events"},
      "home&page": {func:"change_location",param:"home",},
      "about&page": {func:"change_location",param:"about",},
      "go&back": {func:"go_back",param:false,},
      "thanks": {func:"speak",param:"you are welcome .",},
      "thank&you": {func:"speak",param:"you are welcome .",},
      "my&name":{func:"say_user_name",param:"my name is lassana",},
      "who&you": {func:"speak",param:"I am web application",  },
      "help":{  func:"show_help",param:"none",},
      "stop":{  func:"stop",param:"none",},
      //locations
      "where&is":{func:"get_location",param:"x"},
      "how&do&i&get&to":{func:"get_location",param:"x"},
      "how&to&go&to":{func:"get_location",param:"x"},
      "how&do&i&go&to":{func:"get_location",param:"x"},
      "can&you&show&me&where":{func:"get_location",param:"x"},
      "can&you&show&me&way":{func:"get_location",param:"x"},
      "can&you&show&how&to&go":{func:"get_location",param:"x"},
      "show&me&way":{func:"get_location",param:"x"},
      "show&how&to&get&to":{func:"get_location",param:"x"},
      "show&how&to&go&to":{func:"get_location",param:"x"},
      "where's":{  func:"get_location",param:"x",},
      //class
      "find,show&class,glass,course":{ func:"get_class",param:"x",},
      "class,glass,course":{func:"get_class",param:"x",},
      //time
      "what&time&is&it":{func:"tell_time",param:false,},
      "tell&time":{func:"tell_time",param:false, },
      //weather
      "what's&weather":{func:"tell_weather",param:"x",},
      "what&is&weather":{func:"tell_weather",param:"x",},
      "tell,say,how&weather":{func:"tell_weather",param:"x",},
      //other
      "sleep,disactivate":{func:"disactivate",param:false, speak:'ok'},
      "how&old&are&you":{func:"speak",param:"i was born in 1882"},
     },
  }
})();
