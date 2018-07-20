# ionic-2

Below are the steps to host the web app using Firebase hosting:
 
-	Execute the following on the command line as an administrator. This is to be done only once:
npm install -g firebase-tools
-	Run the login step so that you can login on the Firebase console using your credentials:
firebase login
 
 
-	Navigate to the project directory, then run the command
firebase init
You will be greeted with an intro screen that lets you select what component to modify via command line
 
 
-	Choose hosting using down arrow keys then pressing spacebar. Hit enter afterwards:
 
 
-	You will also be asked to choose which directory to deploy. Select type www and press Enter
 
 
-	If you are asked to do modifications on index.html, select No
 
 
-	The initialization is complete. 
 
-	To compile the current code, please type the command below:
ionic cordova build --prod 
 
If prompted to choose which platform, type none so that it will not execute a separate compile for iOS and Android
 
Ensure that the compilation finishes on this step before proceeding to the next step.
 
-	Once the compilation has been completed, please execute the following step:
firebase deploy --only hosting
 
 
-	The latest code update is now uploaded to https://service-technician.firebaseapp.com/ once the deployment finishes.
Console to manage hosting history can be accessed on the link: https://console.firebase.google.com/project/service-technician/hosting/
