-- Add notes field to trips table for flight numbers, hotel itineraries, etc.
ALTER TABLE public.trips 
ADD COLUMN notes TEXT;