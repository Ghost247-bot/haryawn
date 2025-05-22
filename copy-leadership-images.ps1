$sourceImage = "public/images/placeholder.svg"
$leadershipImages = @(
    "john-smith.jpg",
    "sarah-johnson.jpg",
    "michael-chen.jpg"
)

foreach ($image in $leadershipImages) {
    $targetImage = "public/images/leadership/$image"
    Copy-Item -Path $sourceImage -Destination $targetImage -Force
    Write-Host "Copied placeholder to: $targetImage"
} 