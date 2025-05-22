$directories = @(
    "public/images/about",
    "public/images/careers",
    "public/images/contact",
    "public/images/events",
    "public/images/news",
    "public/images/practice-areas",
    "public/images/resources"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "Created directory: $dir"
    }
} 