(cd cloudml-frontend; npm run build:reload) &
(cd cloudml-backend; uvicorn app:app --host 0.0.0.0 --reload)
