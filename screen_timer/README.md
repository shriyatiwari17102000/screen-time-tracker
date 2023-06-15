# Screen Time Tracker

The Screen Time Tracker is a simple React.js application that tracks the user's desktop screen time and handles user idleness. It features a draggable widget that displays the screen time and idleness status.

## Features

- **Screen Time Tracking:** The application tracks the user's desktop screen time while it's running. The screen time is updated every second and displayed on the draggable widget.

- **Idleness Detection:** The application detects when the user is idle, which is defined as no keyboard or mouse activity for a specified time. When the user is idle, the widget displays an "Idle" indicator. The screen time tracking pauses during idleness and resumes when the user becomes active again.

- **Idle Time Threshold Configuration:** Users can configure the idle time threshold according to their preference. The default threshold is set to 1 minute, but it can be adjusted to values such as 5 minutes or 10 minutes. The settings can be accessed via a context menu on the draggable widget.

## Getting Started

To run the Screen Time Tracker application locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/shriyatiwari17102000/screen-time-tracker.git
   ```

2. Navigate to the project directory:

   ```
   cd screen-timer
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```

5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to see the application in action.

## Configuration

To adjust the idle time threshold, follow these steps:

1. Right-click on the draggable widget.

2. Select the desired threshold from the context menu options. Available options are 1 Minute, 5 Minutes, and 10 Minutes.

## Technologies Used

- React.js
- react-draggable

## Acknowledgments

- The [react-draggable](https://www.npmjs.com/package/react-draggable) library for the draggable widget functionality.
