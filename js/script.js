function getStart () {

    const getDataLayer = async () => {
        const response = await axios.get('https://terraq.com.br/api/teste-leaflet/visao-inicial');
        const tileLayers = response.data
        
  
        const getDataPoint = async() => {
            const response = await axios.get('https://terraq.com.br/api/teste-leaflet/pontos');
            const geometry = response.data
  
            const startMap = async() => {
  
                map = L.map('map', {
                    center: tileLayers.initial_view.center,
                    zoom: tileLayers.initial_view.zoom
                });
  
                L.tileLayer(tileLayers.tile_layers[0].url, {
                    attribution: tileLayers.tile_layers[0].attribution
                }).addTo(map)
  
                geometry.forEach(element => {
                    console.log(element.geometry.coordinates)
  
                    let myIcon = L.icon({
                        iconUrl: element.properties.icon,
                        iconSize: [38, 38],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                    })
                    L.marker(element.geometry.coordinates, {icon: myIcon}).addTo(map)
                        .bindPopup(element.properties.popupContent)
                })
  
            }
  
            startMap();
        }
  
        getDataPoint();
    }
  
    getDataLayer();
  
  }
  
  getStart();