import React, { useState } from 'react';
import PackingForm, { FormData } from '@/components/PackingForm';
import PackingList from '@/components/PackingList';
import { generatePackingList } from '@/utils/packingLogic';
import { PackingItem } from '@/data/packingData';

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'list'>('form');
  const [packingData, setPackingData] = useState<{
    items: (PackingItem & { quantity?: number })[];
    formData: FormData;
  } | null>(null);

  const handleGenerateList = (formData: FormData) => {
    const items = generatePackingList(formData);
    setPackingData({ items, formData });
    setCurrentView('list');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        {currentView === 'form' ? (
          <PackingForm onGenerate={handleGenerateList} />
        ) : (
          packingData && (
            <PackingList
              items={packingData.items}
              destination={packingData.formData.destination}
              duration={packingData.formData.duration}
              activities={packingData.formData.selectedActivities}
              onBack={handleBackToForm}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Index;