$http = New-Object System.Net.HttpListener
$port = 8080
$http.Prefixes.Add("http://localhost:$port/")
$http.Prefixes.Add("http://127.0.0.1:$port/")
try {
    $http.Start()
    Write-Host "WHYLOHOME Event Management Server running at http://localhost:$port/"
} catch {
    Write-Host "Listener start failed or already active: $_"
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "text/javascript; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".webp" = "image/webp"
    ".json" = "application/json"
}

$baseDir = $PSScriptRoot

while ($http.IsListening) {
    try {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) { $path = "/index.html" }
        $cleanPath = $path.TrimStart('/').Replace('/', '\')
        $filePath = Join-Path $baseDir $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $response.ContentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buf, 0, $buf.Length)
        }
        $response.Close()
    } catch {
        # continue loop
    }
}
