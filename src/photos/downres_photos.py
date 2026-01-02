import os
from PIL import Image
from pathlib import Path

# Get the directory where this script is located
script_dir = Path(__file__).parent

# Find all .jpeg files in the directory
jpeg_files = list(script_dir.glob("*.jpeg")) + list(script_dir.glob("*.jpg"))

if not jpeg_files:
    print("No JPEG files found in the directory.")
    exit(0)

print(f"Found {len(jpeg_files)} JPEG file(s). Processing...")

for jpeg_file in jpeg_files:
    try:
        # Open the image
        img = Image.open(jpeg_file)
        
        # Get original dimensions
        original_width, original_height = img.size
        print(f"Processing {jpeg_file.name}: {original_width}x{original_height}")
        
        # Calculate new dimensions (10% of original)
        new_width = int(original_width * 0.1)
        new_height = int(original_height * 0.1)
        
        # Resize the image using high-quality resampling
        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Save the resized image, overwriting the original
        resized_img.save(jpeg_file, "JPEG", quality=85, optimize=True)
        
        print(f"  ✓ Resized to {new_width}x{new_height}")
        
    except Exception as e:
        print(f"  ✗ Error processing {jpeg_file.name}: {e}")

print(f"\nDone! Processed {len(jpeg_files)} file(s).")

