import { calculatePercentage } from "../src/utils";


test('calculates the percentage correctly', () => {
 // Arrange 
 const allocated = 500;
 const totalBudget = 1000;

 // Act
  const result = calculatePercentage(allocated, totalBudget);

 // Assert
 expect(result).toBe('50.00');
});