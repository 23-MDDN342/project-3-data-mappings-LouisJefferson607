[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/wBh5q70M)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11244022&assignment_repo_type=AssignmentRepo)
## 2023 MDDN342 Assignment 3: Data Mappings

PS: I did a different approach to a read me this time to really explain how to use my code

Title: Cookie Face Generator

Description:
This code generates cookie faces with customizable features using the p5.js library. Each face consists of elements such as eyes, mouth, and chocolate chips. The face properties can be adjusted using sliders to change the size of the eyes, the shape of the mouth, and the number and size of chocolate chips on the cookie. The user can train the computer by adjusting the sliders and saving the values given to a training_values.json file. The computer should then remeber the slider positions and automatically adjust them if given new faces to match what you did.

Instructions:

Open the index.html file in a web browser.
Adjust the sliders to modify the face properties.
The cookie face will be generated and displayed on the screen.
Code Overview:

The Face object represents a cookie face and contains properties such as eye size, mouth shape, and chocolate chip details.
The draw method of the Face object is responsible for rendering the cookie face based on the given face properties.
The face elements, such as eyes, mouth, and chocolate chips, are drawn using geometric shapes and positioned relative to the face's center.
The setProperties and getProperties methods allow for updating and retrieving the face properties from a list of numbers ranging from 0 to 100.
The code utilizes Perlin noise to add variation to the cookie shape and shadow.
Note: The code can be customized further to add additional features and enhance the visual appearance of the cookie faces.

