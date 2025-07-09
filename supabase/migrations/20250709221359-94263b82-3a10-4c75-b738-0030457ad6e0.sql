-- Create packing_lists table to support multiple lists per trip
CREATE TABLE public.packing_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  person_name TEXT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on packing_lists
ALTER TABLE public.packing_lists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for packing_lists
CREATE POLICY "Users can view their own packing lists" 
ON public.packing_lists 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own packing lists" 
ON public.packing_lists 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own packing lists" 
ON public.packing_lists 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own packing lists" 
ON public.packing_lists 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add packing_list_id to packing_items table
ALTER TABLE public.packing_items 
ADD COLUMN packing_list_id UUID REFERENCES public.packing_lists(id) ON DELETE CASCADE;

-- Create trigger for automatic timestamp updates on packing_lists
CREATE TRIGGER update_packing_lists_updated_at
  BEFORE UPDATE ON public.packing_lists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_packing_lists_trip_id ON public.packing_lists(trip_id);
CREATE INDEX idx_packing_items_packing_list_id ON public.packing_items(packing_list_id);