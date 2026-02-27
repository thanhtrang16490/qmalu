#!/bin/bash

# Script to update all pages from max-w-[980px] to container mx-auto

echo "Updating container widths from max-w-[980px] to container mx-auto..."

# Find all .astro files and replace max-w-[980px] mx-auto with container mx-auto
find src/pages -name "*.astro" -type f -exec sed -i '' 's/max-w-\[980px\] mx-auto px-4 sm:px-6/container mx-auto px-4 sm:px-6 lg:px-8/g' {} +

echo "Done! Updated all pages to use container mx-auto"
echo "Note: This gives a max-width of 1280px (max-w-7xl) instead of 980px"
