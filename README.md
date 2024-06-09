## Wire Apps - e-commerce mobile app (Shoe Store)

This document provides a detailed overview of the technical aspects of this React Expo App.

**Tech Stack:**

* **React Expo SDK 51:** This project utilizes React Expo SDK 51 for building a cross-platform mobile application (iOS and Android) using React and JavaScript. Expo provides a streamlined development environment with built-in tools and libraries for a faster development experience.

* **Expo Routing:** Expo routing is implemented for managing navigation within the app. This allows for defining different screens and transitions between them.

* **Redux Toolkit:** Redux Toolkit is used for state management in the application. It simplifies the setup and usage of Redux, a popular state management library, by providing utilities and abstractions like reducers, slices, and actions.

* **Tailwind CSS + NativeWind:** Tailwind CSS provides a utility-first approach to styling React components. It offers a comprehensive set of pre-defined classes for layout, typography, colors, and more. NativeWind integrates Tailwind CSS seamlessly within Expo projects, allowing for easy styling of your application's UI.

* **Jest:** Jest is a popular JavaScript testing framework used for unit and integration testing of the application's components and logic.


**Screenshots:**

<table>
   <tr>
      <td><img src="/screenshots/screenshot-1.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-2.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-3.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-4.png" width="150" height="300"/></td>
   </tr>
   <tr>
      <td><img src="/screenshots/screenshot-5.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-6.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-7.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-8.png" width="150" height="300"/></td>
   </tr>
   <tr>
      <td><img src="/screenshots/screenshot-9.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-10.png" width="150" height="300"/></td>
      <td><img src="/screenshots/screenshot-11.png" width="150" height="300"/></td>
   </tr>
</table>

**Development Setup:**

1. **Prerequisites:**
    - Node.js and npm (or yarn) installed on your machine.

2. **Cloning the Repository:**
    - Clone this repository using Git:

        ```https://github.com/gayanSandamal/shoe-store-app-wireapps-ecom```

    - Add API URL to the .env file
        ```
        BASE_API='https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/'
        ```

3. **Installing Dependencies:**
    - Navigate to the project directory in your terminal.
    - Run `npm install` (or `yarn install`) to install all required dependencies.

4. **Running the App:**
    - With dependencies installed, you can run the app in development mode using:
        ```bash
        npm run start
        ```
        or
        ```
        npm run iod
        ```
        or 
        ```
        npm run android
        ```
    - This will launch the Expo development server and open the app on your device or emulator.

**Testing:**

- Unit and integration tests are written using Jest. 
- To run the tests, navigate to the project directory in your terminal and run:

   ```bash
   npm run test
   ```

