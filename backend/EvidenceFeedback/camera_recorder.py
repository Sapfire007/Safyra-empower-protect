import os
import cv2
import time
import json
import sys
from datetime import datetime

# Define paths
target_file_path = r"C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\WreaponDetect2\response.json"
output_folder = r"C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\EvidenceFeedback\OutputVid"

# Ensure output directory exists
os.makedirs(output_folder, exist_ok=True)

def get_alert_info():
    """Read alert information from response.json"""
    try:
        with open(target_file_path, 'r') as f:
            data = json.load(f)
        return data
    except Exception as e:
        print(f"Error reading response.json: {str(e)}")
        return {}

def record_video(duration=5, max_retries=3):
    """Record video with retry mechanism"""
    for attempt in range(max_retries):
        # Initialize camera
        cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Use DirectShow on Windows for better camera access
        
        if not cap.isOpened():
            print(f"Error: Could not open camera. Attempt {attempt+1}/{max_retries}")
            if attempt < max_retries - 1:
                print("Waiting 2 seconds before retrying...")
                time.sleep(2)
                continue
            else:
                print("Failed to access camera after multiple attempts.")
                return None
        
        # Get video properties
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = 30
        
        # Generate output filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = os.path.join(output_folder, f"recording_{timestamp}.mp4")
        
        # Initialize video writer
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        if not out.isOpened():
            print(f"Error: Could not create video writer. Attempt {attempt+1}/{max_retries}")
            cap.release()
            if attempt < max_retries - 1:
                print("Waiting 2 seconds before retrying...")
                time.sleep(2)
                continue
            else:
                print("Failed to create video writer after multiple attempts.")
                return None
        
        # Record for specified duration
        start_time = time.time()
        frames_captured = 0
        print(f"Recording started... ({duration} seconds)")
        
        try:
            while (time.time() - start_time) < duration:
                ret, frame = cap.read()
                if not ret:
                    print("Error: Failed to capture frame.")
                    break
                
                # Write frame to video file
                out.write(frame)
                frames_captured += 1
                
                # Display the frame (optional)
                cv2.imshow('Recording...', frame)
                
                # Press 'q' to quit early
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            
            # Release resources
            cap.release()
            out.release()
            cv2.destroyAllWindows()
            
            # Verify recording was successful
            if frames_captured > 0:
                print(f"Recording completed. Video saved to: {output_path}")
                print(f"Captured {frames_captured} frames.")
                return output_path
            else:
                print("Error: No frames were captured.")
                if attempt < max_retries - 1:
                    print("Retrying...")
                    continue
                return None
                
        except Exception as e:
            print(f"Error during recording: {str(e)}")
            # Clean up resources
            cap.release()
            out.release()
            cv2.destroyAllWindows()
            
            if attempt < max_retries - 1:
                print("Retrying...")
                continue
            return None
    
    return None  # If all attempts fail

def save_metadata(video_path, alert_info):
    """Save metadata about the recording and the alert"""
    if not video_path or not alert_info:
        return
    
    # Create metadata file with same name as video but .json extension
    metadata_path = video_path.replace('.mp4', '.json')
    
    metadata = {
        "video_file": os.path.basename(video_path),
        "recorded_at": datetime.now().isoformat(),
        "alert_info": alert_info
    }
    
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=4)
    
    print(f"Metadata saved to: {metadata_path}")

def main():
    # Check if the target file exists
    if os.path.exists(target_file_path):
        print(f"Found {target_file_path}")
        alert_info = get_alert_info()
        video_path = record_video(5)
        if video_path:
            save_metadata(video_path, alert_info)
        else:
            print("Failed to record video.")
    else:
        print(f"File not found: {target_file_path}")

if __name__ == "__main__":
    main()