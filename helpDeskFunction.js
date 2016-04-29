/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
        }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
		     event.session,
		     function callback(sessionAttributes, speechletResponse) {
			 context.succeed(buildResponse(sessionAttributes, speechletResponse));
		     });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
		     event.session,
		     function callback(sessionAttributes, speechletResponse) {
			 context.succeed(buildResponse(sessionAttributes, speechletResponse));
		     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
		", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
		", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
		", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("OfficeInfo" == intentName) {
        getOfficeInfo(intent, session, callback);
    }
    else if("AskQuestion" == intentName){
        getAnswer(intent, session, callback);
    }
    else if ("AMAZON.HelpIntent" === intentName) {
        getWelcomeResponse(callback);
    } 
    else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
		", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Please ask me a question such as, what are professor X's office hours";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Please ask a question.";
    var shouldEndSession = false;

    callback(sessionAttributes,
	     buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getOfficeInfo(intent, session, callback) {
    var cardTitle = intent.name;
    var professorNameSlot = intent.slots.Professor;
    var repromptText = "I didn't understand your professor's name, please try again."; // If we made it here and it fails, prof is what's wrong
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    // Strip professor name of non-alphabetic characters
    var strippedProf = professorNameSlot.value.replace( /[^a-zA-Z\s]/, ""); // ( ͡° ͜ʖ ͡°) quite the variable name eh?
    var lowercaseProf = strippedProf.toLowerCase();
    
    switch(lowercaseProf){
    case "adali":
    case "adalis":
    case "tulay adali":
    case "tulay adalis":
    speechOutput = "Dr. Adalis office is in I.T.E. 324." + 
    "Office hours are, tuesday 515-615pm.";
    break;

    case "aina":
    case "ainas":
    case "yemisi aina":
    case "yemisi ainas":
    speechOutput = "Yemisi Ainas office is in I.T.E. 325 E. but has no office hours on file.";
    break;

    case "banerjee":
    case "banerjees":
    case "nilanjan banerjee":
    case "nilanjan banerjees":
    speechOutput = "Dr. Banerjees office is in I.T.E. 362 but has no office hours on file.";
    break;

    case "bargteil":
    case "bargteils":
    case "adam bargteil":
    case "adam bargteils":
    speechOutput = "Dr. Bargteils office is in I.T.E. 341." + 
    "Office hours are, monday 230-430pm.";
    break;

    case "birrane":
    case "birranes":
    case "ed birrane":
    case "ed birranes":
    case "edward birrane":
    case "edward birranes":
    speechOutput = "Edward Birranes office hours are, monday 430-530pm, in I.T.E. 211.";
    break;

    case "buck":
    case "bucks":
    case "holly buck":
    case "holly bucks":
    speechOutput = "Holly Buck has no office or office hours on file.";
    break;

    case "cain":
    case "cains":
    case "russ cain":
    case "russ cains":
    speechOutput = "Russ Cain has no office or office hours on file.";
    break;

    case "carter":
    case "carters":
    case "gary carter":
    case "gary carters":
    speechOutput = "Dr. Carters office is in I.T.E. 308 but has no office hours on file.";
    break;

    case "cheini chang":
    case "cheini changs":
    speechOutput = "Dr. Chein-i Changs office is in I.T.E. 310." +
    "Office hours are, monday and wednesday 3-4pm";
    break;

    case "chang":
    case "changs":
    case "richard chang":
    case "richard changs":
    speechOutput = "Dr. Richard Changs office is in I.T.E. 326 but has no office hours on file.";
    break;

    case "chen":
    case "chens":
    case "jian chen":
    case "jian chens":
    speechOutput = "Dr. Chens office is in I.T.E. 357." +
    "Office hours are, monday and wednesday 1:20-2:20pm.";
    break;

    case "chester":
    case "chesters":
    case "bob chester":
    case "bob chesters":
    speechOutput = "Bob Chesters office is in I.T.E. 325M. but has no office hours on file";
    break;

    case "choa":
    case "choas":
    case "fowsen choa":
    case "sowsen choas":
    speechOutput = "Dr. Choas office is in I.T.E. 303. but has no office hours on file";
    break;

    case "daguanno":
    case "daguannos":
    case "giuseppe daguanno":
    case "giuseppe daguannos":
    speechOutput = "Dr. D'Aguannos office hours are, tuesday and thursday" + 
    "1-3pm in T.R.C. building, room 201B."
    break;

    case "desjardins":
    case "marie desjardinses":
    case "marie desjardins":
    case "marie desjardinses":
    speechOutput = "Dr. Desjardinses office is in I.T.E. 337." +
    "Office hours are, tuesday 10-11am in the library lobby cafe," +
    "and, thursday 4-5pm in I.T.E. 217.A.";
    break;

    case "dixon":
    case "dixons":
    case "jeremy dixon":
    case "jeremy dixons":
    speechOutput = "Jeremy Dixons office hours are, 10am to noon, but his office location is unlisted";
    break;

    case "dorband":
    case "dorbands":
    case "john dorband":
    case "john dorbands":
    speechOutput = "Dr. Dorband has no office or office hours on file.";
    break;

    case "douglass":
    case "douglasses":
    case "vera douglass":
    case "vera douglasses":
    speechOutput = "Professor Douglasses office is in I.T.E. 325K. but has no office hours on file.";
    break;

    case "drummey":
    case "drummeys":
    case "dee ann drummey":
    case "dee ann drummeys":
    speechOutput = "Dee Ann Drummeys office is in I.T.E. 325L. but has no office hours on file.";
    break;

    case "finin":
    case "finins":
    case "tim finin":
    case "tim finins":
    speechOutput = "Dr. Finins office is in I.T.E. 329. but has no office hours on file.";
    break;

    case "fliggins":
    case "fligginses":
    case "keara fliggins":
    case "keara fligginses":
    speechOutput = "Keara Fligginses office is in I.T.E. 325I. but has no office hours on file.";
    break;

    case "forno":
    case "fornos":
    case "richard forno":
    case "richard fornos":
    speechOutput = "Dr. Fornos office is in I.T.E. 325A. but has no office hours on file.";
    break;

    case "gartner":
    case "gartners":
    case "doug gartner":
    case "doug gartners":
    speechOutput = "Doug Gartners office hours are, tuesday and thursday 7-8pm in I.T.E. 201F.";
    break;

    case "gibson":
    case "gibsons":
    case "katie gibson":
    case "katie gibsons":
    speechOutput = "Dr. Gibsons office hours are, monday and thursday 10am to noon.";
    break;

    case "halem":
    case "halems":
    case "milton halem":
    case "milton halems":
    speechOutput = "Dr. Halems office is in I.T.E. 330, but has no office hours on file.";
    break;

    case "heiss":
    case "heisses":
    case "paul heiss":
    case "paul heisses":
    speechOutput = "Paul Heisses office hours are, tuesday and thursday 7-8pm in I.T.E. 374.";
    break;

    case "hirsch":
    case "hirsches":
    case "katie hirsch":
    case "katie hirsches":
    speechOutput = "Katie Hirsch has no office or office hours on file.";
    break;

    case "hymanwaters":
    case "hymanwaterses":
    case "camilla hymanwaters":
    case "camilla hymanwaterses":
    speechOutput = "Camilla Hyman-Waterses office is in I.T.E. 325J. but has no office hours on file.";
    break;

    case "johnson":
    case "johnsons":
    case "anthony johnson":
    case "anthony johnsons":
    speechOutput = "Anthony Johnsons office hours are, tuesday and thursday" + 
    "1:30-2:30pm in T.R.C. 029.";
    break;

    case "joshi":
    case "joshis":
    case "anupam joshi":
    case "anupam joshis":
    speechOutput = "Dr. Anupam Joshis office is in I.T.E. 328 and 325G. but has no office hours on file.";
    break;

    case "karuna joshi":
    case "karuna joshis":
    speechOutput = "Dr. Karuna Joshis office is in I.T.E. 372. but has no office hours on file";
    break;

    case "kalpakis":
    case "kalpakises":
    case "kostas kalpakis":
    case "kostas kalpakises":
    speechOutput = "Dr. Kalpakises office is in I.T.E. 348. but has no office hours on file";
    break;

    case "kashyap":
    case "kashyaps":
    case "abhay kashyap":
    case "abhay kashyaps":
    speechOutput = "Abhay Kashyap has no office or office hours on file. but has no office hours on file";
    break;

    case "kim":
    case "kims":
    case "seungjun kim":
    case "seungjun kims":
    speechOutput = "Professor Kims office is in I.T.E. 312." +
    "Office hours are, wednesday 5:15-6:15pm for Comp E. 320";
    break;

    case "kukla":
    case "kuklas":
    case "jim kukla":
    case "jim kuklas":
    speechOutput = "Jim Kuklas office hours are, monday 7-8pm. but has no office location on file";
    break;

    case "laberge":
    case "laberges":
    case "charles laberge":
    case "charles laberges":
    speechOutput = "Dr. Laberges office is in I.T.E. 358." +
    "Office hours are, monday and wednesday 1-3:30pm," +
    "and tuesday and thursday 2:30-3:30pm."
    ;
    break;

    case "lomonaco":
    case "lomonacos":
    case "sam lomonaco":
    case "sam lomonacos":
	speechOutput = "Dr. Lomonacos office is in I.T.E. 306." +
    "Office hours are, tuesday and wednesday 2:15-2:45pm, and, 5:15-5:45pm";
	break;
            
    case "lupoli":
    case "lupolis":
    case "shawn lupoli":
    case "shawn lupolis":
    speechOutput = "Professor Lupolis office is in I.T.E. 209." +
    "Office hours are, tuesday 1:30-2:30pm, wednesday 10:30am-noon," +
    "and, thursday 10-11:30am";
    break;

    case "marron":
    case "marrons":
    case "chris marron":
    case "chris marrons":
    speechOutput = "Dr. Marrons office is in I.T.E. 359." +
    "Office hours are, tuesday 1-2pm, and, thursday 11:30am-12:30";
    break;

    case "maselko":
    case "maselkos":
    case "dan maselko":
    case "dan maselkos":
    speechOutput = "Dan Maselkos office hours are, monday and wednesday 7-8pm. but has no office location on file";
    break;

    case "matuszek":
    case "matuszeks":
    case "cynthia matuszek":
    case "cynthia matuszeks":
    case "m":
    speechOutput = "Dr. Matuszeks office is in I.T.E. 331." +
    "Office hours are, monday 9-10am, and, tuesday 10-11am";
    break;

    case "menyuk":
    case "menyuks":
    case "curtis menyuk":
    case "curtis menyuks":
    speechOutput = "Dr. Menyuks office is in I.T.E. 304. but has no office hours on file";
    break;

    case "mitchell":
    case "mitchells":
    case "susan mitchell":
    case "susan mitchells":
    speechOutput = "Professor Mitchells office is in I.T.E. 214. but has no office hours on file";
    break;

    case "Mohsenin":
    case "Mohsenins":
    case "Tinoosh Mohsenin":
    case "Tinoosh Mohsenins":
    speechOutput = "Dr. Menyuks office is in I.T.E. 323. but has no office hours on file";
    break;

    case "Morawski":
    case "Morawskis":
    case "Maksym Morawski":
    case "Maksym Morawskis":
    case "Max":
    case "Maxes":
    case "Max Morawski":
    case "Max Morawskis":
    speechOutput = "Maxes office is in I.T.E. 215. but has no office hours on file";
    break;

    case "Morris":
    case "Morrises":
    case "Joel Morris":
    case "Joel Morrises":
    speechOutput = "Dr. Morrises office is in I.T.E. 308. but has no office hours on file";
    break;

    case "Nicholas":
    case "Nicholases":
    case "Charles Nicholas":
    case "Charles Nicholases":
    speechOutput = "Dr. Nicholases office is in I.T.E. 356." +
    "Office hours are, tuesday and thursday 2-3pm";
    break;

    case "Novey":
    case "Noveys":
    case "Mike Novey":
    case "Mike Noveys":
    case "Michael Novey":
    case "Michael Noveys":
    speechOutput = "Mike Novey has no office or office hours on file.";
    break;

    case "Oates":
    case "Oateses":
    case "Tim Oates":
    case "Tim Oateses":
    speechOutput = "Dr. Oates is office is in I.T.E. 336. but has no office hours on file";
    break;

    case "Olano":
    case "Olanos":
    case "Marc Olano":
    case "Marc Olanos":
    speechOutput = "Dr. Olanos office is in I.T.E. 354." +
    "Office hours are, tuesday and thursday 4-5pm";
    break;

    case "Park":
    case "Parks":
    case "John Park":
    case "John Parks":
    speechOutput = "Professor Parks office is in I.T.E. 207." +
    "Office hours are, tuesday 4-5pm, and, wednesday 2-3 pm";
    break;

    case "Patel":
    case "Patels":
    case "Chintan Patel":
    case "Chintan Patels":
    speechOutput = "Dr. Patels office is in I.T.E. 322. but has no office hours on file";
    break;

    case "Pearce":
    case "Pearces":
    case "Claudia Pearce":
    case "Claudia Pearces":
    speechOutput = "Professor Pearces office is in I.T.E. 373. but has no office hours on file";
    break;

    case "Peng":
    case "Pengs":
    case "Yun Peng":
    case "Yun Pengs":
    speechOutput = "Dr. Pengs office is in I.T.E. 327. but has no office hours on file.";
    break;

    case "Perry":
    case "Perrys":
    case "Alexander Perry":
    case "Alexander Perrys":
    speechOutput = "Alexander Perrys office hours are, monday and wednesday 6:45-7:45pm.";
    break;

    case "Phatak":
    case "Phataks":
    case "Dhananjay Phatak":
    case "Dhananjay Phataks":
    speechOutput = "Dr. Phataks office is in I.T.E. 319." +
    "Office hours are, tuesday 11am to 1, and, 4-6pm for C.M.S.C. 203.";
    break;

    case "Pinkston":
    case "Pinkstons":
    case "John Pinkston":
    case "John Pinkstons":
    speechOutput = "Dr. Pinkstons office is in I.T.E. 327. but has no office hours on file.";
    break;

    case "Pirsiavash":
    case "Pirsiavashes":
    case "Hamed Pirsiavash":
    case "Hamed Pirsiavashes":
    speechOutput = "Dr. Pirsiavashes office is in I.T.E. 342." +
    "Office hours are, tuesday 2:15-3:15pm";
    break;

    case "Ray":
    case "Rays":
    case "George Ray":
    case "George Rays":
    speechOutput = "George Rays office hours are, monday and wednesday 4:55-5:25pm in I.T.E. 374.";
    break;

    case "Rheingans":
    case "Rheinganses":
    case "Penny Rheingans":
    case "Penny Rheinganses":
    speechOutput = "Dr. Rheinganses office is in I.T.E. 355. but has no office hours on file.";
    break;

    case "Robucci":
    case "Robuccis":
    case "Ryan Robucci":
    case "Ryan Robuccis":
    speechOutput = "Dr. Robuccis office is in I.T.E. 316. but has no office hours on file.";
    break;

    case "Sadeghian":
    case "Sadeghians":
    case "Pedram Sadeghian":
    case "Pedram Sadeghians":
    speechOutput = "Professor Sadeghians office is in I.T.E. 208. but has no office hours on file.";
    break;

    case "Schmill":
    case "Schmills":
    case "Matthew Schmill":
    case "Matthew Schmills":
    speechOutput = "Professor Schmills office is in I.T.E. 350. but has no office hours on file.";
    break;

    case "Sebald":
    case "Sebalds":
    case "Lawrence Sebald":
    case "Lawrence Sebalds":
    speechOutput = "Lawrence Sebalds office hours are, tuesday and thursday 12:45-1:45pm. but has no office location on file";
    break;

    case "Sherman":
    case "Shermans":
    case "Alan Sherman":
    case "Alan Shermans":
    speechOutput = "Dr. Shermans office is in I.T.E. 224." +
    "Office hours are, wednesday 9-10am.";
    break;

    case "Shook":
    case "Shooks":
    case "Adam Shook":
    case "Adam Shooks":
    speechOutput = "Adam Shooks office hours are, tuesday and thursday 6-7pm in I.T.E. 374.";
    break;

    case "Sidhu":
    case "Sidhus":
    case "Deepinder Sidhu":
    case "Deepinder Sidhus":
    speechOutput = "Dr. Sidhus office is in I.T.E. 347." +
    "Office hours are, tuesday and thursday 3:15-4pm.";
    break;

    case "Simon":
    case "Simons":
    case "Tyler Simon":
    case "Tyler Simons":
    speechOutput = "Dr. Simon has no office or office hours on file.";
    break;

    case "Slaughter":
    case "Slaughters":
    case "Gymama Slaughter":
    case "Gymama Slaughters":
    speechOutput = "Dr. Slaughters office is in I.T.E. 311." +
    "Office hours are, monday and wednesday 11am to noon.";
    break;

    case "Smalkin":
    case "Smalkins":
    case "Fred Smalkin":
    case "Fred Smalkins":
    speechOutput = "Fred Smalkin has no office or office hours on file.";
    break;

    case "Squire":
    case "Squires":
    case "Jon Squire":
    case "Jon Squires":
    speechOutput = "Jon Squires office hours are, tuesday and thursday 2:30-3:45pm in I.T.E. 226.";
    break;

    case "Syed":
    case "Syeds":
    case "Zareen Syed":
    case "Zareen Syeds":
	speechOutput = "Professor Syeds office is in I.T.E. 301. but has no office hours on file.";
	break;

    case "Tang":
    case "Tangs":
    case "Jason Tang":
    case "Jason Tangs":
    speechOutput = "Jason Tangs office hours are, tuesday and thursday 7-8pm. but has no office location on file";
    break;

    case "Tompkins":
    case "Tompkinses":
    case "Gerald Tompkins":
    case "Gerald Tompkinses":
    speechOutput = "Gerald Tompkinses office hours are, tuesday and thursday 6:10-7:10pm. but has no office location on file";
    break;

    case "Weiss":
    case "Weisses":
    case "Geoff Weiss":
    case "Geoff Weisses":
    speechOutput = "Geoff Weisses office is in I.T.E. 302. but has no office hours on file";
    break;

    case "Wiles":
    case "Wileses":
    case "Andrew Wiles":
    case "Andrew Wileses":
    speechOutput = "Andrew Wiles has no office or office hours on file.";
    break;

    case "Wolfe":
    case "Wolfes":
    case "Olivia Wolfe":
    case "Olivia Wolfes":
    speechOutput = "Olivia Wolfes office is in I.T.E. 325F. but has no office hours on file";
    break;

    case "Yan":
    case "Yans":
    case "Li Yan":
    case "Li Yans":
    speechOutput = "Dr. Yans office is in I.T.E. 315. but has no office hours on file";
    break;

    case "Yesha":
    case "Yeshas":
    case "Yaacov Yesha":
    case "Yaacov Yeshas":
    speechOutput = "Dr. Yaacov Yeshas office is in I.T.E. 333. but has no office hours on file";
    break;

    case "Yelena Yesha":
    case "Yelena Yeshas":
    speechOutput = "Dr. Yelena Yeshas office is in I.T.E. 335. but has no office hours on file";
    break;

    case "Younis":
    case "Younises":
    case "Mohamed Younis":
    case "Mohamed Younises":
    speechOutput = "Dr. Younises office is in I.T.E. 318." +
    "Office hours are, monday and wednesday 10:30-11:30am.";
    break;

    case "Zhu":
    case "Zhus":
    case "Ting Zhu":
    case "Ting Zhus":
    speechOutput = "Dr. Zhus office is in I.T.E. 360." +
    "Office hours are, monday and wednesday 3:50-4:50pm.";
    break;

    case "Zieglar":
    case "Zieglars":
    case "Edward Zieglar":
    case "Edward Zieglars":
    speechOutput = "Edward Zieglars office hours are, tuesday and thursday 6-7pm. but has no office location on file";
    break;
 
    default:
	speechOutput = repromptText;
	break;
    }

    callback(sessionAttributes,
	     buildSpeechletResponseOffice(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getAnswer(intent, session, callback) {
    var cardTitle = intent.name;
    var questionNameSlot = intent.slots.Question;
    var repromptText = "Please repeat your question.";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";
    
    switch(questionNameSlot.value){
    case "advising office":
    speechOutput = "The advising office is in I.T.E. 202 through 206";
    break;

    case "my adviser":
    speechOutput = "The advising office can tell you who your advisor is.";
    break;

    case "card access":
    case "card swipe access":
    case "lab access":
    case "the lab":
    case "a lab":
    speechOutput = "Email Olivia Wolfe at O Wolfe@UMBC dot E.D.U., Make sure you C.C. your" +
    "instructor or faculty member.";
    break;

    case "register for a class that is full":
    case "register for a full class":
    speechOutput = "You will need to request permission. Google CMSC UMBC Student Forms," +
    "and fill out the form called, Permission to Enroll, in a Closed Course.";
    break;

    case "contact a professor":
    speechOutput = "The best way to reach them is by e-mail. Use the university" +
    "directory at U.M.B.C. dot E.D.U /search/directory";
    break;

    case "complain about a class":
    case "complain about an instructor":
    case "complain":
    case "complaint about a class":
    case "complaint about an instructor":
    case "complaint":
    speechOutput = "First speak directly to your instructor. If you cannot come to an" +
    "agreement, then contact the undergraduate program director for the course";
    break;

    case "my student bill":
    case "my bill":
    case "billing":
    speechOutput = "You must go to Student Business Services on the third floor ove" +
    "the Administration Building.";
    break;

    case "permission for a class":
    case "permission to enroll":
    speechOutput = "Email Dr. Richard Chang at, chang@UMBC dot E.D.U.";
    break;

    default:
    speechOutput = repromptText;
    break;
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
		text: output
		},
	    card: {
            type: "Simple",
		title: "SessionSpeechlet - " + title,
		content: "SessionSpeechlet - " + output
		},
	    reprompt: {
            outputSpeech: {
                type: "PlainText",
		    text: repromptText
		    }
        },
	    shouldEndSession: shouldEndSession
	    };
}

function buildSpeechletResponseOffice(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
        text: output
        },
        card: {
            type: "Standard",
            title: "ITE Building",
            text: "Map of the 3rd floor",
            image: {
                smallImageUrl: "https://i.imgur.com/uVJHCWh.jpg",
                largeImageUrl: "https://i.imgur.com/n3uybE8.jpg"
            }
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
            text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
        };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
	    sessionAttributes: sessionAttributes,
	    response: speechletResponse
	    };
}