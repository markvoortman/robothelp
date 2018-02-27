# Robot Helper

## Description
**Robot Helper** is a voice assistant like Siri for Apple or Alexa for Amazon. However, Robot helper is specific to Point Park University. The goal of Robot Helper is to make accessing information easier for the Point Park community, here on campus.

## What Can Robot Helper Do?
Robot Helper can do the following, so far:
* Show Courses Information
* Show Location Information
* Show Teachers Office Hours
* Show Events On Campus
* Show Weather Information
* Show Time
* Respond to Some Greeting

## Usage
Robot helper is a work in progress. Consequently, it is not that easy for others developers to sinply add new feature to it unless they understand the logic of its Algorithm. We are still working on that!
However, developers can easily add new conversations by modifying a file called process.js.
Example: to add a conversation when users say hi Yuma or hi Angela, the developer needs to add this line to the questions object inside process.js
"hi&yuma,angela":{
   func:"speak",param:"Hello, how are you?",
},
* **&** meaning that both word are required
* **,** meaning either one is required
* **func** let you specify which function you want to use. Here we are using the function speak because we want the system to speak back to us.
* **param** is a parameter for the chosen function. Here we want the function speak to say "Hello, how are you?" when we say "hi Yuma or hi Angela" 

## Some Available Functions
* **show_help**
* **analyze**
  Example:
  ```
  "event,events&now": {
    func:"analyze",param_x:"events"
  },
  ```
* **change_location**
   Example:
   ```
   "about&page": {
     func:"change_location",param:"about",
   },
   ```
* **tell_time**
  Example:
  ```
  "what&time&is&it":{
    func:"tell_time",param:false,
  },
  ```
* **tell_weather**
  Example:
  ```
  "tell,say,how&weather":{
    func:"tell_weather",param:"x",
  },
  ```
* **get_class**
  Example:
  ```
  "class,course":{
    func:"get_class",param:"x",
  },
  ```
* **get_location**
  Example:
  ````
  "where's":{
    func:"get_location",param:"x",
  },
  ```
* **go_back**
  Example:
  ```
  "go&back": {
     func:"go_back",param:false,
  },
  ```
* **say_user_name**
  Example:
  ```
  "my&name":{
    func:"say_user_name",param:"my name is lassana",
  },
  ```

## Voice Recognition Analytics
### Problem
Building a voice assistant is not simple as it seems. As Bill Bryson said, “A computer is a stupid machine with the ability to do incredibly smart things, while computer programmers are smart people with the ability to do incredibly stupid things.”
A person needs to tell a computer what to do, how to do it, and when to do it, step by step with all the details.
The problem with voice recognition is that you never know what users are going to say, when they are going to say it, and how they are going to say it.
### Solution
One solution was to apply some Data Analytic to get a meaning of what users may say to Robot Helper.
For an easy example there are many ways a person can ask for a class. i.e. "show my class business law", "display business law class", "class business law", "find business law class", "find my business law class" ,"show business law". Each one of these phrases will make sense to a person; however, the computer does not understand any of these phrases. The solution was to find at least some keywords, when users are asking about a class, will be always there. Here the word 'show', 'class', and 'business' are showing in most of them. Now Robot Helper may assume that when there is a word 'show' with a word 'class', a user is most likely talking about a class. After assuming that the user is looking for a class, Robot Helper will go and check in all available classes. If the name of any class appears in what the user said. Robot Helper is now confident that the user is asking about a class. Consequently, information about the class will be displayed if there is only one match. However if  there are more matches, Robot helper will display some options where the user can choose from. 

## What's Next?
In the future, Robot Helper will be able to do the following:
* Give information about Point Park Bus Schedules
* Tell Students About their Homework
* Walk around Campus and Intearct with people
* and more...

## Contributors
* Lassana Konate
* Mattew Alexander

## Contribute
The first step is to fork this repository by clicking the `Fork` button at the top of [this page](https://github.com/markvoortman/robothelp) on the right. This will allow you to make changes and eventually you can create pull requests from your forked repository back into this one. After forking, make sure you have a projects directory under your home directory in your jail:
```
mkdir -p ~/projects
```
And change into this directory:
```
cd ~/projects
```
Then simply clone the forked repository:
```
git clone git@github.com:$USERNAME/robothelp.git
```
Make sure to replace $USERNAME with your own GitHub username, since that is where the forked repository should live.

You will need development secrets to run the code. Please email [mvoortman@pointpark.edu](mailto:mvoortman@pointpark.edu) to obtain them. Once received, simply put the `secrets.js` file in the main directory and run:
```
node robothelp.js
```
Note that not all functionality may work. If `node` is not installed, please follow [this tutorial](https://it.pointpark.edu/tutorials/node/).

If you make some changes and would like to contribute them back, please create a pull request to the original repository. Thank you in advance!
