import { fetchCost } from "../../logic/fetchAPI";
import { jest, test, expect } from "@jest/globals";

test("fetchCost should return the correct value", async () => {
  const response = { json: () => ({ cost: 50 }) };
  const fetchMock = jest
    .spyOn(window, "fetch")
    .mockResolvedValueOnce(response as any);
  const result = await fetchCost({ time: 10, capacity: 5 });
  expect(fetchMock).toHaveBeenCalledWith("/api/cost/time=10&capacity=5");
  expect(result).toEqual(50);
  fetchMock.mockRestore();
});

test("fetchCost should handle fetch errors", async () => {
  const error = new Error("Failed to fetch");
  const fetchMock = jest.spyOn(window, "fetch").mockRejectedValueOnce(error);
  await expect(fetchCost({ time: 10, capacity: 5 })).rejects.toThrow(error);
  fetchMock.mockRestore();
});
