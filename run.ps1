$env:DEBUG="true"
(Set-Location cloudml-frontend && npm run build:reload) &
(Set-Location cloudml-backend && uvicorn app:app --reload)
