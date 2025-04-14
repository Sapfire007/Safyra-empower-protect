@echo off
echo Starting Audio Recorder Application...

:: Check if virtual environment exists
if not exist "C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\VCTrack\test\Scripts\activate.bat" (
    echo Virtual environment not found. Creating a new one...
    python -m venv "C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\VCTrack\venv"
    call "C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\VCTrack\venv\Scripts\activate.bat"
    pip install pyaudio requests
) else (
    call "C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\VCTrack\test\Scripts\activate.bat"
)

:: Run the application
python "C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\VCTrack\main.py"
deactivate
pause