const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

async function getCoordinates(address) {
  try {
    const response = await client.geocode({
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    throw new Error('Erro ao obter coordenadas');
  }
}

module.exports = { getCoordinates };
