#!/bin/bash

# Initialize the array
array="["

# Counter for ID
id=1

# Loop through all files in the current directory
for file in *; do
  # Skip directories, process only files
  if [ -f "$file" ]; then
    # Extract the file name without the extension
    name=$(basename "$file" | sed -e 's/\.[^.]*$//')

    # Replace dashes and underscores with spaces
    name_with_spaces=$(echo "$name" | sed 's/[-_]/ /g')

    # Convert the name to proper format: capitalize each word
    formatted_name=$(echo "$name_with_spaces" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')

    # Add an object to the array
    array+="    { id: $id, name: '$formatted_name', icon: '/images/tech/logos/$file' },\n"

    # Increment ID
    id=$((id + 1))
  fi
done

# Remove the trailing comma and newline, then close the array
array=$(echo -e "$array" | sed '$ s/,$//')
array+="\n]"

# Output the array
echo -e "$array"

