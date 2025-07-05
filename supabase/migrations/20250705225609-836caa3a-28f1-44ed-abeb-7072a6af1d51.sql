
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create trips table to store user trips
CREATE TABLE public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  destination TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packing items table
CREATE TABLE public.packing_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  packed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create premade lists table for smart suggestions
CREATE TABLE public.premade_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  destination TEXT NOT NULL,
  destination_type TEXT NOT NULL, -- beach, city, mountains, etc.
  season TEXT, -- spring, summer, fall, winter
  description TEXT,
  items JSONB NOT NULL, -- Array of items with categories
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create custom premade lists for users
CREATE TABLE public.user_premade_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premade_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_premade_lists ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create policies for trips
CREATE POLICY "Users can view their own trips" 
  ON public.trips 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trips" 
  ON public.trips 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" 
  ON public.trips 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" 
  ON public.trips 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for packing items
CREATE POLICY "Users can view their own packing items" 
  ON public.packing_items 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own packing items" 
  ON public.packing_items 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own packing items" 
  ON public.packing_items 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own packing items" 
  ON public.packing_items 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for premade lists (public read, admin write)
CREATE POLICY "Everyone can view public premade lists" 
  ON public.premade_lists 
  FOR SELECT 
  USING (is_public = true);

-- Create policies for user premade lists
CREATE POLICY "Users can view their own premade lists" 
  ON public.user_premade_lists 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own premade lists" 
  ON public.user_premade_lists 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own premade lists" 
  ON public.user_premade_lists 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own premade lists" 
  ON public.user_premade_lists 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some sample premade lists
INSERT INTO public.premade_lists (name, destination, destination_type, season, description, items) VALUES
('Hawaii Beach Vacation', 'Hawaii', 'beach', 'summer', 'Perfect for tropical beach getaways', '[
  {"name": "Swimsuit", "category": "clothes"},
  {"name": "Sunscreen SPF 50+", "category": "toiletries"},
  {"name": "Flip Flops", "category": "clothes"},
  {"name": "Beach Towel", "category": "miscellaneous"},
  {"name": "Sunglasses", "category": "miscellaneous"},
  {"name": "Sun Hat", "category": "clothes"},
  {"name": "Waterproof Phone Case", "category": "electronics"},
  {"name": "Snorkel Gear", "category": "miscellaneous"},
  {"name": "Beach Bag", "category": "miscellaneous"},
  {"name": "Aloe Vera", "category": "toiletries"}
]'),

('Paris City Break', 'Paris', 'city', 'spring', 'Stylish essentials for the City of Light', '[
  {"name": "Comfortable Walking Shoes", "category": "clothes"},
  {"name": "Travel Adapter (EU)", "category": "electronics"},
  {"name": "Stylish Dress/Shirt", "category": "clothes"},
  {"name": "Light Jacket", "category": "clothes"},
  {"name": "Umbrella", "category": "miscellaneous"},
  {"name": "Camera", "category": "electronics"},
  {"name": "Portable Charger", "category": "electronics"},
  {"name": "Scarf", "category": "clothes"},
  {"name": "Crossbody Bag", "category": "miscellaneous"},
  {"name": "Travel Guide", "category": "miscellaneous"}
]'),

('London Adventure', 'London', 'city', 'fall', 'Weather-ready essentials for London', '[
  {"name": "Waterproof Jacket", "category": "clothes"},
  {"name": "Layered Clothing", "category": "clothes"},
  {"name": "Waterproof Walking Shoes", "category": "clothes"},
  {"name": "Compact Umbrella", "category": "miscellaneous"},
  {"name": "Warm Scarf", "category": "clothes"},
  {"name": "Travel Oyster Card", "category": "documents"},
  {"name": "Portable Charger", "category": "electronics"},
  {"name": "Tea Bags", "category": "miscellaneous"},
  {"name": "Hand Warmers", "category": "miscellaneous"},
  {"name": "Boots", "category": "clothes"}
]'),

('Tokyo Urban Explorer', 'Tokyo', 'city', 'spring', 'Modern essentials for Japan adventure', '[
  {"name": "Comfortable Walking Shoes", "category": "clothes"},
  {"name": "Travel Adapter (Japan)", "category": "electronics"},
  {"name": "Face Masks", "category": "toiletries"},
  {"name": "Portable WiFi Device", "category": "electronics"},
  {"name": "Cash Wallet", "category": "miscellaneous"},
  {"name": "Translation App", "category": "electronics"},
  {"name": "Lightweight Backpack", "category": "miscellaneous"},
  {"name": "Hand Sanitizer", "category": "toiletries"},
  {"name": "Chopsticks (personal)", "category": "miscellaneous"},
  {"name": "JR Pass", "category": "documents"}
]'),

('New York City Trip', 'New York', 'city', 'winter', 'Big Apple essentials for urban exploration', '[
  {"name": "Warm Winter Coat", "category": "clothes"},
  {"name": "Comfortable Walking Shoes", "category": "clothes"},
  {"name": "MetroCard", "category": "documents"},
  {"name": "Portable Charger", "category": "electronics"},
  {"name": "Camera", "category": "electronics"},
  {"name": "Warm Hat", "category": "clothes"},
  {"name": "Gloves", "category": "clothes"},
  {"name": "Scarf", "category": "clothes"},
  {"name": "Crossbody Bag", "category": "miscellaneous"},
  {"name": "Hand Warmers", "category": "miscellaneous"}
]'),

('Mountain Camping', 'Mountains', 'camping', 'summer', 'Essential gear for mountain camping adventures', '[
  {"name": "Tent", "category": "miscellaneous"},
  {"name": "Sleeping Bag", "category": "miscellaneous"},
  {"name": "Hiking Boots", "category": "clothes"},
  {"name": "Headlamp", "category": "electronics"},
  {"name": "First Aid Kit", "category": "toiletries"},
  {"name": "Water Bottle", "category": "miscellaneous"},
  {"name": "Camping Stove", "category": "miscellaneous"},
  {"name": "Warm Layers", "category": "clothes"},
  {"name": "Rain Gear", "category": "clothes"},
  {"name": "Map & Compass", "category": "miscellaneous"}
]'),

('Ski Trip Essentials', 'Alps', 'mountains', 'winter', 'Everything you need for the slopes', '[
  {"name": "Ski Jacket", "category": "clothes"},
  {"name": "Ski Pants", "category": "clothes"},
  {"name": "Thermal Underwear", "category": "clothes"},
  {"name": "Ski Gloves", "category": "clothes"},
  {"name": "Ski Goggles", "category": "miscellaneous"},
  {"name": "Helmet", "category": "miscellaneous"},
  {"name": "Ski Socks", "category": "clothes"},
  {"name": "After-Ski Boots", "category": "clothes"},
  {"name": "Hand/Foot Warmers", "category": "miscellaneous"},
  {"name": "Lip Balm with SPF", "category": "toiletries"}
]');
