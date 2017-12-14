<center><h1>Robot Helper</h1> </center>

<center><h1>Description</h1> </center> 
<p><span style='color:red' >Robot helper</span> is a voice assistant like Siri for Apple or Alexa for Amazon. However, <span style='color:red' >Robot helper</span> is specific to Point Park University. The goal of Robot Helper is to make accessing information easier for point park community, here on campus</p>
<h6>What Robot Helper can do?</h6>
Robot Helper can do the following, so far:
<li>Show Courses Information </li>
<li>Show Location Information </li>
<li>Show Teachers Office Hours </li>
<li>Show Events On Campus </li>
<li>Show Weather Information </li>
<li>Show Time </li>
<li>Respond to Some Greeting </li>

<center><h1>Usage</h1> </center> 
Robot helper is a work in progress. Consequently, it is not that easy for others developers to sinply add new feature to it unless to understand the logic of its Algorithm. We are still working on that!
However, developers can easily add new conversations by modifying a file call process.js
Example: to add a conversation when user say hi Yuma or hi Angela, add this line to the questions object, inside process.js
"hi&yuma,angela":{
   func:"speak",param:"Hello, how are you?",
},
<li><b>&</b><li> meaning that both word are require
<li><b>,</b></li> meaning either one is require
<li><b>func</b></li> let you specify which function you want to use. Here we are using the function speak because we want the system to speak back to us.
<li><b>param</b></li> is a parameter for the chosen function. Here we want the function speak to say "Hello, how are you?" when we say "hi Yuma or hi Angela" 
<h6>Some Available Function:</h6>
<li><b>show_help</b></li>
<li><b>analyze</b></li>
Example: "event,events&now": {
            func:"analyze",param_x:"events"
          },
          
<li><b>change_location</b></li>
 Example:   "about&page": {
            func:"change_location",param:"about",
        },

<li><b>tell_time</b></li>
  Example:     "what&time&is&it":{
                func:"tell_time",param:false,
              },
<li><b>tell_weather</b></li>
  Example: "tell,say,how&weather":{
                  func:"tell_weather",param:"x",
            },
<li><b>get_class</b></li>
Example: "class,course":{
                func:"get_class",param:"x",
           },
<li><b>get_location</b></li>
Example:    "where's":{
                func:"get_location",param:"x",
            },
<li><b>go_back</b></li>
Example: "go&back": {
            func:"go_back",param:false,
          },
<li><b>say_user_name</b></li>
Example:  "my&name":{
            func:"say_user_name",param:"my name is lassana",
           },
<center><h1>Voice Recognition Analytic </h1> </center> 
<h6>Problem</h6>
Building a voice assistant is not simple as it seems. As a Computer scientist said, Computer is the dumbest thing. A person need to tell a computer what to do, how to do it, and when do it, step by step with all details.
The problem with voice recognition is that you never know what user are going to say, when they are going to say it, and how they are going to say it.
<h6>Solution</h6>
One solution was to apply some data Analytic to get a meaning of what user may say to Robot Helper.
for an easy Example there are many ways you can ask for a class. "show my class business Law", "display business law class", "class business law", "find business law class", "find my business Law Class" ,"show business law". each one of these Phrase will make sense to a person. however, the computer does not understand none of these Phrases. The solution was to find at least some keywords, that no matter what, when user are asking about a class, will be always there. here the word show, class and business is showing in almost all of them. Now Robot Helper may assume that when there is a word show with class, users is most likely talking about a class. After assuming, robot Helper will go and check in all available classes. if the name of any class appear in what users said. RoBot Helper is now confident that user is asking about a class. Consequently, information about the class will be display if there is only one macth. However if there is more class that macth what user is asking, Robot helper will display some options, where users can choose from. 
<h6>Problem</h6>

<center><h1>What's next </h1> </center> 
In the feature ,Robot Helper will be able to do the following:
<li>Give Information about Point Park Bus Schedules</li>
<li>Tell Students About their Homework</li>
<li>Walk around Campus and Intearct with people</li>
<li>and more...<li>


<center><h1>Contributing</h1> </center> 
<li>Lassana Konate</li>
<li>Mattew Alexamder</li>
