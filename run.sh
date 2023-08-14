(cd frontend; npm run build:reload) &
(cd backend; uvicorn app:app --host 0.0.0.0 --reload)
