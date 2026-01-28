import os
from PIL import Image
from pathlib import Path

# Get the directory where this script is located
script_dir = Path(__file__).parent

full_res_dir = script_dir / "full_res"
thumbs_dir = script_dir / "thumbs"
thumbs_dir.mkdir(parents=True, exist_ok=True)

# Find all .jpeg files in the full_res directory
jpeg_files = list(full_res_dir.glob("*.jpeg")) + list(full_res_dir.glob("*.jpg"))

if not jpeg_files:
    print(f"No JPEG files found in {full_res_dir}.")
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
        
        # Save the resized image in the thumbs directory
        output_path = thumbs_dir / jpeg_file.name
        resized_img.save(output_path, "JPEG", quality=85, optimize=True)
        
        print(f"  ✓ Resized to {new_width}x{new_height} -> {output_path.name}")
        
    except Exception as e:
        print(f"  ✗ Error processing {jpeg_file.name}: {e}")

print(f"\nDone! Processed {len(jpeg_files)} file(s).")
