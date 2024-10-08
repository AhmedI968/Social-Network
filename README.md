# Social-Network
The project for CPSC 471

# Running this Application:

To run The Social Network, please ensure you have node modules installed and follow the steps below to intialize prisma. Then go to the directory of the code and open the terminal and run the command: "npm run dev". To explore the database please open a seperate terminal and run "npx prisma studio" to get a GUI experience of all the tables in the database.

Please Enjoy The Social Network.

# env file was attached to the second submission as it was necessary for the database url, please take the file and put in the root directory once you the unzip the folder. Thank you.

# **Initialize Prisma**

1) Initialize npm by running 'npm init -y' in terminal
2) Install dependencies: 'npm i --save-dev prisma typescript ts-node @types/node nodemon'
3) Initialize Prisma if prisma folder is not visible: 'npx prisma init --datasource-provider mysql' 
* recommended: install Prisma extension on VS Code to help with auto-formatting
4) Install Prisma client library to interact with models using TypeScript 'npm i @prisma/client'
5) Run 'npx prisma generate'
6) Run 'npx prisma migrate dev' and the database will be ready.

**SocialNetwork** connects people in the interconnected world of the internet. It aims to revolutionize online friendships by providing a platform that fosters authentic connections based on meaningful interactions and shared interests.

# **Technologies Involved**

- Prisma ORM
- MySQL database
- React frontend interface



## **Problem Definition**

The lack of authenticity in online friendships has been a longstanding issue in social media platforms. Users often struggle to form meaningful connections amidst superficial interactions, leading to feelings of isolation and dissatisfaction.

## **Problem History**
The problem of disingenuous online friendships emerged with the rise of social media platforms like Facebook, Twitter, and Instagram. Despite their popularity, these platforms fail to facilitate genuine connections, resulting in low levels of social support among users.

## **Why is this Problem Interesting?**
Authentic connections are fundamental to human well-being, yet digital realms frequently fall short in fulfilling this need. There exists a gap between the quantity and quality of online connections, raising intriguing questions about the nature of friendship in the digital age.

## **Proposed Solution**
The Social Network project proposes a solution that enhances online friendship authenticity and transparency. It involves a platform where users can rate each other based on various metrics, fostering connections beyond superficial attributes and matching individuals based on shared interests.

## **What does this project achieve?**
User Profiles: A user-friendly platform for creating profiles showcasing interests and preferences.
Rating System: Users can rate each other based on experiences, enhancing authenticity and transparency.
Cumulative Scorecard: Displays users’ average ratings transparently, providing insight into their reputations.
Anti-Gaming Measures: Prevents system manipulation to ensure fairness and reliability.

## **Motivation**
Our motivation stems from the desire to address the disconnect between online relationships and meaningful connections. By fostering transparency and authenticity in online interactions, we aim to improve the overall socializing experience.
