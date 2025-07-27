import { packingItems, destinations, activities, PackingItem } from '@/data/packingData';
import { FormData } from '@/components/PackingForm';

export function generatePackingList(formData: FormData): (PackingItem & { quantity?: number })[] {
  const { destination, duration, selectedActivities, season } = formData;
  
  // Find destination info
  const destinationInfo = destinations.find(d => d.name === destination);
  
  // Start with essential items
  let recommendedItems: (PackingItem & { quantity?: number })[] = packingItems
    .filter(item => item.essential)
    .map(item => ({ ...item }));
  
  // Add destination-specific items
  if (destinationInfo) {
    const destItems = packingItems.filter(item => 
      destinationInfo.recommendedItems.includes(item.id)
    );
    destItems.forEach(item => {
      if (!recommendedItems.find(ri => ri.id === item.id)) {
        recommendedItems.push({ ...item });
      }
    });
  }
  
  // Add activity-specific items
  selectedActivities.forEach(activityName => {
    const activity = activities.find(a => a.name === activityName);
    if (activity) {
      activity.requiredItems.forEach(itemId => {
        const item = packingItems.find(pi => pi.id === itemId);
        if (item && !recommendedItems.find(ri => ri.id === item.id)) {
          recommendedItems.push({ ...item });
        }
      });
    }
  });
  
  // Add weather-dependent items based on season
  const weatherItems = packingItems.filter(item => item.weatherDependent);
  weatherItems.forEach(item => {
    let shouldInclude = false;
    
    switch (season) {
      case 'winter':
        if (['jacket', 'sweater', 'winter_coat', 'thermal_underwear', 'rain_jacket'].includes(item.id)) {
          shouldInclude = true;
        }
        break;
      case 'summer':
        if (['shorts', 'sunscreen', 'sunglasses', 'hat'].includes(item.id)) {
          shouldInclude = true;
        }
        break;
      case 'spring':
      case 'fall':
        if (['jacket', 'rain_jacket', 'sunscreen', 'sunglasses'].includes(item.id)) {
          shouldInclude = true;
        }
        break;
    }
    
    // Climate-based additions
    if (destinationInfo) {
      switch (destinationInfo.climate) {
        case 'tropical':
          if (['shorts', 'sunscreen', 'sunglasses', 'hat'].includes(item.id)) {
            shouldInclude = true;
          }
          break;
        case 'cold':
          if (['jacket', 'sweater', 'winter_coat', 'thermal_underwear'].includes(item.id)) {
            shouldInclude = true;
          }
          break;
        case 'desert':
          if (['sunscreen', 'sunglasses', 'hat'].includes(item.id)) {
            shouldInclude = true;
          }
          break;
      }
    }
    
    if (shouldInclude && !recommendedItems.find(ri => ri.id === item.id)) {
      recommendedItems.push({ ...item });
    }
  });
  
  // Add quantities based on duration for clothing items
  recommendedItems = recommendedItems.map(item => {
    let quantity = 1;
    
    switch (item.id) {
      case 'underwear':
      case 'socks':
        quantity = Math.min(duration + 1, 10); // Extra pair, max 10
        break;
      case 'tshirts':
        quantity = Math.min(Math.ceil(duration / 2), 7); // Every 2 days, max 7
        break;
      case 'pants':
        quantity = Math.min(Math.ceil(duration / 3), 4); // Every 3 days, max 4
        break;
      case 'shorts':
        if (season === 'summer' || destinationInfo?.climate === 'tropical') {
          quantity = Math.min(Math.ceil(duration / 2), 5);
        }
        break;
    }
    
    return { ...item, quantity };
  });
  
  // Sort by category and essentiality
  return recommendedItems.sort((a, b) => {
    if (a.essential && !b.essential) return -1;
    if (!a.essential && b.essential) return 1;
    return a.category.localeCompare(b.category);
  });
}