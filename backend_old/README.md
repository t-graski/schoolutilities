# SchoolUtilities 
A simple discord bot to help you and your class. 
In case you don't want to read everything type `.help` and SchoolUtilities will send you a little overview about everything.

## Features
- Calcuation
- Translate
- Precense check
- Timetable
- Alert 
## Setup
Every setup command starts with `.config` and needs to be written in the channel `#bot-config`, which has been created by SchoolUtilities. 

If you cannot find the `#bot-config` channel type `crtl + k` and type `bot-config`. 

Now you have the found the correct channel we can go on to setup SchoolUtilities. 

Next you need the name of your teacher and student role. In case you haven't already created the roles follow the steps below.

Text which looks like this `<ExampleText>` you have to fill with 
- `.config student <YourStudentRole>` 
- `.config teacher <YourTeacherRole>`
- `.config timezone <YourTimeZone>` Example for timzone: `GMT+1`
- `.config language <YourLanguage>` Example for language: `english`
- `.config checktime <TimeInMinutes>` The checktime is the time how long students have to confirm they are precent. If you want this time under 1 minute type for example: `0.2`
- `.config autocheck <enable> <disable>` Autochecks are automated precense checks. If you want them to work you need to set up your timetable. **Pro tip: Type either enable or disable**

## How to create teacher and student role
Step 1: Click in the top left on `SchoolUtilities`, the name will be different on your server.
![](https://i.imgur.com/DJbLr0o.png)

 Step 2: Next you click on `Server Settings`.
 ![](https://i.imgur.com/SNHR2Bg.png)
 Step 3: Click on `Roles`.
 ![enter image description here](https://i.imgur.com/JIWO5EN.png)
Step 4: Click on the little plus next to Roles.
![](https://i.imgur.com/gb3zdkc.png)
Step 5: Name the role `Teacher`.
![](https://i.imgur.com/lGBPeTg.png)
Step 6: Go back to Step 4 and do the same with the `Student Role`

## Timetable 
The timetable feature works like a normal timetable in real life. It just needs some simple steps to set it up. 

**Adding classes to the timetable:** 
`.timetable add <day> <from> <to> <channel> <subject>`
Example: `.timetable add Mo 8:00 8:50 #MathsChannel Maths`
**Clearing days out of the timetable:**
`.timetable clear <day>`
Example: `.timetable clear Mo`
**Printing the timetable**
`.timetable print`
It will show the entire timetable. 
## Alert
As a teacher you can send a message to all your students.
Example: `.alert Hey, my name is SchoolUtilities.`
## Calculation
You can easily calucate on discord now. 
Example: `.calc 23+17`

**Pro tip:** If you want to calculate the square root type `.calc sqrt(16)` 

## Translate 
You can translate singe words or even entire sentences.
Example: `.translate de I want to get translated!`
## Precense check
 As a teacher you can check the precense of the students.
 Example: `.check 2`
 The `2`in the example means that students have 2 minutes to confirm they are precent, if there is now number given it will take the time out of the configuration. 

## Creating Issues on Github
To create an issues you have to go to [issues](https://github.com/wahlmandat/schoolutilities/issues) and click on the top right on `New issues`. We will try to respond as fast as possible. 
