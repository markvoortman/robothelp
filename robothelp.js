var express = require('express');
var fs = require("fs");
var csv = require("fast-csv");
var secrets = require('./secrets.js');
var Browser = require("zombie");
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var WordPOS = require('wordpos'),
    wordpos = new WordPOS();
var mysql = require('mysql');
var app = express();
var handlebars = require('express-handlebars').create(
    {defaultLayout:"main",
    helpers: {
       upercase: function (a) { return upperCaseFirstLetter(a); },
       bar: function () { return 'BAR!'; }
    }
   });

function upperCaseIt(word){
  return word[0].toUpperCase()+word.substring(1,word.length);
}
function upperCaseFirstLetter(word0){
  var word = (word0?word0.split("_"):false);
  var new_Word=false;
  if(word){
    for(var i =0; i<word.length; i++){
      if(!new_Word){
        new_Word = upperCaseIt(word[i]);
      }else {
          new_Word+=" "+upperCaseIt(word[i]);
      }
    }
    return new_Word;
  }else {
    return word0;
  }
}
var campus_events = [];
var client_secret ;
browser = new Browser();

function connect(cb){
  try {
    var con = mysql.createConnection({
      host: secrets.host,
      user: secrets.user,
      password: secrets.password,
      database: secrets.database
    });
  }
  catch (e) {
    console.log("ERROR: connect: mysql.createConnection(): " + e);
  }
  con.connect(function(err) {
    if (err){
      console.log("ERROR: connect: con.connect(): " + err);
    }
    else {
      try {
        cb(con);
      }
      catch(e) {
        console.log("ERROR: connect: cb(con): " + e);
      }
      // close connection after 60 seconds
      setTimeout(function() {
        try {
          con.end();
        }
        catch (e) {
          console.log("ERROR: connect: con.end(): " + e);
        }
      }, 60*1000);
    }
  });
}

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  client_secret = content;
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  //authorize(JSON.parse(content), listEvents);//-my changes
  //####
});
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

 function listEvents(auth) {
  //  var calendar = google.calendar('v3');
  //  calendar.events.list({
  //    auth: auth,
  //    calendarId: '85k2sn3kjstbhdmtp7e03rfsgh3e8t24@import.calendar.google.com',
  //    timeMin: (new Date()).toISOString(),
  //    maxResults: 20,
  //    singleEvents: true,
  //    orderBy: 'startTime'
  //  }, function(err, response) {
  //    if (err) {
  //      console.log('The API returned an error: ' + err);
  //      return;
  //    }
  //    var events = response.items;
  //    if (events.length == 0) {
  //      console.log('No upcoming events found.');
  //    } else {
  //      console.log('Upcoming 10 events:');
  //      for (var i = 0; i < events.length; i++) {
  //        var event = events[i];
  //        var start = event.start.dateTime || event.start.date;
  //        console.log('%s - %s', start, event.summary,"description:",event.description,"location:",event.location);
  //      }
  //    }
  //  });
 }
  function findEvent(the_event){

   //...
  }

app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.set('port', process.env.PORT || 3001);

app.use(function(req, res, next) {
  if (req.get("X-Authentication-Key") === secrets.authentication.key) {
    next();
  }
  else {
    res.status(401);
    res.setHeader("content-type", "text/plain");
    res.send("401 Unauthorized");
  }
});

app.use(express.static(__dirname +'/public'));
app.use( function( req, res, next){
  res.locals.showTests = app.get(' env') !== 'production' && req.query.test === '1';
  next();
 });
app.use(require('body-parser').urlencoded({extended:true}));
app.get("/home", function(req,res){
  res.render("home");
});
app.get("/about", function(req,res){
  res.render("about", {
          pageTestScript: '/qa/tests-about.js'
  });
});
app.get("/department", function(req,res){
  //console.log(req.query.text);
  res.render("department",{data:findDepartments(req.query.text)});
});
app.get("/locations", function(req,res){
   //res.render("locations");
   if(req.query.location){
     var result = findDepartments(req.query.location);
     result.candidates.sort(function(a,b){
       if(a.department < b.department) return -1;
       if(a.department > b.department) return 1;
       return 0;
     })
     res.render("locations",{location:  result});
   }else {
     res.render("locations",{location:false});
   }
});
app.get("/events", function(req,res){
  console.log("displaying events");
   //res.render("locations");
   var days=[ "sunday", "monday","tuesday","wednesday","thursday", "friday", "saturday"];
   var months= ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
   if(req.query.time){//req.query.name
     authorize(JSON.parse(client_secret), function(auth){
       var calendar = google.calendar('v3');
       calendar.events.list({
         auth: auth,
         calendarId: '3mefkltm4vavlr2gmrn5mfctsmmtn6qi@import.calendar.google.com',
         timeMin: (new Date()).toISOString(),
         maxResults: 100,
         singleEvents: true,
         orderBy: 'startTime'
       }, function(err, response) {
         if (err) {
           console.log('The API returned an error: ' + err);
           return;
         }
         var events = response.items;
         myEvents=[];
         if (events.length == 0) {
           //console.log('No upcoming events found.');
           res.render("event",{data:"No upcoming events found"});
         } else {
           //console.log('Upcoming 10 events:',req.query.time,req.query.value);
           var td = new Date();
           for (var i = 0; i < events.length; i++) {
             var event = events[i];
             var start = event.start.dateTime || event.start.date;
             //console.log('%s - %s', start, event.summary,"description:",event.description,"location:",event.location);
             var d = new Date(Date.parse(event.start.dateTime));
             var en = new Date(Date.parse(event.end.dateTime));
             //console.log(days[d.getDay()],months[d.getMonth()], d.getDate(), "year",d.getFullYear(),"hours",d.getHours(),event.summary);
             switch (req.query.time) {
               case "specific":
                var specific = (req.query.value).split(" ");
                var findings = [];
                for(var j=0; j<specific.length; j++){
                   if(chech((event.summary).toLowerCase(),[specific[j]])){
                     //console.log(event.summary.toLowerCase(),"|||| ",specific,specific[j],true);
                     findings.push(true);
                   }else {
                     findings.push(false);
                   }
                }
                //console.log("findings",findings)
                if(findings.indexOf(false)===-1){
                  myEvents.push({start_day:days[d.getDay()],start_month:months[d.getMonth()],start_date:d.getDate(),start_hours:d.getHours(),start_minutes:(d.getMinutes()===0?d.getMinutes()+"0":d.getMinutes()),start_year:d.getFullYear(),end_day:days[en.getDay()],end_month:months[en.getMonth()],end_date:en.getDate(),end_hours:en.getHours(),end_minutes:(en.getMinutes()===0?en.getMinutes()+"0":en.getMinutes()),end_year:en.getFullYear(),name:event.summary,descriptions:event.description,location: event.location,
                  });
                }
                 break;
               case "today":

                  if(td.getMonth() === d.getMonth() && td.getDate() ===  d.getDate()){
                    myEvents.push({ start_day:days[d.getDay()],start_month:months[d.getMonth()],start_date:d.getDate(),start_hours:d.getHours(),start_minutes:(d.getMinutes()===0?d.getMinutes()+"0":d.getMinutes()),start_year:d.getFullYear(),end_day:days[en.getDay()],end_month:months[en.getMonth()],end_date:en.getDate(),end_hours:en.getHours(),end_minutes:(en.getMinutes()===0?en.getMinutes()+"0":en.getMinutes()),end_year:en.getFullYear(),name:event.summary,descriptions:event.description,location: event.location,});
                  }
                 break;
                 case "tomorrow":

                    if(req.query.month === d.getMonth().toString()&& req.query.date ===  d.getDate().toString()){
                      myEvents.push({ start_day:days[d.getDay()],start_month:months[d.getMonth()],start_date:d.getDate(),start_hours:d.getHours(),start_minutes:(d.getMinutes()===0?d.getMinutes()+"0":d.getMinutes()),start_year:d.getFullYear(),end_day:days[en.getDay()],end_month:months[en.getMonth()],end_date:en.getDate(),end_hours:en.getHours(),end_minutes:(en.getMinutes()===0?en.getMinutes()+"0":en.getMinutes()),end_year:en.getFullYear(),name:event.summary,descriptions:event.description,location: event.location,});
                    }
                   break;
               case "all":
                  myEvents.push({ start_day:days[d.getDay()],start_month:months[d.getMonth()],start_date:d.getDate(),start_hours:d.getHours(),start_minutes:(d.getMinutes()===0?d.getMinutes()+"0":d.getMinutes()),start_year:d.getFullYear(),end_day:days[en.getDay()],end_month:months[en.getMonth()],end_date:en.getDate(),end_hours:en.getHours(),end_minutes:(en.getMinutes()===0?en.getMinutes()+"0":en.getMinutes()),end_year:en.getFullYear(),name:event.summary,descriptions:event.description,location: event.location,});
               break;

               case "date":
                  var tobe_process = req.query.value;
                  var date = getDateInNumber(req.query.value);
                  //console.log(tobe_process,"parseInt",date,"Month", d.getMonth());
                  //tobe_process.indexOf(days[d.getDay()].toLowerCase())!==-1 &&
                  if( tobe_process.indexOf(months[d.getMonth()])!==-1 && date === d.getDate()){
                      myEvents.push({ start_day:days[d.getDay()],start_month:months[d.getMonth()],start_date:d.getDate(),start_hours:d.getHours(),start_minutes:(d.getMinutes()===0?d.getMinutes()+"0":d.getMinutes()),start_year:d.getFullYear(),end_day:days[en.getDay()],end_month:months[en.getMonth()],end_date:en.getDate(),end_hours:en.getHours(),end_minutes:(en.getMinutes()===0?en.getMinutes()+"0":en.getMinutes()),end_year:en.getFullYear(),name:event.summary,descriptions:event.description,location: event.location,});
                  }
               break;
               case "now":
                     console.log("dif",td.getTime()> en.getTime());
                  //  if((td.getMonth() === d.getMonth() && td.getDate() ===  d.getDate())  &&( d.getHours() === td.getHours()) )
                  // console.log(tobe_process,"parseInt",date,"Month", d.getMonth());
                  //
                  if( ((td.getHours())< (en.getHours())) && td.getMonth() === d.getMonth() && td.getDate() ===  d.getDate()){
                      myEvents.push({ start_day:days[d.getDay()],start_month:months[d.getMonth()],start_date:d.getDate(),start_hours:d.getHours(),start_minutes:(d.getMinutes()===0?d.getMinutes()+"0":d.getMinutes()),start_year:d.getFullYear(),end_day:days[en.getDay()],end_month:months[en.getMonth()],end_date:en.getDate(),end_hours:en.getHours(),end_minutes:(en.getMinutes()===0?en.getMinutes()+"0":en.getMinutes()),end_year:en.getFullYear(),name:event.summary,descriptions:event.description,location: event.location,});
                  }
               break;
               default:

             }
           }
           if(myEvents.length>0){
             if(req.query.time==="specific"){
               var ret = [myEvents[0]];
                res.render("event",{
                  data:ret});
             }else {
                res.render("event",{data:myEvents});
             }
           }else {

             res.render("event",{message:"No Event Found"});
           }
         }
       });
     });
   }else {
     res.render("event",{data:false});
   }
});
app.get("/teachers", function(req,res){
   if(req.query.course){
     var result = findTeacherFromCourse(req.query.course);
     //console.log(findTeacherFromCourse(req.query.course));
     if(result.courses){
        res.render("teachers",{data:true,find_course:result.courses, found:true, course: req.query.course});
     }else {
        res.render("teachers",{data:true,teachers:result.data, found:result.found, course: req.query.course});
     }
   }else {
     res.render("teachers",{data:false});
   }

  //res.render("department",{data:findDepartments(req.query.text)});
});








app.get("/courses", function(req,res){
  if(req.query.course || req.query.course_code){
    var result = (req.query.course? getClassInfo(req.query.course, "course_title"):getClassInfo(req.query.course_code, "course_code"));
   //console.log(result,"class recognize");
   if(result.courses){
     result.courses.sort(function(a,b){
       if(a.find_course.name < b.find_course.name) return -1;
       if(a.find_course.name > b.find_course.name) return 1;
       return 0;
     })
   }
    if(result.courses){
      if(result.courses.length ===1){
        res.render("course",{data:true,all_course:result.courses, found:true, course: req.query.course,ultimate:true});
      }else {
        res.render("course",{
          data:true,
          all_course:result.courses,
         found:true,
          course: req.query.course
        });
      }
    }else {
      if(result.data.length ===1){
        res.render("course",{
          data:true,
          course_info:result.data,
          found:result.found,
          course: req.query.course,
          ultimate:true
        });
      }else {
        res.render("course",{
          data:true,course_info:result.data, found:result.found, course: ""});
      }
    }
  }else {
    res.render("course",{data:false});
  }

  // //........
  //  if(req.query.course || req.query.course_code){
  //    var result = (req.query.course? getClassInfo(req.query.course, "course_title"):getClassInfo(req.query.course_code, "course_code"));
  //    //
  //
  //    //...
  //
  //
  //
  //    var r = (req.query.course==="list"?(req.query.course? getClassInfo(req.query.course, "course_title"):getClassInfo(req.query.course_code, "course_code")):(req.query.course? isClassRecognized(req.query.course,"course_title"):isClassRecognized(req.query.course_code, "course_code")));
  //   //  console.log(r);
  //   //  if(r.findings){
  //   //    if(r.findings.length ===1){
  //   //      res.render("course",{data:true,all_course:r.findings, found:true, course: req.query.course,ultimate:true});
  //   //    }else {
  //   //      res.render("course",{
  //   //        data:true,
  //   //        all_course:r.findings,
  //   //       found:true,
  //   //        course: req.query.course
  //   //      });
  //   //    }
  //   //  }else if (r.data) {
  //   //    if(result.data.length ===1){
  //   //      res.render("course",{
  //   //        data:true,
  //   //        course_info:result.data,
  //   //        found:result.found,
  //   //        course: req.query.course,
  //   //        ultimate:true
  //   //      });
  //   //    }else {
  //   //      res.render("course",{
  //   //        data:true,course_info:result.data, found:result.found, course: req.query.course});
  //   //    }
  //   //  }else {
  //   //    res.render("course",{data:false});
  //   //  }
  //
  //    ///////
  //    if(result.courses){
  //      if(result.courses.length ===1){
  //        res.render("course",{data:true,all_course:result.courses, found:true, course: req.query.course,ultimate:true});
  //      }else {
  //        res.render("course",{
  //          data:true,
  //          all_course:result.courses,
  //         found:true,
  //          course: req.query.course
  //        });
  //      }
  //    }else {
  //      if(result.data.length ===1){
  //        res.render("course",{
  //          data:true,
  //          course_info:r.findings,//result.data,
  //          found:result.found,
  //          course: req.query.course,
  //          ultimate:true
  //        });
  //      }else {
  //        res.render("course",{
  //          data:true,course_info:r.findings, found:result.found, course: req.query.course});
  //      }
  //    }
  //  }else {
  //    res.render("course",{data:false});
  //  }

});


app.get("/hours", function(req,res){
  if(req.query.firstname && req.query.lastname){
    var result = isOfficeHoursRecognize("specific",req.query.firstname, req.query.lastname);
    if(Object.keys(result).length>0){
      res.render("hours",{
        data:true,
        hour_info:result,//result.data,
        found:true,
        name: req.query.firstname + " "+req.query.lastname,
        ultimate:true
      });
    }else {
      res.render("hours",{data:false});
    }
  }else if(req.query.list){
    var result = isOfficeHoursRecognize("list",false, false);
    res.render("hours",{data:true,all_hours:result, found:true, name: "All Hours",ultimate:true});
  }else if((req.query.firstname && !req.query.lastname ) || (!req.query.firstname && req.query.lastname )) {
    var result = isOfficeHoursRecognize("specifics",req.query.firstname, req.query.lastname,true);
    if(Object.keys(result).length>1){
     //many
       res.render("hours",{data:true,all_hours:result, found:true, name: "All Hours",ultimate:true});
    }else if (Object.keys(result).length===1) {
      res.render("hours",{
        data:true,
        hour_info:result[0],//result.data,
        found:true,
        name: (req.query.firstname?req.query.firstname:"") +" "+ (req.query.lastname?req.query.lastname:""),
        ultimate:true
      });
    }

  }else {
    res.render("course",{data:false});
  }
});


app.get("/depart", function(req,res){
  res.render("department",{data:findDepartments("where is athletics")});
});
// app.get("/zoom", function(req,res){
//   browser.visit("http://lkonat.it.pointpark.edu:8080/",function(){
//       var da = browser._eventLoop.active.window._response.body;
//       var newL = 'href="http://lkonat.it.pointpark.edu:8080/'
//       da = da.replace(/href="/g, newL);
//     //res.send({success:browser._eventLoop.active.window._response.body});
//       res.render("zombie",{site:da});
//   });
// });
app.post("/getData", function(req,res){
  res.send({success:datas});
});
// app.post("/get-teachers", function(req,res){
//   browser.visit("http://lkonat.it.pointpark.edu:8080/",function(){
//     //console.log(typeof browser._eventLoop.active.window._response.body);
//     res.send({success:browser._eventLoop.active.window._response.body});
//   });
//
// });

// browser.visit("http://lkonat.it.pointpark.edu:8080/",function(){
//   console.log(typeof browser._eventLoop.active.window._response.body);
//
// });


app.post("/get-ad", function(req,res){
  wordpos.getPOS(req.body.phrase, function(result){
      //console.log("adjectives",result);
        res.send({success:result});
  });

});

app.post('/send-conversation', function(req, res){
    var user = req.body.user;
    var system = req.body.system;
    var recognized = req.body.recognized;
      connect(function(con){
        var query = "INSERT INTO conversations (user,system,recognize) VALUES(?,?,?)";
         con.query(query,[user,system,recognized],function(err, result) {
             if (err) {
               res.send({success:false});
             }
             if(result){
              res.send({success:result});
             }
         });
       });
});

app.post('/send-suggestion', function(req, res){
    var suggestion = req.body.suggestion;
      connect(function(con){
        var query = "INSERT INTO suggestions (message) VALUES(?)";
         con.query(query,[suggestion],function(err, result) {
             if (err) {
               res.send({success:false});
             }
             if(result){
              res.send({success:result});
             }
         });
       });
});

app.post("/send-message", function(req,res){
  var number = req.body.number, message = req.body.message;
  console.log(number, message);
  send(number,message, function(){
    console.log("Message sent");
  });
  res.send({success:true});
});

//custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render("404"); ;
});
//custom 500 page
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"),function(){
  console.log("Express started on");
});
///.....................................................
var datas ={};
  function  getData(files,r){
    var idx =0;
    var obj ={};
    var headers={};
    fs.createReadStream(files[r])
      .pipe(csv())
      .on("data",function(data){
        for(var i =0 ; i< data.length; i++){
          if(data[i].length>0){
            if(idx === 0){  //get the header first
              headers[i] = data[i].replace(/ /g, "_").toLowerCase();
            }else {
              if(obj[idx]){
                obj[idx][headers[i]]=data[i];
              }else {
                obj[idx]={};
                obj[idx][headers[i]]=data[i];
              }
            }
          }
        }
        idx++;
      })
      .on("end",function(){
        if(r === files.length-1){
          datas[files[r]]= obj;
          onDataReady(datas);
        }else {
          datas[files[r]]= obj;
          getData(files,r+1);
        }
      });
  }
  getData(["departments.csv","data.csv","teachers.csv","teachers0.csv","faculty_hours.csv"],0);

  function onDataReady(data){
    //console.log("fininsh data: ",data["departments.csv"]["1"]);
    console.log("data is ready");
    //console.log(data);
    //console.log(datas["faculty_hours.csv"]);


    //console.log(getClassInfo("Pointe IV").data[0].course_info);

  }



  function findDepartments(phrase0){
    phrase0 = phrase0.toLowerCase().replace(/\(|\)/g, "").replace(/-/g, " ");
    var departments = datas["departments.csv"];
    //console.log(departments);
    var phrase = phrase0.toLowerCase().replace(/-/g, " ").trim();
    var phrase =  phrase.split(" ");
    var best ={count:0, title:"",candidates:[], isMatched:false};
    if(phrase0.indexOf("all_data")!==-1){
      for(key in departments){
        //console.log(key,departments[key],"#");
        best.candidates.push(departments[key]);
      }

    }
    else if (phrase0.indexOf("somewhere")!==-1 || phrase0.indexOf("someplace")!==-1  ) {
      for(key in departments){
        var description = departments[key].description? departments[key].description.split(" "):false;
        if(description){
          for(var i= 0; i< phrase.length; i++){
            if(description.indexOf(phrase[i])!==-1){
              if(best.candidates.indexOf(departments[key])!==-1){

              }else {
                best.candidates.push(departments[key]);
              }

            }
          }
        }

      }
      if(best.candidates.length<=1 && best.title!==''){
        best.isMatched = true;
      }else if (best.candidates.length>1) {
        best.isMatched = false;
      }
    }else {
      for(key in departments){
        var dm = departments[key].department.toLowerCase().replace(/\(|\)/g, "").replace(/-/g, " ");
        if(dm === phrase0){
            best.candidates.push(departments[key]);
            best.title = departments[key];
        }
      //   var count=0, n= phrase.length;
      //   for(var i =0; i< phrase.length; i++){
      //     if (dm.search(phrase[i]) !== -1 ){
      //       count++;
      //     }
      //   }
      //   if(count>best.count){
      //     if(best.count === 0){
      //       best.candidates.push(departments[key]);
      //     }else {
      //       best.candidates=[];
      //     }
      //     best.title = departments[key];
      //
      //     best.count = count;
      //   }else if (count===best.count && count !==  0) {
      //     best.candidates.push(departments[key]);
      //     best.count = count;
      //   }
      //   if(count === n){ //perfect mactch
      //     //console.log("very similar to ",departments[key].Department, count,best);
      //     //return best;
      //   }else if (count>0) {
      //     //find similar word
      //   //  console.log("some How similar",departments[key].Department,count,best);
      //     //return best
      //   }
      }
      if(best.candidates.length<=1 && best.title!==''){
        best.isMatched = true;
      }else if (best.candidates.length>1) {
        best.isMatched = false;
      }
    }


     return best;
  }


  function findTeacherFromCourse(course_name){
    var targeted_course = course_name.toLowerCase();
    var findings =[], found =true;
    var data = datas["teachers.csv"];
    var keys = Object.keys(data);
    for(var i =0; i <keys.length; i++){
      for(var j =0; j<20; j++){ //200 is the number of course each teacher could have
        if(course_name ==="list"){
          var this_course = data[keys[i]]["course"+j]?data[keys[i]]["course"+j]:false;
          if(this_course){
            findings.push({find_course:{name:this_course}, course:this_course});
          }
        }else {
          var this_course = data[keys[i]]["course"+j]?data[keys[i]]["course"+j].toLowerCase():false;
           if(this_course && this_course === targeted_course){

             findings.push({teacher:data[keys[i]], course:this_course});
          }
        }
      }
    }
    if(findings.length<=0){
      findings.push({teacher:false, course:course_name});
      return {data:findings, found:false};
    }
    if(course_name ==="list"){
      return {courses:findings, found:true};
    }
    return {data:findings, found:true};
  }


    function getClassInfo(course_name,code){
      var targeted_course = course_name.toLowerCase().split(".");
      var findings =[], found =true, all_courses={};
      var data = datas["teachers0.csv"];
      var keys = Object.keys(data);
      for(var i =0; i <keys.length; i++){
          if(course_name ==="list"){
            var this_course = data[keys[i]][code]?data[keys[i]][code]:false;
            if(this_course){
              if(!all_courses[this_course]){
                all_courses[this_course] = true;
                findings.push({find_course:{name:this_course}, course:"list"});
              }
            }
          }
          else {

            var this_course = data[keys[i]][code]?data[keys[i]][code].toLowerCase():false;
             if(this_course && targeted_course.indexOf(this_course)!==-1){
               findings.push({course_info:data[keys[i]], course:this_course});
            }
          }

      }
      if(findings.length<=0){
        findings.push({course_info:false, course:course_name});
        return {data:findings, found:false};
      }
      if(course_name ==="list"){
        return {courses:findings, found:true};
      }
      return {data:findings, found:true};
    }

    function isClassRecognized(arr0,code){
      var arr  = arr0.toLowerCase().replace(/'s|!|,|\.|\?|@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|\=|\[|\]|{|}|\/|\||\"|\\|`|~|:|;|'|/gi,"").split(" ");
      var classes = datas["teachers0.csv"];
      var nearPhrase={max:0,findings:[]};
      for( key in classes){
        var l = (classes[key][code].toLowerCase()).replace(/\(|\)|\-|\//gi," ");
        //console.log(l,"***");
        var r = phraseCheckIt(l,arr);
        var c  = r.findings;
        //console.log(l, phraseCheck(l,arr).count);
        if(nearPhrase.max<c.length){
          //nearPhrase.phrase = l;
          nearPhrase.max = c.length;
          nearPhrase.findings=[{data:classes[key],certainty:100-(arr.length -r.count)}];
         }
         else if (nearPhrase.max === c.length && nearPhrase.max!==0) {
          nearPhrase.findings.push({data:classes[key],certainty: 100-(arr.length -r.count)});
        }
      }
      //choose the one with more certainty
      var chosen = {max:0,findings:[]};
      for(key in nearPhrase.findings){
        if(nearPhrase.findings[key].certainty> chosen.max){
          chosen.max = nearPhrase.findings[key].certainty;
           chosen.findings=[{data:nearPhrase.findings[key].data}];
        }else if (nearPhrase.findings[key].certainty=== chosen.max && chosen.max!==0) {
            chosen.findings.push({data:nearPhrase.findings[key].data});
        }
      }
       //console.log("key",chosen);
      return chosen;
    }

    function phraseCheckIt(phrase0,target){
      var voids= ["the", "to", "at", "a"];
      var phrase = phrase0.split(" ");
        var findings=[],count=target.length;
        for(var i =0; i<target.length; i++){
          var isThistrue = false;
          for(var j =0; j< phrase.length; j++){
            if(target[i] === phrase[j] && voids.indexOf(target[i])===-1 ){
              isThistrue = true;
            }else {
              count--;
            }
          }
          if(isThistrue){
            findings.push(isThistrue);
          }
        }
        if(findings.indexOf(false)===-1){

        }

        return {findings:findings,count:count};
    }
    function getDateInNumber(x){
        var df =  x.split(" ");
        for(var i =0; i<df.length; i++){
          var t = parseInt(df[i])
          if ( t){
            return t;
          }
        }
    }

    function chech(phrase0,target){ //check string
        var phrase = phrase0.split(" ");
        for(var i =0; i< target.length; i++){
          for(var j =0; j< phrase.length; j++){
            if(target[i] === phrase[j] || target[i]+"s" === phrase[j]){
              return true;
            }
          }
        }
        return false;
    }
    function phraseCheck(phrase0,target){
      var phrase = phrase0.split(" ");
        var findings=[],count=target.length;
        for(var i =0; i<target.length; i++){
          var isThistrue = false;
          for(var j =0; j< phrase.length; j++){
            if(target[i] === phrase[j] ){
              isThistrue = true;
            }else {
              count--;
            }
          }
          if(isThistrue){
            findings.push(isThistrue);
          }

        }
        if(findings.indexOf(false)===-1){

        }

        return {findings:findings,count:count};
    }

    function send(phone, message, cb) {
  // Load the twilio module
  var twilio = require("twilio");

  // Create a new REST API client to make authenticated requests against the
  // twilio back end
  var client = new twilio.RestClient(secrets.twilioA, secrets.twilioB);

  // Pass in parameters to the REST API using an object literal notation. The
  // REST client will handle authentication and response serialzation for you.
  console.log("Send to " + phone);
  client.sms.messages.create({
    to: phone,
    from: secrets.twilio_from,
    body: message
  }, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {

      // The second argument to the callback will contain the information
      // sent back by Twilio for the request. In this case, it is the
      // information about the text messsage you just sent:
      console.log("Success! The SID for this SMS message is:");
      console.log(message.sid);

      console.log("Message sent on:");
      console.log(message.dateCreated);
      cb();
    }
    else {
      console.log(error);
      console.log("Oops! There was an error.");
    }
  });
}



function isOfficeHoursRecognize(type,first, last,either){
  console.log(first,last);
  if(type ==="list"){

  }else {
    var first  = (first?first.toLowerCase().replace(/'s|!|,|\.|\?|@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|\=|\[|\]|{|}|\/|\||\"|\\|`|~|:|;|'|/gi,""):false);
    var last  = (last?last.toLowerCase().replace(/'s|!|,|\.|\?|@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|\=|\[|\]|{|}|\/|\||\"|\\|`|~|:|;|'|/gi,""):false);
  }

  var hours = datas["faculty_hours.csv"];
  var office_hours=[];
  if(either){
    for( key in hours){
      var first_l = (hours[key].first_name.toLowerCase()).replace(/'s|!|,|\.|\?|@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|\=|\[|\]|{|}|\/|\||\"|\\|`|~|:|;|'|/gi,"");
      var last_n = (hours[key].last_name.toLowerCase()).replace(/'s|!|,|\.|\?|@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|\=|\[|\]|{|}|\/|\||\"|\\|`|~|:|;|'|/gi,"");
      if((first && first ===first_l) || (last && last ===last_n)){
        office_hours.push(hours[key]);
      }
    }
    return office_hours;
  }else{
    for( key in hours){
      var first_l = (hours[key].first_name.toLowerCase()).replace(/'s|!|,|\.|\?|@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|\=|\[|\]|{|}|\/|\||\"|\\|`|~|:|;|'|/gi,"");
      var last_n = (hours[key].last_name.toLowerCase()).replace(/'s|!|,|\.|\?|@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|\=|\[|\]|{|}|\/|\||\"|\\|`|~|:|;|'|/gi,"");
      if((first && first ===first_l) && (last && last ===last_n) && type!=="list"){
          console.log(first,last,"Sppp",hours[key]);
        return hours[key];
      }else if (type==="list") {
          console.log(first,last,"list");
         office_hours.push(hours[key]);
      }
    }
    return office_hours;
  }
}

// send("7246994863", "test1: hello world!", function(){
//   console.log("Message sent");
// });
