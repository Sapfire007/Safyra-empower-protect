import os
import time
import subprocess
import sys
import json
import webbrowser
from datetime import datetime

# Define paths
response_json_path = r"C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\WreaponDetect2\response.json"
camera_recorder_path = r"C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\EvidenceFeedback\camera_recorder.py"
log_file_path = r"C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\EvidenceFeedback\watcher_log.txt"

# Time threshold in seconds (only trigger if file was modified within this time)
RECENT_THRESHOLD = 10  # Consider a file recent if modified within 10 seconds
# Delay before starting camera recording (to allow browser to release camera)
CAMERA_DELAY = 2  # seconds

def log_message(message):
    """Write a message to the log file with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(log_file_path, "a") as log_file:
        log_file.write(f"[{timestamp}] {message}\n")
    print(f"[{timestamp}] {message}")

def is_recent_update(file_path):
    """Check if the file was recently updated"""
    if not os.path.exists(file_path):
        return False
    
    current_time = time.time()
    file_mod_time = os.path.getmtime(file_path)
    
    # Check if file was modified within threshold
    return (current_time - file_mod_time) <= RECENT_THRESHOLD

def is_valid_json(file_path):
    """Check if the file contains valid JSON with required fields"""
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            # Check for required fields
            required_fields = ['alert', 'timestamp']
            return all(field in data for field in required_fields)
    except Exception as e:
        log_message(f"Error validating JSON: {str(e)}")
        return False

def run_camera_recorder():
    """Run the camera recorder script using the current Python interpreter"""
    try:
        log_message("Weapon detected! Preparing to start camera recording...")
        
        # Wait for a moment to allow the browser to release the camera
        log_message(f"Waiting {CAMERA_DELAY} seconds for camera to be released...")
        time.sleep(CAMERA_DELAY)
        
        # Use the same Python interpreter that's running this script
        python_exe = sys.executable
        
        # Run with higher priority to ensure it gets camera access
        if os.name == 'nt':  # Windows
            startupinfo = subprocess.STARTUPINFO()
            startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
            process = subprocess.run(
                [python_exe, camera_recorder_path], 
                check=True,
                startupinfo=startupinfo,
                creationflags=subprocess.HIGH_PRIORITY_CLASS
            )
        else:  # Unix-like
            process = subprocess.run(
                [python_exe, camera_recorder_path],
                check=True
            )
            
        log_message("Camera recording completed successfully")
    except subprocess.CalledProcessError as e:
        log_message(f"Error running camera recorder: {str(e)}")
    except Exception as e:
        log_message(f"Unexpected error: {str(e)}")

def main():
    log_message("File watcher started. Monitoring for weapon detection events...")
    
    last_mod_time = 0
    
    try:
        while True:
            if os.path.exists(response_json_path):
                current_mod_time = os.path.getmtime(response_json_path)
                
                # Check if file has been modified since last check
                if current_mod_time > last_mod_time:
                    last_mod_time = current_mod_time
                    
                    # Check if it's a recent update and contains valid data
                    if is_recent_update(response_json_path) and is_valid_json(response_json_path):
                        run_camera_recorder()
            
            # Sleep to avoid high CPU usage
            time.sleep(1)
    except KeyboardInterrupt:
        log_message("File watcher stopped by user")
    except Exception as e:
        log_message(f"Error in file watcher: {str(e)}")

if __name__ == "__main__":
    main()