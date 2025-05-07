# Hope Food Donation

A web application to connect food donors with recipients to reduce waste and address hunger.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Hope Food Donation is a Flask-based web application that aims to reduce food waste by connecting individuals and businesses with excess food to those in need. The platform allows donors to list available food items and recipients to view and request these donations.

## Features

- **User Authentication**: Secure login and registration for donors and recipients
- **Donation Management**: Create, view, update, and delete food donation listings
- **Search Functionality**: Find donations by location, food type, and availability
- **User Profiles**: Manage personal information and donation history
- **Responsive Design**: Mobile-friendly interface for access on any device

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Local Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/hope_food_donation.git
   cd hope_food_donation
   ```

2. Create a virtual environment (recommended):
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   Create a `.env` file in the project root directory with the following variables:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your_secret_key
   DATABASE_URI=your_database_uri
   ```

6. Initialize the database:
   ```
   flask db init
   flask db migrate
   flask db upgrade
   ```

7. Run the application:
   ```
   flask run
   ```
   The application will be available at http://127.0.0.1:5000/

## Usage

1. Register as a donor or recipient
2. For donors:
   - Create listings for available food items
   - Manage your donations and view requests
   - Update or remove listings as needed
3. For recipients:
   - Browse available donations
   - Request food items
   - View your request history

## Deployment

### Deploying to Render (Recommended for Beginners)

1. Create a free account on [Render](https://render.com)

2. Make sure your repository includes:
   - `requirements.txt` with all dependencies
   - `gunicorn` in your requirements

3. On the Render dashboard:
   - Click "New" and select "Web Service"
   - Connect to your GitHub/GitLab repository
   - Choose Python environment
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn app:app`
   - Click "Create Web Service"

4. Your application will be deployed and available at a `*.onrender.com` URL

### Alternative Deployment Options

- **Heroku**: Similar to Render but with different pricing tiers
- **PythonAnywhere**: Specialized hosting for Python applications
- **VPS providers**: For more control, consider DigitalOcean, AWS, or Linode

## Technologies Used

- **Backend**: Flask, SQLAlchemy
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: Flask-Login
- **Forms**: Flask-WTF
- **Deployment**: Gunicorn, Render

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For questions or support, please open an issue on the GitHub repository or contact the project maintainers.
