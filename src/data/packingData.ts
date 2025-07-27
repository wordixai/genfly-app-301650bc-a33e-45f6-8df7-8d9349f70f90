export interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'toiletries' | 'electronics' | 'documents' | 'accessories' | 'outdoor' | 'sports' | 'work';
  essential: boolean;
  weatherDependent?: boolean;
  activitySpecific?: string[];
}

export interface Destination {
  name: string;
  climate: 'tropical' | 'temperate' | 'cold' | 'desert' | 'varied';
  recommendedItems: string[];
}

export interface Activity {
  name: string;
  requiredItems: string[];
}

export const packingItems: PackingItem[] = [
  // Clothing
  { id: 'underwear', name: 'Underwear', category: 'clothing', essential: true },
  { id: 'socks', name: 'Socks', category: 'clothing', essential: true },
  { id: 'tshirts', name: 'T-shirts', category: 'clothing', essential: true },
  { id: 'pants', name: 'Pants/Trousers', category: 'clothing', essential: true },
  { id: 'jacket', name: 'Jacket', category: 'clothing', essential: false, weatherDependent: true },
  { id: 'sweater', name: 'Sweater', category: 'clothing', essential: false, weatherDependent: true },
  { id: 'shorts', name: 'Shorts', category: 'clothing', essential: false, weatherDependent: true },
  { id: 'dress', name: 'Dress', category: 'clothing', essential: false },
  { id: 'formal_wear', name: 'Formal wear', category: 'clothing', essential: false, activitySpecific: ['business'] },
  { id: 'swimwear', name: 'Swimwear', category: 'clothing', essential: false, activitySpecific: ['beach', 'swimming'] },
  { id: 'rain_jacket', name: 'Rain jacket', category: 'clothing', essential: false, weatherDependent: true },
  { id: 'winter_coat', name: 'Winter coat', category: 'clothing', essential: false, weatherDependent: true },
  { id: 'thermal_underwear', name: 'Thermal underwear', category: 'clothing', essential: false, weatherDependent: true },
  { id: 'pajamas', name: 'Pajamas/Sleepwear', category: 'clothing', essential: true },

  // Toiletries
  { id: 'toothbrush', name: 'Toothbrush', category: 'toiletries', essential: true },
  { id: 'toothpaste', name: 'Toothpaste', category: 'toiletries', essential: true },
  { id: 'shampoo', name: 'Shampoo', category: 'toiletries', essential: true },
  { id: 'soap', name: 'Body wash/Soap', category: 'toiletries', essential: true },
  { id: 'deodorant', name: 'Deodorant', category: 'toiletries', essential: true },
  { id: 'sunscreen', name: 'Sunscreen', category: 'toiletries', essential: false, weatherDependent: true },
  { id: 'moisturizer', name: 'Moisturizer', category: 'toiletries', essential: false },
  { id: 'razor', name: 'Razor', category: 'toiletries', essential: false },
  { id: 'medications', name: 'Personal medications', category: 'toiletries', essential: true },

  // Electronics
  { id: 'phone_charger', name: 'Phone charger', category: 'electronics', essential: true },
  { id: 'camera', name: 'Camera', category: 'electronics', essential: false },
  { id: 'laptop', name: 'Laptop', category: 'electronics', essential: false, activitySpecific: ['business', 'work'] },
  { id: 'tablet', name: 'Tablet/E-reader', category: 'electronics', essential: false },
  { id: 'power_bank', name: 'Portable charger', category: 'electronics', essential: false },
  { id: 'adapter', name: 'Travel adapter', category: 'electronics', essential: false },

  // Documents
  { id: 'passport', name: 'Passport', category: 'documents', essential: true },
  { id: 'tickets', name: 'Travel tickets', category: 'documents', essential: true },
  { id: 'insurance', name: 'Travel insurance', category: 'documents', essential: true },
  { id: 'id_card', name: 'ID card/Driver license', category: 'documents', essential: true },
  { id: 'visa', name: 'Visa documents', category: 'documents', essential: false },

  // Accessories
  { id: 'sunglasses', name: 'Sunglasses', category: 'accessories', essential: false, weatherDependent: true },
  { id: 'hat', name: 'Hat/Cap', category: 'accessories', essential: false, weatherDependent: true },
  { id: 'watch', name: 'Watch', category: 'accessories', essential: false },
  { id: 'jewelry', name: 'Jewelry', category: 'accessories', essential: false },
  { id: 'wallet', name: 'Wallet', category: 'accessories', essential: true },

  // Outdoor/Sports
  { id: 'hiking_boots', name: 'Hiking boots', category: 'outdoor', essential: false, activitySpecific: ['hiking'] },
  { id: 'backpack', name: 'Daypack/Backpack', category: 'outdoor', essential: false, activitySpecific: ['hiking', 'sightseeing'] },
  { id: 'water_bottle', name: 'Water bottle', category: 'outdoor', essential: false, activitySpecific: ['hiking', 'sports'] },
  { id: 'first_aid', name: 'First aid kit', category: 'outdoor', essential: false, activitySpecific: ['hiking', 'camping'] },

  // Work
  { id: 'business_cards', name: 'Business cards', category: 'work', essential: false, activitySpecific: ['business'] },
  { id: 'notebook', name: 'Notebook & pen', category: 'work', essential: false, activitySpecific: ['business', 'work'] },
];

export const destinations: Destination[] = [
  {
    name: 'Tropical (Beach/Islands)',
    climate: 'tropical',
    recommendedItems: ['shorts', 'swimwear', 'sunscreen', 'sunglasses', 'hat']
  },
  {
    name: 'European Cities',
    climate: 'temperate',
    recommendedItems: ['jacket', 'comfortable_shoes', 'rain_jacket']
  },
  {
    name: 'Mountain/Ski Resort',
    climate: 'cold',
    recommendedItems: ['winter_coat', 'thermal_underwear', 'warm_boots', 'gloves']
  },
  {
    name: 'Desert',
    climate: 'desert',
    recommendedItems: ['sunscreen', 'hat', 'sunglasses', 'light_jacket']
  },
  {
    name: 'Business Travel',
    climate: 'varied',
    recommendedItems: ['formal_wear', 'laptop', 'business_cards', 'notebook']
  }
];

export const activities: Activity[] = [
  {
    name: 'Beach/Swimming',
    requiredItems: ['swimwear', 'sunscreen', 'sunglasses', 'hat']
  },
  {
    name: 'Hiking/Outdoor',
    requiredItems: ['hiking_boots', 'backpack', 'water_bottle', 'first_aid', 'hat']
  },
  {
    name: 'Business/Work',
    requiredItems: ['formal_wear', 'laptop', 'business_cards', 'notebook']
  },
  {
    name: 'Sightseeing',
    requiredItems: ['camera', 'backpack', 'comfortable_shoes', 'sunglasses']
  },
  {
    name: 'Nightlife/Dining',
    requiredItems: ['formal_wear', 'dress', 'jewelry']
  }
];