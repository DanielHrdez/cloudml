(cd cloudml-frontend; npm run build:reload) &
(cd cloudml-backend; DEBUG=true uvicorn app:app --reload)
