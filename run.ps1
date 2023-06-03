$env:DEBUG="true"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "Set-Location cloudml-frontend; npm run build:reload"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "Set-Location cloudml-backend; uvicorn app:app --reload"
