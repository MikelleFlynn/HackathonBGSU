# HackathonBGSU

Team name: AllVibesNoWaste
Track: Sustainability
Members: Mikelle Flynn, Austin Opsomer, Mia Howard, Megan Brown

Gardenology is a web app that helps users learn about plants, find gardening tips, and build their own virtual garden. It connects to the Permapeople API for plant data, supports search and categorization, and includes interactive features like saving plants to a personal garden.

Features:
    - Search for plants by name
    - Browse categorized plants (Herbs, Flowers, etc)
    - Save and remove plants from My Garden
    - View detailed care info for a wide variety of plants
    - Browse tips and tricks to build a sustainable garden
    - Play games to level up your sustainability knowledge!
    - Contact our team with any questions

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

Future Developement: