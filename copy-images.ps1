$sections = @(
    "about",
    "careers",
    "contact",
    "events",
    "news",
    "practice-areas",
    "resources"
)

$sourceImage = "public/images/placeholder.svg"

foreach ($section in $sections) {
    $targetImage = "public/images/$section/hero.jpg"
    Copy-Item -Path $sourceImage -Destination $targetImage -Force
    Write-Host "Copied placeholder to: $targetImage"
}

# Copy additional images for specific sections
$additionalImages = @(
    "news/featured-article.jpg",
    "events/ma-conference.jpg",
    "events/esg-webinar.jpg",
    "events/tech-symposium.jpg",
    "events/arbitration-summit.jpg",
    "events/real-estate-forum.jpg",
    "resources/ma-guide.jpg",
    "resources/esg-checklist.jpg",
    "resources/q1-update.jpg"
)

foreach ($image in $additionalImages) {
    $targetImage = "public/images/$image"
    Copy-Item -Path $sourceImage -Destination $targetImage -Force
    Write-Host "Copied placeholder to: $targetImage"
} 