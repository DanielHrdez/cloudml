export function TestErrorModel() {
  return (
    <div class="w-full">
      <h2>Predict</h2>
      <div class="flex justify-evenly">
        <p>Data: /xd2.csv</p>
        <p>Select Model: [models]</p>
      </div>
      <div class="flex justify-evenly">
        <p>Errors: 203</p>
        <p>Pct Error: 37%</p>
      </div>
      <div class="flex justify-evenly">
        <p>Select nº data: [row]</p>
        <p>Error: [error row]</p>
      </div>
      <div class="flex justify-evenly">
        <p>Histogram:</p>
        <p>[histogram]</p>
      </div>
    </div>
  );
}
