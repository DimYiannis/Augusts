export function determineProductType(name) {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('hoodie') || lowerName.includes('sweater')) {
    return 'Sweats';
  }
  if (lowerName.includes('shirt') || lowerName.includes('hotel') || lowerName.includes('loose')) {
    return 'Shirts';
  }
  if (lowerName.includes('jean')) {
    return 'Bottoms';
  }
  if (lowerName.includes('jacket')) {
    return 'Jackets';
  }
  if (lowerName.includes('boots')) {
    return 'Shoes';
  }
  if (lowerName.includes('cap') || lowerName.includes('beanie') || lowerName.includes('bracelet')) {
    return 'Accessories';
  }
  return 'Unknown'; // Ensure this matches your expected handling for undefined types
}
