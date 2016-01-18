# cmm-drupal-boiler

Cheeky Monkey Media Boiler

Boiler plate code for using the foundation base theme with drupal. 
Also using the "/UI" method to compile all the front-end related code.



1) Put the "UI" folder in the drupal root folder where your drupal project is installed.

2) Put the "cmmdrupalboiler" folder in the /sites/all/themes folder. (This is your starter package for the theme).

3) Install the zurb_foundation base theme (in the /sites/all/themes folder).

4) Open a Terminal and run "npm install". If you run into permission errors, you made need to run it as sudo -- but it's better to change permissions on the folders instead.

5) From the /UI folder, run "grunt dev" to watch and compile for development environments. and "grunt build" for production ready deployments and code commits.

*NOTE* In the /UI folder, there is a readme that explains the software you may need first, to get the everything compiling and installing correctly.

