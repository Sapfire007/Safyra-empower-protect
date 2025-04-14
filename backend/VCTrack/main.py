import os
import tkinter as tk
import pyaudio
import wave
import threading
import time
from datetime import datetime
import json
import socket
import requests

class AudioRecorderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Audio Recorder")
        self.root.geometry("300x200")
        
        # Configure the output directory with absolute path
        self.output_dir = r"C:\Users\sapfi\OneDrive\Desktop\test - Copy\safyra-empower-protect\backend\VCTrack\OutputSOSaudio"
        try:
            if not os.path.exists(self.output_dir):
                os.makedirs(self.output_dir)
                print(f"Created output directory: {self.output_dir}")
            else:
                print(f"Using existing output directory: {self.output_dir}")
        except Exception as e:
            print(f"Error creating output directory: {e}")
            # Fallback to a directory that should be writable
            self.output_dir = os.path.join(os.path.expanduser("~"), "AudioRecordings")
            if not os.path.exists(self.output_dir):
                os.makedirs(self.output_dir)
            print(f"Using fallback directory: {self.output_dir}")
        
        # Audio recording parameters
        self.is_recording = False
        self.frames = []
        try:
            self.audio = pyaudio.PyAudio()
            self.stream = None
            self.sample_rate = 44100
            self.chunk_size = 1024
            self.channels = 1
            self.format = pyaudio.paInt16
            self.audio_initialized = True
        except Exception as e:
            print(f"Error initializing audio: {e}")
            self.audio_initialized = False
        
        # Create GUI elements
        self.setup_gui()
    
    def setup_gui(self):
        # Main frame
        main_frame = tk.Frame(self.root, padx=20, pady=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Record button
        self.record_button = tk.Button(main_frame, text="Press and Hold to Record", 
                                       bg="red", fg="white", font=("Arial", 12, "bold"))
        self.record_button.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Bind button events
        self.record_button.bind("<ButtonPress-1>", self.start_recording)
        self.record_button.bind("<ButtonRelease-1>", self.stop_recording)
        
        # Status label
        self.status_label = tk.Label(main_frame, text="Ready", font=("Arial", 10))
        self.status_label.pack(pady=10)
    
    def start_recording(self, event=None):
        if not self.is_recording:
            self.is_recording = True
            self.frames = []
            self.record_button.config(text="Recording...", bg="darkred")
            self.status_label.config(text="Recording in progress...")
            
            # Start recording in a separate thread
            self.record_thread = threading.Thread(target=self.record_audio)
            self.record_thread.daemon = True
            self.record_thread.start()
    
    def stop_recording(self, event=None):
        if self.is_recording:
            self.is_recording = False
            self.record_button.config(text="Press and Hold to Record", bg="red")
            
            # Wait for recording thread to finish
            if hasattr(self, 'record_thread') and self.record_thread.is_alive():
                self.record_thread.join()
            
            # Save the recorded audio
            if self.frames:
                self.save_audio()
                self.status_label.config(text="Audio saved successfully")
            else:
                self.status_label.config(text="Recording too short, not saved")
    
    def record_audio(self):
        self.stream = self.audio.open(
            format=self.format,
            channels=self.channels,
            rate=self.sample_rate,
            input=True,
            frames_per_buffer=self.chunk_size
        )
        
        while self.is_recording:
            data = self.stream.read(self.chunk_size)
            self.frames.append(data)
        
        # Close the stream
        self.stream.stop_stream()
        self.stream.close()
        self.stream = None
    
    def save_audio(self):
        # Generate filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_filename = f"recording_{timestamp}"
        audio_filename = os.path.join(self.output_dir, f"{base_filename}.wav")
        json_filename = os.path.join(self.output_dir, f"{base_filename}.json")
        
        # Save as WAV file
        with wave.open(audio_filename, 'wb') as wf:
            wf.setnchannels(self.channels)
            wf.setsampwidth(self.audio.get_sample_size(self.format))
            wf.setframerate(self.sample_rate)
            wf.writeframes(b''.join(self.frames))
        
        # Create JSON file with metadata
        metadata = self.get_metadata()
        with open(json_filename, 'w') as jf:
            json.dump(metadata, jf, indent=4)
        
        print(f"Audio saved to: {audio_filename}")
        print(f"Metadata saved to: {json_filename}")
        
    def get_metadata(self):
        """Collect metadata including IP, date, time, and geolocation."""
        current_time = datetime.now()
        
        # Get IP address
        try:
            # Get local IP
            local_ip = socket.gethostbyname(socket.gethostname())
            
            # Get public IP and geolocation
            geo_data = {}
            try:
                response = requests.get('https://ipinfo.io/json', timeout=5)
                if response.status_code == 200:
                    geo_data = response.json()
            except Exception as e:
                print(f"Error getting geolocation: {e}")
                
            metadata = {
                "timestamp": current_time.strftime("%Y-%m-%d %H:%M:%S"),
                "date": current_time.strftime("%Y-%m-%d"),
                "time": current_time.strftime("%H:%M:%S"),
                "local_ip": local_ip,
                "public_ip": geo_data.get("ip", "Unknown"),
                "geolocation": {
                    "city": geo_data.get("city", "Unknown"),
                    "region": geo_data.get("region", "Unknown"),
                    "country": geo_data.get("country", "Unknown"),
                    "location": geo_data.get("loc", "Unknown"),
                    "org": geo_data.get("org", "Unknown")
                }
            }
            return metadata
            
        except Exception as e:
            print(f"Error collecting metadata: {e}")
            return {
                "timestamp": current_time.strftime("%Y-%m-%d %H:%M:%S"),
                "date": current_time.strftime("%Y-%m-%d"),
                "time": current_time.strftime("%H:%M:%S"),
                "error": str(e)
            }
    
    def on_closing(self):
        if self.is_recording:
            self.stop_recording()
        if self.stream:
            self.stream.close()
        self.audio.terminate()
        self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = AudioRecorderApp(root)
    root.protocol("WM_DELETE_WINDOW", app.on_closing)
    root.mainloop()