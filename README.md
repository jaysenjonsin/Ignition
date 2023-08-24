## **Ignition**
  <p align="center">
    <img src="/web/public/favicon.ico" width="100">
</p>

  <p align = "center">
  <b>Task management software with the physician in mind.</b>
  </p>


## **Table of Contents**

- [Description](https://github.com/jaysenjonsin/Ignition#Description)
- [Key Features](https://github.com/jaysenjonsin/Ignition#Description)
- [Built With](https://github.com/jaysenjonsin/Ignition#Built-With)
- [Installation](https://github.com/jaysenjonsin/Ignition#Installation)
- [How to Contribute](https://github.com/oslabs-beta/Scribe-for-GraphQL#How-to-Contribute)

## **Description**

Physician burnout is at an all-time high for independent medical practices. This burnout is directly linked with the usability of the physician's electronic health record system (EHR). Ignition is an effective task collaboration/inbox management software designed to be integrated with EHR’s to improve team utilization, workflow efficiency, and decreased cognitive load.

## **Key Features**

- Role based access control: Users can create an account with varying permissions and access levels including physician, mid-level practioner (NP, PA), medical assistant, and patient. Accounts are protected with JWT authentication.
- Task management: Users can create, update and delete tasks within their medical team. Patients can schedule appointments with physicians and mid-level practioners while the medical team can assign tasks to others in their team or send messages to patients.

## **Built With:**

- React
- Express
- Node
- MongoDB
- webpack
- Redux Toolkit
- JWT/bcrypt
- react-router

## **Installation**

<b>Prerequisites: </b>
To create your own environment for the application, you will need to first create an account with  <a href='mongodb.com'> MongoDB </a> for your database.
1. Fork and clone the repository
```
git clone https://github.com/<your-username>/ignition.git
```

2. Install dependencies
```
cd ignition
npm i
```

3. Create a .env file in the root of the project and add the following environment variables:
```
NODE_ENV = development
MONGO_URI =
PORT =
JWT_SECRET = 
```
4. Start the development server
```
npm run dev
```

## **How to Contribute**

Any further contributions to this project would be greatly appreciated! Here’s how:

1. Fork and Clone the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Added an AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
