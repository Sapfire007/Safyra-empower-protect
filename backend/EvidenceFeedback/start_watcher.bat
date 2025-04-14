@echo off
echo Starting Weapon Detection Camera Watcher...

:: Set paths
set VENV_DIR=C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\EvidenceFeedback\testV
set WATCHER_SCRIPT=C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\EvidenceFeedback\file_watcher.py

:: Check if virtual environment exists, if not create it
if not exist "%VENV_DIR%\Scripts\activate.bat" (
    echo Creating virtual environment...
    python -m venv "%VENV_DIR%"
)

:: Activate the virtual environment
call "%VENV_DIR%\Scripts\activate.bat"

:: Install required packages
echo Installing required packages...
pip install opencv-python

:: Run the file watcher script
echo Starting file watcher...
python "%WATCHER_SCRIPT%"

:: Deactivate virtual environment (this will only run if the script exits)
call deactivate
pause