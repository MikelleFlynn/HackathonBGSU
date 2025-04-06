# HackathonBGSU

Team name: AllVibesNoWaste
Track: Sustainability
Members: Mikelle Flynn, Austin Opsomer, Mia Howard, Megan Brown

Setup:
    1. If Node.js is not installed, install latest LTS version and run these in terminal:
        - node -v # Checks if node is installed
        - nvm -v # Checks if nvm is installed
        - Navigate to project folder and run:
            * npm init -y # Initialize node project
            * npm install express cors dotenv # Install necessary packages

    2. API key is needed for access to permapeople.org database:
        - Request key from permapeople.org website (has instructions on website)
        - Create ".env" file in project root
        - Store KEY_ID = <your_key> and KEY_SECRET = <your_ID>

    3. Run "node server.js" before opening live server extension on VSCode
