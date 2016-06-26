# Inshallahapp

An app for Refugees and Volunteers to find and help each other.

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/f-o-g/inshallahapp.git
  $ cd inshallahapp
  ```

2. **Install dependencies** (npm v3+):

  ```
  $ npm install
  $ (cd ios; pod install)        # only for iOS version
  ```

3. **Make sure MongoDB is running:**

  ```
  $ lsof -iTCP:27017 -sTCP:LISTEN
  ```

4. **Start Parse servers:**

  ```
  $ npm run server
  ```

  Make sure everything works by visiting:

    * Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)


5. **Running on Android**:

  Open an android emulator

  ```
    $ adb reverse tcp:8081 tcp:8081
    $ adb reverse tcp:8080 tcp:8080
    $ react-native start
  ```

  ```
    $ react-native run-android
  ```

  Alternatively, you can use Android studio to run android