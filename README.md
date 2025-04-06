# HackathonBGSU – Gardenology

**Team Name:** AllVibesNoWaste  
**Track:** Sustainability  
**Team Members:** Mikelle Flynn, Austin Opsomer, Mia Howard, Megan Brown

## About

Gardenology is a web app that helps users explore plant care, discover sustainable gardening tips, and build their own virtual garden. It connects to the Permapeople API to provide rich plant data and supports search, categorization, and interactive features like "My Garden" to personalize the experience.

## Features

- Search for plants by name  
- Browse categorized plants (Herbs, Flowers, Produce, All Plants)  
- View detailed care information (sunlight, soil, watering, native region)  
- Save and remove plants from My Garden  
- Explore tips and tricks to create a sustainable garden  
- Play interactive games to boost your gardening knowledge  
- Contact the team with questions or feedback  

## Setup Instructions

### 1. Install Node.js (if not already)

Make sure you're using the latest LTS version:

```bash
node -v      # Verify Node.js  
nvm -v       # Verify Node Version Manager (optional)  
```

Then, in the project folder:

```bash
npm init -y                      # Initialize Node project  
npm install express cors dotenv  # Install required packages  
```

### 2. Configure API Access

- Request an API key from https://permapeople.org  
- Create a `.env` file in the project root and add:

```env
KEY_ID=your_key_here  
KEY_SECRET=your_secret_here  
```

### 3. Run the App

Start the server:

```bash
node server.js  
```

Then, open the frontend using the Live Server extension in VSCode (open `main.html`).

## Future Development

- Add advanced filtering (climate zone, season, difficulty)  
- Fine-tune UI/UX and responsiveness  
- Add milestones and plant growth tracking  
- Add care reminders (watering, planting)  
- Add more mini-games and educational features  
- Add a garden layout planner  

## Credits

Plant data provided by the [Permapeople API](https://permapeople.org).  
This project would not be possible without their open-source plant database.

Future Developement: