import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Calendar, Activity } from 'lucide-react';
import { destinations, activities } from '@/data/packingData';

interface PackingFormProps {
  onGenerate: (formData: FormData) => void;
}

export interface FormData {
  destination: string;
  duration: number;
  selectedActivities: string[];
  season: string;
}

const PackingForm: React.FC<PackingFormProps> = ({ onGenerate }) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [season, setSeason] = useState('');

  const handleActivityChange = (activityName: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities([...selectedActivities, activityName]);
    } else {
      setSelectedActivities(selectedActivities.filter(a => a !== activityName));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && duration > 0) {
      onGenerate({
        destination,
        duration,
        selectedActivities,
        season
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-slate-800">
          Smart Packing Assistant
        </CardTitle>
        <p className="text-slate-600">Tell us about your trip and we'll create a personalized packing list</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Destination Type
            </Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Select your destination type" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest.name} value={dest.name}>
                    {dest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Trip Duration (days)
            </Label>
            <Input
              type="number"
              id="duration"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              placeholder="Number of days"
            />
          </div>

          {/* Season */}
          <div className="space-y-2">
            <Label htmlFor="season" className="flex items-center gap-2">
              Season/Weather
            </Label>
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Select season or expected weather" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring (Mild)</SelectItem>
                <SelectItem value="summer">Summer (Hot)</SelectItem>
                <SelectItem value="fall">Fall/Autumn (Cool)</SelectItem>
                <SelectItem value="winter">Winter (Cold)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Planned Activities
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activities.map((activity) => (
                <div key={activity.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={activity.name}
                    checked={selectedActivities.includes(activity.name)}
                    onCheckedChange={(checked) => 
                      handleActivityChange(activity.name, checked as boolean)
                    }
                  />
                  <Label htmlFor={activity.name} className="text-sm">
                    {activity.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!destination || duration < 1}
          >
            Generate My Packing List
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PackingForm;