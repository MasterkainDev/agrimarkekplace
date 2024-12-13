$imageUrls = @{
    "organic-farm.jpg" = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80"
    "aquaponics.jpg" = "https://images.unsplash.com/photo-1585849834908-3481231155e5?w=800&q=80"
    "cooperative.jpg" = "https://images.unsplash.com/photo-1595508064774-5ff825ff0f81?w=800&q=80"
}

$outputPath = "..\public\images\investments"

foreach ($image in $imageUrls.GetEnumerator()) {
    $outputFile = Join-Path $outputPath $image.Key
    Write-Host "Downloading $($image.Value) to $outputFile"
    Invoke-WebRequest -Uri $image.Value -OutFile $outputFile
}
