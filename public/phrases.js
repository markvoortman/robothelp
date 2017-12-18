(function(){
  var descriptions=[];
  return sense ={
      greetings:{
        "hey":{reply:"hey, how can i help"},
        "hello":{reply:"hello, how can i help"},
        "hi":{reply:"hello!"},
        "how's everything":{reply:"everything is going great!"},
        "how are things":{reply:"everything is going great!"},
        "how's it going":{reply:"everything is going great!"},
        "how are you doing":{reply:"I am doing very good!, my battery is full of energy, ready to help!, what can i do for you?"},
        "how are you":{reply:"I am doing very good!, my battery is full of energy, ready to help!, what can i do for you?"},
        "what's up":{reply:"the sky is up, isn't it"},
        "what's new":{reply:"nothing"},
        "what's going on":{reply:"everything is going great!"},
        "how's life":{reply:"life is going great!"},
        "how's your day":{reply:"going great so far!"},
        "how's your day going":{reply:"going great so far!"},
        "good to see you" :{reply:"good to see you too!"},
        "nice to see you":{reply:"nice to see you too!"},
        "long time no see" :{reply:"good to see you again"},
        "it's been a while":{reply:"good to see you again"},
        "good morning":{reply:"morning!"},
        "good afternoon":{reply:"afternoon!, how can i help"},
        "good evening":{reply:"good evening!, how can i help"},
        "it's nice to meet you":{reply:"mee too"},
        "pleased to meet you":{reply:"me too"},
        "how have you been":{reply:"I have been very good"},
        "how do you do":{reply:"good"},
        "yo":{reply:"yo what's up?"},
        
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
      action_verbes:{ //action
        "go":{referred:"go somewhere"},
        "dance":{referred:"dance"},
        "show":{referred:"show something"},
        "display":{referred:"show something"},
        "say":{referred:"say something"},
        "list":{referred:"show something"},
        "stop":{referred:"stop something"},
      },
      days:["monday","tuesday","wednesday","thursday","friday","saturday","sunday","today","tomorrow","yesterday","fortnight"],
      months:["january","february","march","april","may","june"	,"july"	,"august",	"september",	"october",	"november","december"],
      number_ranks:["st","nd","rd","th"],
      objects:["teacher","course","event","location"],
      direction:["top","bottom","left","right"],
      meaning:function(phrase){
            descriptions=[]
            sense.isGreeting(phrase);
            sense.isObject(phrase);
            sense.isDate(phrase);
            sense.isDirection(phrase);
            sense.isAuxiliary_verbs(phrase);
            sense.isQuestion_helper(phrase);
            sense.isAction(phrase);
            sense.isPerson(phrase);
        return sense.getPhraseMeaning();
      },
      add:function(data){
        for(var i =0; i<descriptions.length; i++){
          if(descriptions[i].description === data.description){
            return true;
          }
        }
        descriptions.push(data);
      },
      isPerson:function(phrase){
        sense.phraseChech(phrase,sense.persons,"person");
      },
      isAuxiliary_verbs:function(phrase){
        sense.phraseChech(phrase,sense.auxiliary_verbs,"auxiliary_verb");
      },
      isQuestion_helper:function(phrase){
        sense.phraseChech(phrase,sense.question_helper,"question-helper");
      },
      isAction:function(phrase){
        sense.phraseChech(phrase,sense.action_verbes,"action-verbes");
      },
      isDirection: function(phrase){
        sense.simpleChech(phrase,sense.direction,"direction");
      },
      isGreeting:function(phrase){
         sense.phraseChech(phrase,sense.greetings,"greeting");
      },
      isObject:function(phrase){
        sense.simpleChech(phrase,sense.objects,"object");
      },
      isDate:function(phrase){
        sense.simpleChech(phrase,sense.days,"date");
        sense.simpleChech(phrase,sense.months,"date");
      },
      simpleChech: function(phrase0,target,describe){
        var phrase = phrase0.split(" ");
        for(var i =0; i< target.length; i++){
          for(var j =0; j< phrase.length; j++){
            if(target[i] === phrase[j] || target[i]+"s" === phrase[j]){
              var index = phrase0.indexOf(target[i]);
              sense.add({description:describe,target:target[i],index:index});
              return;
            }
          }
        }
      },
      phraseChech:function(phrase0,target,describe){
        phrase = phrase0.split(" ");
        for(key in  target){
          var greet = (key).split(" ");
          var findings=[];
          for(var i =0; i<greet.length; i++){
            var isThistrue = false;
            for(var j =0; j< phrase.length; j++){
              if(greet[i] === phrase[j] ){
                isThistrue = true;
              }
            }
            findings.push(isThistrue);
          }
          if(findings.indexOf(false)===-1){
             var index = phrase0.indexOf(greet[0]);
            sense.add({description:describe,target:key,data:target[key],index:index});
            return;
          }
        }
      },
      getPhraseMeaning:function(){
      descriptions.sort(function(a,b){
          return a.index > b.index;
        });
        try {
          if((descriptions[0].description==="question-helper" && descriptions[1].description==="auxiliary_verb") || (descriptions[0].description==="auxiliary_verb" && descriptions[1].description==="person")){
            return {about:descriptions[1].data.referred, question:(descriptions[0].data.referred?descriptions[0].data.referred:descriptions[0].data.state),descriptions};
          }
          else {
              return {descriptions};
          }
        } catch (e) {
          return {descriptions};
        } finally {

        }
      },
      verbes:{   //:{ past_simple:"", past_participle:""},
        a:{
            arise	:{ past_simple:"arose", past_participle:"arisen"},
            arise	:{ past_simple:"arose", past_participle:"arisen"},
            awake :{ past_simple:"awoke", past_participle:"awoken"},
        },
        b:{
          be:{ past_simple:["was","were"], past_participle:"been"},
          bear:{ past_simple:"bore", past_participle:["born","borne"]},
          beat:{ past_simple:"beat", past_participle:"beaten"},
          become:{ past_simple:"became", past_participle:"become"},
          begin:{ past_simple:"began", past_participle:"begun"},
          bend:{ past_simple:"bent", past_participle:"bent"},
          bet:{ past_simple:"bet", past_participle:"bet"},
          bind:{ past_simple:"bound", past_participle:"bound"},
          bite:{ past_simple:"bit", past_participle:"bitten"},
          bleed:{ past_simple:"bled", past_participle:"bled"},
          blow	:{ past_simple:"blew", past_participle:"blown"},
          break:{ past_simple:"broke", past_participle:"broken"},
          breed	:{ past_simple:"bred", past_participle:"bred"},
          bring:{ past_simple:"brought", past_participle:"brought"},
          broadcast:{ past_simple:"broadcast", past_participle:"broadcast"},
          build:{ past_simple:"built", past_participle:"built"},
          burn:{ past_simple:["burnt","burned"], past_participle:["burnt","burned"]},
          burst:{ past_simple:"burst", past_participle:"burst"},
          buy:{ past_simple:"bought", past_participle:"bought"},
        },
        c:{
          can:{ past_simple:"could", past_participle:["been","able"]},
          catch:{ past_simple:"caught", past_participle:"caught"},
          choose:{ past_simple:"chose", past_participle:"chosen"},
          cling:{ past_simple:"clung", past_participle:"clung"},
          come	:{ past_simple:"came", past_participle:"come"},
          cost	:{ past_simple:"cost", past_participle:"cost"},
          creep:{ past_simple:"crept", past_participle:"crept"},
          cut:{ past_simple:"cut", past_participle:"cut"},
        },
        d:{
          deal:{ past_simple:"dealt", past_participle:"dealt"},
          dig:{ past_simple:"dug", past_participle:"dug"},
          do:{ past_simple:"did", past_participle:"done"},
          draw:{ past_simple:"drew", past_participle:"drawn"},
          dream:{ past_simple:["dreamt","dreamed"], past_participle:["dreamt","dreamed"]},
          drink:{ past_simple:"drank", past_participle:"drunk"},
          drive:{ past_simple:"drove", past_participle:"driven"},
        },
        e:{
          eat:{ past_simple:"ate", past_participle:"eaten"},
        },
        f:{
          fall:{ past_simple:"fell", past_participle:"fallen"},
          feed	:{ past_simple:"fed", past_participle:"fed"},
          feel	:{ past_simple:"felt", past_participle:"felt"},
          fight:{ past_simple:"fought", past_participle:"fought"},
          find	:{ past_simple:"found", past_participle:"found"},
          fly:{ past_simple:"flew", past_participle:"flown"},
          forbid:{ past_simple:"forbade", past_participle:"forbidden"},
          forget:{ past_simple:"forgot", past_participle:"forgotten"},
          forgive:{ past_simple:"forgave", past_participle:"forgiven"},
          freeze	:{ past_simple:"froze", past_participle:"frozen"},
        },
        g:{
          get	:{ past_simple:"got", past_participle:"got"},
          give:{ past_simple:"gave", past_participle:"given"},
          go	:{ past_simple:"went", past_participle:"gone"},
          grind:{ past_simple:"ground", past_participle:"ground"},
          grow	:{ past_simple:"grew", past_participle:"grown"},
        },


        h:{
          hang:{ past_simple:"hung", past_participle:"hung"},
          have:{ past_simple:"had", past_participle:"had"},
          hear:{ past_simple:"heard", past_participle:"heard"},
          hide:{ past_simple:"hid", past_participle:"hidden"},
          hit	:{ past_simple:"hit", past_participle:"hit"},
          hold:{ past_simple:"held", past_participle:"held"},
          hurt:{ past_simple:"hurt", past_participle:"hurt"},
          keep:{ past_simple:"kept", past_participle:"kept"},
          kneel:{ past_simple:"knelt", past_participle:"knelt"},
          know:{ past_simple:"knew", past_participle:"known"},
        },
        l:{
          lay:{ past_simple:"laid", past_participle:"laid"},
          lead:{ past_simple:"led", past_participle:"led"},
          lean:{ past_simple:["leant","leaned"], past_participle:["leant","leaned"]},
          learn:{ past_simple:["learnt","learned"], past_participle:["learnt","learned"]},
          leave:{ past_simple:"left", past_participle:"left"},
          lent	:{ past_simple:"lent", past_participle:"lent"},
          lie :{ past_simple:"lay", past_participle:"lain", context:"bed"},
          lie :{ past_simple:"lied", past_participle:"lied"},
          light:{ past_simple:["lit","lighted"], past_participle:["lit","lighted"]},
          lose	:{ past_simple:"lost", past_participle:"lost"},
        },
        m:{
          make:{ past_simple:"made", past_participle:"made"},
          may:{ past_simple:"might", past_participle:"might"},
          mean:{ past_simple:"meant", past_participle:"meant"},
          meet:{ past_simple:"met", past_participle:"met"},
          mow	:{ past_simple:"mowed", past_participle:["mown","mowed"]},
          must:{ past_simple:"had to", past_participle:""},
        },
        o:{
        overtake:{ past_simple:"overtook", past_participle:"overtaken"},
        },
        p:{
          pay:{ past_simple:"paid", past_participle:"paid"},
          put:{ past_simple:"put", past_participle:"put"},
        },
        r:{
          read:{ past_simple:"read", past_participle:"read"},
          ride	:{ past_simple:"rode", past_participle:"ridden"},
          ring	:{ past_simple:"rang", past_participle:"rung"},
          rise	:{ past_simple:"rose", past_participle:"risen"},
          run	:{ past_simple:"ran", past_participle:"run"},
        },
        s:{
          saw:{ past_simple:"sawed", past_participle:["sawn","sawed"]},
          say:{ past_simple:"said", past_participle:"said"},
          see	:{ past_simple:"saw", past_participle:"seen"},
          sell:{ past_simple:"sold", past_participle:"sold"},
          send	:{ past_simple:"sent", past_participle:"sent"},
          set:{ past_simple:"set", past_participle:"set"},
          sew	:{ past_simple:"sewed", past_participle:["sewn","sewed"]},
          shake:{ past_simple:"shook", past_participle:"shaken"},
          shall:{ past_simple:"should", past_participle:""},
          shed	:{ past_simple:"shed", past_participle:"shed"},
          shine:{ past_simple:"shone", past_participle:"shone"},
          shoot:{ past_simple:"shot", past_participle:"shot"},
          show	:{ past_simple:"showed", past_participle:"shown"},
          shrink:{ past_simple:"shrank", past_participle:"shrunk"},
          shut:{ past_simple:"shut", past_participle:"shut"},
          sing:{ past_simple:"sang", past_participle:"sung"},
          sink:{ past_simple:"sank", past_participle:"sunk"},
          sit	:{ past_simple:"sat", past_participle:"sat"},
          sleep:{ past_simple:"slept", past_participle:"slept"},
          slide:{ past_simple:"slid", past_participle:"slid"},
          smell:{ past_simple:"smelt", past_participle:"smelt"},
          sow	:{ past_simple:"sowed", past_participle:["sown","sowed"]},
          speak:{ past_simple:"spoke", past_participle:"spoken"},
          spell:{ past_simple:["spelt","spelled"], past_participle:["spelt","spelled"]},
          spend:{ past_simple:"spent", past_participle:"spent"},
          spill:{ past_simple:["spilt","spilled"], past_participle:["spilt","spilled"]},
          spit	:{ past_simple:"spat", past_participle:"spat"},
          spread:{ past_simple:"spread", past_participle:"spread"},
          stand:{ past_simple:"stood", past_participle:"stood"},
          steal:{ past_simple:"stole", past_participle:"stolen"},
          stick:{ past_simple:"stuck", past_participle:"stuck"},
          sting:{ past_simple:"stung", past_participle:"stung"},
          stink:{ past_simple:"stank", past_participle:"stunk"},
          strike:{ past_simple:"struck", past_participle:"struck"},
          swear:{ past_simple:"swore", past_participle:"sworn"},
          sweep	:{ past_simple:"swept", past_participle:"swept"},
          swell	:{ past_simple:"swelled", past_participle:["swollen","swelled"]},
          swim	:{ past_simple:"swam", past_participle:"swum"},
          swing	:{ past_simple:"swung", past_participle:"swung"},
        },
        t:{
          take	:{ past_simple:"took", past_participle:"taken"},
          teach	:{ past_simple:"taught", past_participle:"taught"},
          tear	:{ past_simple:"tore", past_participle:"torn"},
          tell	:{ past_simple:"told", past_participle:"told"},
          think:{ past_simple:"thought", past_participle:"thought"},
          throw	:{ past_simple:"threw", past_participle:"thrown"},
        },
        u:{
          understand:{ past_simple:"understood", past_participle:"understood"},
        },
        w:{
          wake	:{ past_simple:"woke", past_participle:"woken"},
          wear	:{ past_simple:"wore", past_participle:"worn"},
          weep	:{ past_simple:"wept", past_participle:"wept"},
          will	:{ past_simple:"would", past_participle:""},
          win	:{ past_simple:"won", past_participle:"won"},
          wind:{ past_simple:"wound", past_participle:"wound"},
          write:{ past_simple:"wrote", past_participle:"written"},
        },
      }
  }
})();
