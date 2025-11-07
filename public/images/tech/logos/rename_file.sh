#!/bin/bash

# Loop through all files in the current directory
for file in *; do
  # Skip directories
  if [ -f "$file" ]; then
    # Create a new name by replacing spaces with dashes and converting to 
lowercase
    new_name=$(echo "$file" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    
    # Rename the file if the new name is different
    if [ "$file" != "$new_name" ]; then
      mv "$file" "$new_name"
      echo "Renamed: '$file' -> '$new_name'"
    fi
  fi
done

echo "All applicable files have been renamed."

