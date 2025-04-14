@echo off
echo Starting Weapon Detection Camera Watcher in background...

:: Start the watcher in a hidden window
start /min cmd /c "C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\EvidenceFeedback\start_watcher.bat"

echo Watcher started in background. Check watcher_log.txt for status.
timeout /t 5