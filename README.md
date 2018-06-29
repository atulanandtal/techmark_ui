# 5iveC

5iveC front-end application. 
Framework `Angular 4.0`
Build Tool `Angular CLI 1.2.7`

# Instructions for setup
  1. Install Node on your machine if they are not installed. https://nodejs.org/en/download/
  2. Now Install Angular-CLI by running command `npm install -g @angular/cli`.
  2. After Checkout go to project folder and run `npm install` command from terminal.
  3. When `npm install` is complete then run `ng serve --open` command.
  4. And your application will be running on your default browser.
  
  If any issue persist in setting up project contact to `Jagdeep Singh` or `Atul Anand`.
  
# Instructions for gulp tasks
# Added gulp tasks will help us with following 
  1. Convert svg files into fonts
  2. Compile less files to create a single site.css file
  3. Keep watching any changes in less files and auto compile less files
  4. Copy fonts to appropriate folder
   
# Task 1 : for point 1
  $ gulp font
  to access generated icons with fonts go to: http://localhost:4200/assets/icon-font/dist/index.html

# Task 2 : for point 2, 3 and 4
  $ gulp
  to access static dashboard go to: http://localhost:4200/assets/web/index.html
