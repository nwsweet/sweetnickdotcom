import random
from PIL import Image
import os

# OUTPUT_DIR = "random_photos"
NUM_IMAGES = 40

# Create output directory if it doesn't exist
# os.makedirs(OUTPUT_DIR, exist_ok=True)

for i in range(NUM_IMAGES):
    # Random image size
    width = 200
    height = 200

    # Random RGB color
    color = (
        random.randint(0, 255),
        random.randint(0, 255),
        random.randint(0, 255),
    )

    # Create image
    img = Image.new("RGB", (width, height), color)

    # Save image
    filename = f"photo_{i + 1:02d}.jpg"
    # path = os.path.join(OUTPUT_DIR, filename)
    img.save(filename, "JPEG", quality=85)

    print(f"Created {filename} ({width}x{height}, color={color})")

print("Done generating images.")
