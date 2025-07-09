import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fromCity, toCity } = await req.json();

    // Using OpenStreetMap Nominatim API for geocoding (free)
    const fromResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fromCity)}&limit=1`);
    const toResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(toCity)}&limit=1`);

    const fromData = await fromResponse.json();
    const toData = await toResponse.json();

    if (fromData.length === 0) {
      throw new Error(`City not found: ${fromCity}`);
    }

    if (toData.length === 0) {
      throw new Error(`City not found: ${toCity}`);
    }

    const fromLat = parseFloat(fromData[0].lat);
    const fromLon = parseFloat(fromData[0].lon);
    const toLat = parseFloat(toData[0].lat);
    const toLon = parseFloat(toData[0].lon);

    const distance = calculateDistance(fromLat, fromLon, toLat, toLon);
    const flightTime = Math.round(distance / 800 * 60); // Rough estimate: 800 km/h average speed

    return new Response(JSON.stringify({
      fromCity,
      toCity,
      distance: Math.round(distance),
      flightTime: {
        hours: Math.floor(flightTime / 60),
        minutes: flightTime % 60
      },
      coordinates: {
        from: { lat: fromLat, lon: fromLon },
        to: { lat: toLat, lon: toLon }
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in calculate-distance function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to calculate distance' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});