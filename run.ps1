Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "Set-Location frontend; npm run build:reload"
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "Set-Location backend; uvicorn app:app --host 0.0.0.0 --reload"
