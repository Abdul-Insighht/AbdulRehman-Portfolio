import cv2
import os

# Extract sample frame from output video
video_path = r"D:\Github\Abdul-Insighht-repos\Real-Time-Football-Player-Team-Tracking\outputs\yolo_output\121364_0.avi"
output_path = r"D:\Github\Abdul-Insighht-repos\Real-Time-Football-Player-Team-Tracking\outputs\sample_detection.png"

cap = cv2.VideoCapture(video_path)
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Total frames: {total}")

# Go to middle of video
cap.set(cv2.CAP_PROP_POS_FRAMES, total // 2)
ret, frame = cap.read()
if ret:
    cv2.imwrite(output_path, frame)
    print(f"Saved: {output_path}")
else:
    print("Failed to read frame")
cap.release()
