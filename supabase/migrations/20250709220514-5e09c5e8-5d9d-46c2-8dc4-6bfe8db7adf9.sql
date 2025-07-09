-- Add number of people and trip type to trips table
ALTER TABLE public.trips 
ADD COLUMN number_of_people INTEGER DEFAULT 1 CHECK (number_of_people > 0),
ADD COLUMN trip_type TEXT DEFAULT 'casual' CHECK (trip_type IN ('business', 'evening', 'casual'));