# Submission
The setup is getting there. 
Please make sure you have NodeJS and Python ready to go.

https://www.python.org/downloads/
https://nodejs.org/en/

## Installation

### Step 1: Clone repository from github. 

```
# Navigate to desktop via command line or terminal.
cd path/to/desktop

# Clone git repository
git clone https://github.com/CodeRED-Renegades/submission.git
```

### Step 2: Get the following files from Adil and put them in the root directory:

```
.env
.flaskenv
```

### Step 3: From the root directory, run these commands in the following sequence.

```
# Create virtual environment.
python -m venv venv 

# Activate virtual environment
venv\Scripts\acitvate.bat # Windows 
venv\bin\activate # macOS or linux

# Install dependencies
python -m pip install -r requirements.txt

# CD into frontend folder
cd src/frontend

# Install npm packages
npm install

# Build react frontend
npm run build

# CD back out to root dir.
cd ../..

# Run project
flask run
```
