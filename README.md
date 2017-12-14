<center><h1>Robot Helper</h1> </center>

<center><h1>Description</h1> </center> 
<p><span style='color:red' >Robot helper</span> is a voice assistant like Apple's Siri or Amazon's Alexa. However, <span style='color:red' >Robot helper</span> is specific to Point Park University. The goal of Robot Helper is to make accessing information easier for point park community, here on campus</p>
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
<center><h1>What's next </h1> </center> 
In the feature ,Robot Helper will be able to do the following:
<li>Give Information about Point Park Bus Schedules</li>
<li>Tell Students About their Homework</li>
<li>Walk around Campus and Intearct with people</li>
<li>and more...<li>


<center><h1>Contributing</h1> </center> 
<li>Lassana Konate</li>
<li>Mattew Alexamder</li>
