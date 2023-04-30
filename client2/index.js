async function getCostPrediction(time, capacity) {
  const response = await fetch(
    `http://127.0.0.1:5000/api/cost/time=${time}&capacity=${capacity}`
  );
  const cost = await response.json();
  const costRounded = Math.round(cost * 100) / 100;
  console.log(
    `AWS process for ${time/60} minutes with a max ${capacity} workers will cost: ${costRounded}€`
  );
}

getCostPrediction(10 * 60, 90);
