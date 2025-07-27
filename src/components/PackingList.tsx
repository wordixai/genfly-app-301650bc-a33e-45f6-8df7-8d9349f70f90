import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Shirt, Smartphone, FileText, Gem, Mountain } from 'lucide-react';
import { PackingItem } from '@/data/packingData';

interface PackingListProps {
  items: (PackingItem & { quantity?: number })[];
  destination: string;
  duration: number;
  activities: string[];
  onBack: () => void;
}

const categoryIcons = {
  clothing: Shirt,
  toiletries: Package,
  electronics: Smartphone,
  documents: FileText,
  accessories: Gem,
  outdoor: Mountain,
  sports: Mountain,
  work: FileText
};

const PackingList: React.FC<PackingListProps> = ({ 
  items, 
  destination, 
  duration, 
  activities, 
  onBack 
}) => {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set());

  const handleItemCheck = (itemId: string, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, (PackingItem & { quantity?: number })[]>);

  const totalItems = items.length;
  const packedItems = checkedItems.size;
  const completionPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  const print = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button onClick={print} variant="outline">
              Print List
            </Button>
          </div>
          <CardTitle className="text-2xl text-center">Your Personalized Packing List</CardTitle>
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-4 text-sm text-slate-600">
              <span>📍 {destination}</span>
              <span>📅 {duration} day{duration > 1 ? 's' : ''}</span>
              {activities.length > 0 && <span>🎯 {activities.join(', ')}</span>}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-sm text-slate-600">
                Progress: {packedItems}/{totalItems} items ({completionPercentage}%)
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Packing List by Category */}
      <div className="grid gap-4">
        {Object.entries(groupedItems).map(([category, categoryItems]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons];
          const categoryChecked = categoryItems.filter(item => 
            checkedItems.has(item.id)
          ).length;
          
          return (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg capitalize">
                  <Icon className="h-5 w-5" />
                  {category}
                  <Badge variant="secondary" className="ml-auto">
                    {categoryChecked}/{categoryItems.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {categoryItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-2 rounded border hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={checkedItems.has(item.id)}
                          onCheckedChange={(checked) => 
                            handleItemCheck(item.id, checked as boolean)
                          }
                        />
                        <span 
                          className={`${
                            checkedItems.has(item.id) 
                              ? 'line-through text-gray-500' 
                              : ''
                          }`}
                        >
                          {item.name}
                          {item.quantity && item.quantity > 1 && (
                            <span className="text-sm text-gray-500 ml-1">
                              ({item.quantity})
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {item.essential && (
                          <Badge variant="destructive" className="text-xs">
                            Essential
                          </Badge>
                        )}
                        {item.weatherDependent && (
                          <Badge variant="outline" className="text-xs">
                            Weather
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💡 Packing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
            <li>Roll clothes instead of folding to save space</li>
            <li>Pack one extra day's worth of essentials in case of delays</li>
            <li>Keep important documents and medications in carry-on</li>
            <li>Check airline baggage restrictions before packing</li>
            {duration > 7 && (
              <li>For longer trips, consider doing laundry to pack lighter</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackingList;